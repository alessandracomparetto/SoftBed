import React, {useState} from 'react';
import jsPDF from 'jspdf';
import axios from "axios";

const[listaOspiti] = useState([
    {nome: "Mario",
        cognome: "Rossi",
        codiceFiscale: "CVLJLU06E54L219B",
        dataNascita: "22-08-20",
        refComune: "6",
        idComune: "6",
        nomeComune:"Castelvetrano",
        nomeProvincia: "Trapani",
        nomeRegione: "Sicilia",
        refIndirizzo: "1",
        idIndirizzo: "1",
        via: "Napoli",
        numero: "1",
        cap: "91022",
        refComuneResidenzaq:"2",
        idComuneResidenza:"2",
        nomeComuneResidenza:"Castelvetrano",
        nomeProvinciaResidenza: "Trapani",
        nomeRegioneResidenza: "Sicilia",
        refPrenotazione:"10",
        tassa:"Adulto",
        dataArrivo:"26-06-20",
        permanenza:"1",
    },
    {nome: "Mario",
        cognome: "Rossi",
        codiceFiscale: "CVLJLU06E54L219B",
        dataNascita: "22-08-20",
        refComuneNascita: "6",
        idComune: "6",
        nomeComune:"Castelvetrano",
        nomeProvincia: "Trapani",
        nomeRegione: "Sicilia",
        refIndirizzo: "1",
        idIndirizzo: "1",
        via: "Napoli",
        numero: "1",
        cap: "91022",
        refComuneResidenza:"2",
        idComuneResidenza:"2",
        nomeComuneResidenza:"Marsala",
        nomeProvinciaResidenza: "Trapani",
        nomeRegioneResidenza: "Sicilia",
        refPrenotazione:"10",
        tassa:"Bambino",
        dataArrivo:"26-06-20",
        permanenza:"1"
    },
])


function RiepilogoDatiQuestura(props) {
    var doc = new jsPDF();
    doc.setFont("Times New Roman");
    doc.setFontType("normal");
    doc.setFontSize(20);
    doc.text(20, 20, 'Il/La sottoscritto/a');
    doc.setFontType("bold");
    doc.text(20, 30, 'Ciao a tutti son un file PDF creato in automatico');
    doc.addPage();
    doc.text(20, 20, 'Questo il contenuto della seconda pagina');

    const handleClick = (e) => {
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
    return(
            <button name="ok" id="ok" type="button" className="btn btn-warning mt-3 float-right"  onClick={handleClick}>Invia</button>
    )
}
export default RiepilogoDatiQuestura;

