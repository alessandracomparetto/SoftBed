import React, {useEffect, useState} from "react";
import RichiesteInAttesa from "./RichiesteInAttesa";
import RichiesteConfermate from "./RichiesteConfermate";
import mostraDialogErrore from "../../Actions/errore";
import {useParams} from "react-router-dom"
import {useHistory, useLocation} from "react-router-dom";

import axios from "axios";
import reindirizza from "../../Actions/reindirizzamento";

function SchermataPrenotazioneStruttura(){
    const [prenotazioni, aggiornaPrenotazioni]=useState([]);
    const [flag, aggiornaFlag]=useState(0); //utilizzo dello stato per indicare quando aggiornare la lista della prenotazioni
    const {indice} = useParams();
    const [struttura, setStruttura] = useState([]);

    const history = useHistory();
    const location = useLocation();

     useEffect(() => {
         let utente = window.sessionStorage.getItem("utente");
         if(!utente || utente.length === 0){
             window.location.href="/accedi";
         }
         let listaStrutture = JSON.parse(window.sessionStorage.getItem("strutture"));
         if(!listaStrutture || !listaStrutture[indice] || indice >= listaStrutture.length){
             window.location.href="/gestioneStrutture/";
         }
         let data = listaStrutture[indice];
         console.log(data);
         setStruttura(data);
        axios.post(`/prenotazione/listaPrenotazioni`, data).then(res => {
            aggiornaPrenotazioni(res.data);
        })
            .catch(err =>{
                if(err.response.status === 401){
                    reindirizza(history, {
                        pathname: '/accedi',
                        state: {
                            provenienza: "Schermata Prenotazioni Struttura",
                            urlProvenienza: location.pathname
                        }

                    }, 3000, "Devi effettuare nuovamente l'accesso per accedere alle prenotazioni della struttura.");
                }else{
                    mostraDialogErrore();
                }
            });
    }, [flag]);


    return(
        <div className="d-flex justify-content-center">
            <div className="row mx-auto mt-3 maxw-xl">
                <div className="col-12 col-md-3">
                    <button type="button" className="btn btn-warning" onClick={()=> window.history.back()}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        Torna indietro</button>
                </div>
                    <div className="col-12 col-md-9">
                        { (prenotazioni.length === 0) ? (
                            <div className="card shadow p-2 m-2 m-sm-3 maxw-xl text-center mt-3">
                                <h4>Pare che tu non abbia ancora alcuna prenotazione.</h4>
                                <h5>Prova a modificare le caratteristiche della tua struttura.</h5>
                                <i className="fa fa-pencil fa-4x" aria-hidden="true"/>
                            </div>
                        ):(
                            <div>
                                <h4>Richieste in attesa</h4>
                                <ul className="list-group list-group-flush ">
                            {
                                prenotazioni.map((prenotazione, i) => {
                                    if (prenotazione.confermata === 0) {
                                        return (<li key={i} className="list-group-item list-group-item-warning">
                                        <RichiesteInAttesa prenotazione={prenotazione} flag={flag} aggiornaFlag={aggiornaFlag} indice={indice} nomeStruttura={struttura.nomeStruttura}/></li>)
                                    }
                                })
                            }
                                </ul>
                                <h4>Richieste confermate</h4>
                                <ul className="list-group list-group-flush ">
                            {
                                prenotazioni.map((prenotazione, i) => {
                                    if (prenotazione.confermata === 1) {
                                        return (<li key={i} className="list-group-item list-group-item-warning">
                                        <RichiesteConfermate prenotazione={prenotazione} indice={indice}/></li>)
                                    }
                                })
                            }
                                </ul>
                            </div>
                            )
                        }
                    </div>
            </div>
        </div>
    )
}

export default SchermataPrenotazioneStruttura;
