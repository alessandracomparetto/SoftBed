import React, {useEffect, useState} from "react";
import FormDatiOspite from "./FormDatiOspite";
import OspitiInseriti from "./OspitiInseriti";
import axios from "axios";
import {useParams} from "react-router-dom"
function SchermataDatiOspiti(props){
    const[listaOspiti, setOspiti] = useState([]);
    let {refPrenotazione} = useParams();

    useEffect(() => {
        //TODO GESTIRE REFPRENOTAZIONE
        axios.post(`/ospite/fetch`,{refPrenotazione: refPrenotazione}).then(res => {
            console.log("DATI OSPITI RECUPERATI=======");
            console.log(res.data);
            setOspiti(res.data);
        })
            .catch(err => console.log(err));
    }, []);

    const aggiungiOspite = (dato) => {
        try {
            //TODO GESTIRE REFPRENOTAZIONE
            axios.post("/ospite/aggiungi", dato)
                .then(res => { // then print response status
                    console.log("OSPITE AGGIUNTO ======= ");
                    console.log(res.data);
                    let tmp = [...listaOspiti];
                    dato.idOspite = res.data.insertId;
                    tmp.push(dato);
                    console.log(tmp);
                    setOspiti(tmp);
                });
        }catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }

    }

    const eliminaOspite = (idOspite, refPrenotazione, indice) => {
        console.log(idOspite);
        console.log(refPrenotazione);
        let data = {"idOspite":idOspite, "refPrenotazione":refPrenotazione};
        try {
            axios.post(`/ospite/elimina`, data)
                .then(res => { // then print response status
                    console.log("OSPITE ELIMINATO ======= ");
                    console.log(res.data);
                    // Rimuovere dalla lista
                    let tmp = [...listaOspiti];
                    tmp.splice(indice, 1);
                    setOspiti(tmp);
                });
        }catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }

    }

    return(
        <div className="container my-3" >
            <div className="my-3">
                <h4 className="mt-3 d-inline">I tuoi ospiti</h4>
                <ul className="list-group list-group-flush mt-3 ">
                    {
                        listaOspiti.map((ospiti, indice) => {
                            return <OspitiInseriti key={indice} indiceElemento={indice} idOspite={ospiti.idOspite} nome={ospiti.nome} cognome={ospiti.cognome}
                                                  codiceFiscale={ospiti.codiceFiscale} dataNascita={ospiti.dataNascita.split("T")[0]}
                                                  comune={ospiti.comuneNascita} provincia={ospiti.provinciaNascita} regione={ospiti.regione}
                                                  via={ospiti.via} numero={ospiti.numero} cap={ospiti.cap}
                                                   comuneResidenza={ospiti.comuneResidenza} provinciaResidenza={ospiti.provinciaResidenza}
                                                   regioneResidenza={ospiti.nomeRegioneResidenza} tassa={ospiti.tassa} dataArrivo={ospiti.dataArrivo.split("T")[0]}
                                                   permanenza={ospiti.permanenza} refPrenotazione = {ospiti.refPrenotazione} eliminaOspite={eliminaOspite}/>
                        })

                    }
                </ul>
            </div>

            <FormDatiOspite aggiungiOspite={aggiungiOspite} dati={listaOspiti}/>
            {/*<a href={`/dichiarazioneOspiti`} className="btn btn-warning d-block d-md-inline-block m-auto stretched-link">Procedi alla dichiarazione</a>*/}
        </div>

        //bottone procedi dichiarazione
        //funzione verifica dati aggiuntivi, verifica i dati aggiuntivi.
    )
}


export default SchermataDatiOspiti;