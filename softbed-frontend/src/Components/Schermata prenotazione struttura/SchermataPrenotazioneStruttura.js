import React, {useEffect, useState} from "react";
import RichiesteInAttesa from "./RichiesteInAttesa";
import RichiesteConfermate from "./RichiesteConfermate";
import {abilitazione} from "../../Actions/abilitazione";
import axios from "axios";
function SchermataPrenotazioneStruttura(props){
    const [prenotazioni, aggiornaPrenotazioni]=useState([]);

    useEffect(() => {
        let data = {"idStruttura":props.idStruttura, "tipologiaStruttura":props.tipologiaStruttura};
        axios.post(`/prenotazione/listaPrenotazioni`, data).then(res => {
            aggiornaPrenotazioni(res.data);
        })
        .catch(err => console.log(err));
    }, [props.tipologiaStruttura]);

    const rifiutaPrenotazione = (idPrenotazione) => {
            console.log("sto per inviare la richiesta di cancellazione");
            console.log("idp"+idPrenotazione)
            axios.post(`/prenotazione/rifiutaPrenotazione`,{idPrenotazione: idPrenotazione}).then(res => {
                console.log("Risposta rifiuta prenotazione:");
                console.log(res.data)
                /*//aggiorno lo stato
                let tmp=[...prenotazioni];
                tmp.splice(props.indiceElemento,1);
                aggiornaPrenotazioni(tmp);*/
            })
                .catch(err => console.log(err));
    }
    const confermaPrenotazione = (idPrenotazione) => {
        console.log("sto per inviare la conferma di prenotazione");
        axios.post(`/prenotazione/confermaPrenotazione`, {idPrenotazione:idPrenotazione}).then(res => {
            console.log("Risposta conferma prenotazione:");
            console.log(res.data)
            /*TODO:DOVREI AGGIORNARE LO STATO*/
        })
            .catch(err => console.log(err));
    }

   /* const confermaPrenotazione = (indice) => {
        // Aggiungere alla lista confermate
        /*let tmp = [...prenotazioniConfermate];
        tmp.push(prenotazioniNonConfermate[indice]);
        aggiornaPrenotazioniConfermate(tmp);

        // Rimuovere dalla lista in attesa
        tmp = [...prenotazioniNonConfermate];
        tmp.splice(indice, 1);
        aggiornaPrenotazioniNonConfermate(tmp);
    } */
    return(
        <div className="container">
            <h4>Richieste in attesa</h4>
            <ul className="list-group list-group-flush ">
                {
                    prenotazioni.map((prenotazione, indice) => {
                            if (prenotazione.confermata == 0) {
                                return (<li key={indice} className="list-group-item list-group-item-warning">
                                    <RichiesteInAttesa key={indice}  indiceElemento={indice} prenotazione={prenotazione} confermaPrenotazione={confermaPrenotazione} rifiutaPrenotazione={rifiutaPrenotazione} /></li>)
                            }
                    })
                }
            </ul>
            <h4>Richieste confermate</h4>
            <ul className="list-group list-group-flush ">
                {
                    prenotazioni.map((prenotazione, indice) => {
                        if (prenotazione.confermata == 1) {
                            return (<li key={indice} className="list-group-item list-group-item-warning">
                                <RichiesteConfermate key={indice}  indiceElemento={indice} prenotazione={prenotazione}/></li>)
                        }
                    })
                }
            </ul>
        </div>
    )
}
export default SchermataPrenotazioneStruttura;