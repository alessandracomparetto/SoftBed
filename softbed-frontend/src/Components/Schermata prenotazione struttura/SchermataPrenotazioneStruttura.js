import React, {useEffect, useState} from "react";
import RichiesteInAttesa from "./RichiesteInAttesa";
import RichiesteConfermate from "./RichiesteConfermate";
import mostraDialogErrore from "../../Actions/errore";
import {useParams} from "react-router-dom"

import axios from "axios";
import SidebarStruttura from "../Schermata Gestione Struttura/SidebarStruttura";
function SchermataPrenotazioneStruttura(){
    const [prenotazioni, aggiornaPrenotazioni]=useState([]);
    const [flag, aggiornaFlag]=useState(0); //utilizzo dello stato per indicare quando aggiornare la lista della prenotazioni
    const {indice} = useParams();
    const [struttura, setStruttura] = useState([])
     useEffect(() => {
         let utente = window.sessionStorage.getItem("utente");
         if(!utente || utente.length==0){
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
        .catch(()=>mostraDialogErrore());
    }, [flag]);

    return(
        <div className="d-flex justify-content-center">
            <div className="row mx-auto mt-3 maxw-xl">
                <div className="col-12 col-md-3">
                    <button type="button" className="btn btn-warning" onClick={()=> window.history.back()}>Torna indietro</button>
                </div>
                    <div className="col-12 col-md-9">
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
            </div>
        </div>
    )
}
export default SchermataPrenotazioneStruttura;