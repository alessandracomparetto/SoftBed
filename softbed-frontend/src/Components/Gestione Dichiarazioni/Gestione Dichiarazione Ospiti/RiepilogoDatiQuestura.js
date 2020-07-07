import React, {useEffect, useState} from 'react';

import axios from "axios";
import jsPDF from "jspdf";
import mostraDialogErrore from "../../Actions/errore";
import {useHistory} from "react-router-dom";
import $ from "jquery";

function RiepilogoDatiQuestura(props) {

    const history = useHistory();
    const [gestore, setGestore] = useState([]);
    const [percorsi, setPercorsi] = useState([]);
    const [datiStruttura, setStruttura] = useState([]);
    var Base64 = require('js-base64').Base64;

    useEffect(() => {
        let struttura = (JSON.parse(sessionStorage.getItem("strutture")));
        console.log(props.listaOspiti);
        axios
            .post("/utente/fetch", JSON.parse(sessionStorage.getItem("utente")))
            .then(res => {
                res.data.dataNascita = res.data.dataNascita.split("T")[0];
                setGestore(res.data);
            })
            .catch(err => console.log(err));

        axios

            .post("/struttura/fetchStruttura", {"idStruttura": struttura[0].idStruttura})
            .then(res => {
                console.log(res.data);
                setStruttura(res.data[0]);
            })
            .catch(err => console.log(err));

    },[props.listaOspiti]);



    function invia() {
        let tmp = [];
        for (let i = 0; i < props.listaOspiti.length; i++) {
            if (props.listaOspiti[i].idOspite === undefined) {
                tmp.push(props.listaOspiti[i]);
            }
        }

        let info = {listaOspiti: tmp, refPrenotazione: props.refPrenotazione};
        axios.post(`/ospite/aggiungi`, info).then(res => {
        }).catch(err => console.log(err));

        let doc = new jsPDF();
        let y = 2;
        let countOspiti = 0;

        doc.setFontSize(18);
        doc.setFontType("bold");
        doc.text(20, 10 * y++ - 2, 'OGGETTO: dichiarazione dati ospiti');

        doc.setFontSize(14);
        doc.setFontType("normal");
        doc.text(25, 10 * y, `Il/La sottoscritto/a ${gestore.nome} ${gestore.cognome} (codice fiscale: ${gestore.codiceFiscale})`);
        doc.text(80, 10 * y++, '');
        doc.text(25, 10 * y, `nato a ${gestore.comuneNascita} (${gestore.provinciaNascita}) il ${gestore.dataNascita},`);
        doc.text(80, 10 * y++, '');
        doc.text(25, 10 * y, `residente a ${gestore.comuneResidenza} (${gestore.provinciaResidenza}), via ${gestore.via}, n. ${gestore.numeroCivico}, CAP ${gestore.cap}`);
        doc.text(80, 10 * y++, '');

        doc.setFontType("bold");
        doc.text(25, 10 * y, ' in qualità di proprietario/amministratore della seguente struttura: ');
        doc.text(80, 10 * y++, '');


        doc.setFontType("normal")
        doc.text(25, 10 * y, `"${datiStruttura.nomeStruttura}", sita a ${datiStruttura.comune} (${datiStruttura.provincia}), via ${datiStruttura.via}, n. ${datiStruttura.numeroCivico}, CAP ${datiStruttura.cap}`);

        doc.text(80, 10 * y++, '');



        doc.setFontType("bold");
        doc.text(25, 10 * y, 'dichiara la presenza dei seguenti ospiti:');
        doc.text(80, 10 * y++, '');


        props.listaOspiti.map((ospiti, indice) => {
            countOspiti++;
            doc.setFontType("bold");
            doc.setFontSize(14);
            doc.text(25, 10 * y, 'Nome: ');

            doc.setFontType("normal");
            doc.text(80, 10 * y++, `${ospiti.nome}`);

            doc.setFontType("bold");
            doc.text(25, 10 * y, 'Cognome: ');

            doc.setFontType("normal");
            doc.text(80, 10 * y++, `${ospiti.cognome}`);

            doc.setFontType("bold");
            doc.text(25, 10 * y, 'Codice fiscale: ');

            doc.setFontType("normal");
            doc.text(80, 10 * y++, `${ospiti.codiceFiscale}`);

            doc.setFontType("bold");
            doc.text(25, 10 * y, 'Data di nascita: ');

            doc.setFontType("normal");
            doc.text(80, 10 * y++, `${ospiti.dataNascita.split("T")[0]}`);

            doc.setFontType("bold");
            doc.text(25, 10 * y, `Nato a: `);

            doc.setFontType("normal");
            doc.text(80, 10 * y++, `${ospiti.comuneNascita} (${ospiti.provinciaNascita})`);

            doc.setFontType("bold");
            doc.text(25, 10 * y, `Residente a: `);

            doc.setFontType("normal");
            doc.text(80, 10 * y++, `${ospiti.comuneResidenza} (${ospiti.provinciaResidenza})`);

            doc.setFontType("bold");
            doc.text(25, 10 * y, 'Data di arrivo: ');

            doc.setFontType("normal");
            doc.text(80, 10 * y++, `${ospiti.dataArrivo.split("T")[0]}`);

            doc.setFontType("bold");
            doc.text(25, 10 * y, 'Permanenza: ');

            doc.setFontType("normal");
            doc.text(80, 10 * y++, `${ospiti.permanenza} giorni`);

            doc.setFontType("normal");
            doc.text(80, 10 * y++, '');

            if (countOspiti % 2 === 0) {
                y = 2;
                doc.addPage();
            }

        })

        doc.setFontType("bold");
        doc.text(25, 10 * y, 'Documenti di riconoscimento: ');

        percorsi.map((percorsi, indice) => {
            console.log(percorsi.percorso);

            fetch(`/uploads/documenti/${percorsi.percorso}`).then(r => r.blob())
                .then(img => {
                    let imgData = 'data:image/jpeg;base64,' + Base64.encode(`${img}`)
                    doc.addImage(imgData, 'JPEG', 15, 60, 170, 170);
                })
        })


        const informazioni = {
            allegato: doc.output('datauristring')
        }
        axios.post('/mail/invioDichiarazione', informazioni).then(()=>{  axios.post("/prenotazione/setDichiarazione", {"refPrenotazione": props.refPrenotazione}).catch(err => console.log(err));
        }).catch((err) => {
            mostraDialogErrore(err.message);
        });

        doc.save();


        history.push({
            pathname: `/dichiarazione-completata/${props.indice}`,
            state: { provenienza: "Riepilogo dati questura" }
        });
    }


    return(
        <div className="d-flex justify-content-end" >
            <button id="button" type="button" className="btn btn-danger" onClick={invia}>Procedi alla dichiarazione</button>
        </div>
    )
}


export default RiepilogoDatiQuestura;

