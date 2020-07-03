import React, {useEffect, useState} from 'react';
import jsPDF from 'jspdf';
import axios from "axios";
import {useParams} from "react-router-dom";

function RiepilogoDatiQuestura(props) {
    //recupero i dati del gestore
    let sessionUtente = JSON.parse(window.sessionStorage.getItem("utente"));
    const [gestore, setGestore]=useState([]);
    const [struttura, setStruttura]=useState([]);
    useEffect(() => {
        console.log(sessionUtente[0]);
        console.log(props.idStruttura);
        axios
            .post("/ospite/fetchStruttura", props.idStruttura)
            .then(res => {
                console.log(res.data);
                setStruttura(res.data);
            })
            .catch(err => console.log(err));

        axios
            .post("/utente/fetch", sessionUtente[0])
            .then(res => {
                console.log(res.data);
                res.data.dataNascita = res.data.dataNascita.split("T")[0];
                setGestore(res.data);
            })
            .catch(err => console.log(err));

    }, []);

    let doc = new jsPDF();
    let y = 2;


    doc.setFontSize(18);
    doc.setFontType("bold");
    doc.text(20, 10 * y++ - 2, 'OGGETTO: dichiarazione dati ospiti');

    doc.setFontSize(14);
    doc.setFontType("normal");
    doc.text(25, 10 * y, `Il sottoscritto ${gestore.nome} ${gestore.cognome} (codice fiscale: ${gestore.codiceFiscale})`);
    doc.text(80, 10 * y++, '');
    doc.text(25, 10 * y, `nato a ${gestore.comuneNascita} (${gestore.provinciaNascita}) il ${gestore.dataNascita},`);
    doc.text(80, 10 * y++, '');
    doc.text(25, 10 * y, `residente a ${gestore.comuneResidenza} (${gestore.provinciaResidenza})`);
    doc.text(80, 10 * y++, '');


    doc.setFontType("bold");
    doc.text(25, 10 * y, 'proprietario della seguente struttura: ');
    doc.text(80, 10 * y++, '');

    doc.setFontType("normal")
    doc.text(25, 10 * y, `${struttura.nomeStruttura}, sito a ${struttura.comune}  (${struttura.provincia}),`);
    doc.text(80, 10 * y++, '');
    doc.text(25, 10 * y, `via  ${struttura.via}, n. ${struttura.numeroCivico} CAP: ${struttura.cap}`);

    doc.text(80, 10 * y++, '');

    doc.setFontType("bold");
    doc.text(25, 10 * y, 'dichiara la presenza dei seguenti ospiti: ');
    doc.text(80, 10 * y++, '');

    {
        props.dati.map((ospiti, indice) => {
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

            doc.setFontType("bold");
            doc.text(25, 10 * y, 'Documento di riconoscimento: ');

            doc.setFontType("normal");
          /*  doc.text(80, 10 * y++, <img className="annuncio-img" src={`/uploads/foto/${ospiti.documenti}`}/>);

            doc.addPage();*/

        })

    }


    const handleInvia = (e) => {
        e.preventDefault();
       let data ={
            email:"softengineers44@gmail.com",
            allegato:doc.output('datauristring')
        }

        try{
            axios.post("/mail", data)
                .then(res => console.log(res.status));
        }
        catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    const handleScarica = (e) => {
        e.preventDefault();
        doc.save("documentoQuestura.pdf");
    }
    return(
        <div className="container mh-100 p-3 w-75" style={{height: 500 + 'px'}}  >
            <React.Fragment>
                <button name="ok" id="ok" type="button" className="btn btn-warning mt-3 mr-5 float-left" onClick={handleScarica}>Visualizza dichiarazione</button>
                <button name="ok" id="ok" type="button" className="btn btn-success mt-3 ml-5 float-right" onClick={handleInvia}>Invia dichiarazione</button>
            </React.Fragment>
        </div>


    )
}
export default RiepilogoDatiQuestura;

