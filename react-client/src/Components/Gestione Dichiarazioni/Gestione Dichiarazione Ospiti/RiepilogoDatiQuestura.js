import React, {useEffect, useState, Fragment} from 'react';
import axios from "axios";
import jsPDF from "jspdf";
import mostraDialogErrore from "../../../Actions/errore";
import {useHistory} from "react-router-dom";

function setFontType(doc, type) {
    doc.setFont(undefined, undefined, type)
}

function RiepilogoDatiQuestura(props) {
    const history = useHistory();
    const [gestore, setGestore] = useState([]);
    const [datiStruttura, setStruttura] = useState([]);


    useEffect(() => {
        let tmp = [];
        for (let i = 0; i < props.listaOspiti.length; i++) {
            if (props.listaOspiti[i].idospite === undefined) {
                tmp.push(props.listaOspiti[i]);
            }
        }

        let info = {listaOspiti: tmp, refprenotazione: props.refprenotazione};
        axios.post(`/ospite/aggiungi`, info).then(() => {
        }).catch(err => console.log(err));


        let struttura = (JSON.parse(sessionStorage.getItem("strutture")));
        axios
            .post("/user/fetch", JSON.parse(sessionStorage.getItem("utente")))
            .then(res => {
                res.data.datanascita = res.data.datanascita.split("T")[0];
                setGestore(res.data);
            })
            .catch(err => console.log(err));

        axios
            .post("/building/fetchStruttura", {"idstruttura": struttura[0].idstruttura})
            .then(res => {
                setStruttura(res.data[0]);
            })
            .catch(err => console.log(err));
    },[props.listaOspiti]);

    function invia() {
        let doc = new jsPDF();
        let y = 2;
        let countOspiti = 1;

        doc.setFontSize(18);
        setFontType("bold");
        doc.text('OGGETTO: dichiarazione dati ospiti', 20, 10 * y++ - 2);

        doc.setFontSize(14);
        setFontType("normal");
        doc.text(`Il/La sottoscritto/a ${gestore.nome} ${gestore.cognome} (codice fiscale: ${gestore.codicefiscale})`, 25, 10 * y++);
        doc.text(`nato a ${gestore.comunenascita} (${gestore.provincianascita}) il ${gestore.datanascita},`, 25, 10 * y++);
        doc.text(`residente a ${gestore.comuneresidenza} (${gestore.provinciaresidenza}), via ${gestore.via}, n. ${gestore.numerocivico}, CAP ${gestore.cap}`, 25, 10 * y++);

        setFontType("bold");
        doc.text(' in qualità di proprietario/amministratore della seguente struttura: ', 25, 10 * y++);


        setFontType("normal")
        doc.text(`"${datiStruttura.nomestruttura}", sita a ${datiStruttura.comune} (${datiStruttura.provincia}), via ${datiStruttura.via}, n. ${datiStruttura.numerocivico}, CAP ${datiStruttura.cap}`, 25, 10 * y++);

        setFontType("bold");
        doc.text('dichiara la presenza dei seguenti ospiti:', 25, 10 * y);
        doc.text('', 80, 10 * y++);


        props.listaOspiti.map((ospiti, indice) => {
            countOspiti++;
            setFontType("bold");
            doc.setFontSize(14);
            doc.text('Nome: ', 25, 10 * y);

            setFontType("normal");
            doc.text(`${ospiti.nome}`, 80, 10 * y++);

            setFontType("bold");
            doc.text('Cognome: ', 25, 10 * y);

            setFontType("normal");
            doc.text(`${ospiti.cognome}`, 80, 10 * y++);

            setFontType("bold");
            doc.text('Codice fiscale: ', 25, 10 * y);

            setFontType("normal");
            doc.text(`${ospiti.codicefiscale}`, 80, 10 * y++);

            setFontType("bold");
            doc.text('Data di nascita: ', 25, 10 * y);

            setFontType("normal");
            doc.text(`${ospiti.datanascita.split("T")[0]}`, 80, 10 * y++);

            setFontType("bold");
            doc.text(`Nato a: `, 25, 10 * y);

            setFontType("normal");
            doc.text(`${ospiti.comunenascita} (${ospiti.provincianascita})`, 80, 10 * y++);

            setFontType("bold");
            doc.text(`Residente a: `, 25, 10 * y);

            setFontType("normal");
            doc.text(`${ospiti.comuneresidenza} (${ospiti.provinciaresidenza})`, 80, 10 * y++);

            setFontType("bold");
            doc.text('Data di arrivo: ', 25, 10 * y);

            setFontType("normal");
            doc.text(`${ospiti.dataarrivo.split("T")[0]}`, 80, 10 * y++);

            setFontType("bold");
            doc.text('Permanenza: ', 25, 10 * y);

            setFontType("normal");
            doc.text(`${ospiti.permanenza} giorni`, 80, 10 * y++);

            setFontType("normal");
            doc.text('', 80, 10 * y++);

            if (countOspiti % 3 === 0) {
                y = 2;
                doc.addPage();
            }

        })

        setFontType("bold");
        doc.text('Si trasmettono in allegato i documenti di riconoscimento.', 25, 10 * y++);

        const informazioni = {
            allegato: doc.output('datauristring'),
            refprenotazione: props.refprenotazione
        }

       axios.post('/mail/invioDichiarazione', informazioni)
           .then(() => {
               axios.post("/booking/setDichiarazione", {"refprenotazione": props.refprenotazione})
                   .catch(err => {console.error(err)});
           })
           .catch((err) => {mostraDialogErrore(err.message)})

        doc.save();

        history.push({
            pathname: `/dichiarazione-completata/${props.indice}`,
            state: { provenienza: "Riepilogo dati questura" }
        });
    }

    return(
        <Fragment>
            <div className="d-flex justify-content-end" >
                <button id="button" type="button" className="btn btn-danger" onClick={invia}>Procedi alla dichiarazione</button>
            </div>
        </Fragment>
    )
}


export default RiepilogoDatiQuestura;

