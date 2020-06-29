import React,{useState} from "react";
import FormDatiOspite from "./FormDatiOspite";
import OspitiInseriti from "./OspitiInseriti";
import axios from "axios";

/*
TODO: gestire le props
*/

function SchermataDatiOspiti(props){
    const[listaOspiti, setOspiti] = useState([])

    const eliminaOspite = (indice) => {
        try {
            console.log("DATI======= ");
            console.log(listaOspiti[indice]);
            axios.post('/ospite/cancellazione', listaOspiti[indice])
                .then(res => { // then print response status
                    console.log(res.data);
                });
        }catch (e) {
        }
        // Rimuovere dalla lista
        let tmp = [...listaOspiti];
        tmp.splice(indice, 1);
        setOspiti(tmp);
    }

    const aggiungiOspite = (dato) => {
        try {
            console.log("OSPITE==== ");
            console.log(dato);
            axios.post('/ospite/inserimento', dato)
                .then(res => { // then print response status
                    console.log(res.data);
                });
        } catch (e) {
        }
        // Aggiungere alla lista
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

            <FormDatiOspite aggiungiOspite={aggiungiOspite} dati={listaOspiti}/>
            {/*<a href={`/dichiarazioneOspiti`} className="btn btn-warning d-block d-md-inline-block m-auto stretched-link">Procedi alla dichiarazione</a>*/}
        </div>
    )
}


export default SchermataDatiOspiti;