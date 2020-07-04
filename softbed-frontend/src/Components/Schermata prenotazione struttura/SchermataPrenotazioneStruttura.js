import React, {useEffect, useState} from "react";
import RichiesteInAttesa from "./RichiesteInAttesa";
import RichiesteConfermate from "./RichiesteConfermate";
import mostraDialogErrore from "../../Actions/errore";
import {useParams} from "react-router-dom"

import axios from "axios";
function SchermataPrenotazioneStruttura(){
    const [prenotazioni, aggiornaPrenotazioni]=useState([]);
    const  [flag, aggiornaFlag]=useState(0); //utilizzo dello stato per indicare quando aggiornare la lista della prenotazioni
    const {id} = useParams();
    let data;
    let listaStrutture = JSON.parse(window.sessionStorage.getItem("strutture"));

     useEffect(() => {
         for(let i = 0 ; i<listaStrutture.length; i++){
             if(listaStrutture[i].idStruttura===id){
                 data = {"idStruttura":id, "tipologiaStruttura":listaStrutture[i].tipologiaStruttura};
                 break;
             }
         }
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
                                prenotazioni.map((prenotazione, indice) => {
                                    if (prenotazione.confermata === 0) {
                                        return (<li key={indice} className="list-group-item list-group-item-warning">
                                            <RichiesteInAttesa key={indice}  indiceElemento={indice} prenotazione={prenotazione} flag={flag} aggiornaFlag={aggiornaFlag} id={id}/></li>)
                                    }
                                })
                            }
                        </ul>
                        <h4>Richieste confermate</h4>
                        <ul className="list-group list-group-flush ">
                            {
                                prenotazioni.map((prenotazione, indice) => {
                                    if (prenotazione.confermata === 1) {
                                        return (<li key={indice} className="list-group-item list-group-item-warning">
                                            <RichiesteConfermate key={indice}  indiceElemento={indice} prenotazione={prenotazione}  id={id}/></li>)
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