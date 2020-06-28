import React,{useState} from "react";
import FormDatiOspite from "./FormDatiOspite";
import OspitiInseriti from "./OspitiInseriti";


/*
TODO: gestire le props
*/

function SchermataDatiOspiti(props){
    const[listaOspiti, setOspiti] = useState([
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

    const eliminaOspite = (indice) => {
        {/*TODO inviare richiesta al beckend*/}
        // Rimuovere dalla lista
        let tmp = [...listaOspiti];
        tmp.splice(indice, 1);
        setOspiti(tmp);
    }

    const aggiungiOspite = (dato) => {
        {/*TODO inviare richiesta al beckend*/}
        // Aggiungere alla lista
        console.log(dato);
        let tmp = [...listaOspiti];
        tmp.push(dato);
        console.log(tmp);
        setOspiti(tmp);
    }

    return(
        <div className="container my-3" >
            <div className="my-3">
                <h4 className="mt-3 d-inline">I tuoi ospiti</h4>
                <ul className="list-group list-group-flush mt-3 ">
                    {
                        listaOspiti.map((ospiti, indice) => {
                            return <OspitiInseriti key={indice} indiceElemento={indice} nome={ospiti.nome} cognome={ospiti.cognome}
                                                  codiceFiscale={ospiti.codiceFiscale}  dataNascita={ospiti.dataNascita}
                                                  comune={ospiti.nomeComune} provincia={ospiti.nomeProvincia} regione={ospiti.nomeRegione}
                                                  via={ospiti.via} numero={ospiti.numero} cap={ospiti.cap}
                                                   comuneResidenza={ospiti.nomeComuneResidenza} provinciaResidenza={ospiti.nomeProvinciaResidenza}
                                                   regioneResidenza={ospiti.nomeRegioneResidenza} tassa={ospiti.tassa} dataArrivo={ospiti.dataArrivo}
                                                   permanenza={ospiti.permanenza} eliminaOspite={eliminaOspite}/>
                        })

                    }
                </ul>
            </div>

            <FormDatiOspite aggiungiOspite={aggiungiOspite}/>
            {/*<a href={`/dichiarazioneOspiti`} className="btn btn-warning d-block d-md-inline-block m-auto stretched-link">Procedi alla dichiarazione</a>*/}
        </div>
    )
}


export default SchermataDatiOspiti;