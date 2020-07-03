import React, {useEffect, useState} from "react";

import PrenotazioneOspite from "./PrenotazioneOspite";
import SidebarUtente from "../SchermataPersonaleUtente/SidebarUtente";
import axios from "axios";
import mostraDialogErrore from "../../Actions/errore";

function SchermataPrenotazioniOspite() {

    // TODO: rimuovere lo stato iniziale
    //TODO: idUtente
    let idUtente=1;
    const [prenotazioni, aggiornaPrenotazioni]=useState([]);

    useEffect(() => {
        let data = {"idUtente":idUtente};
        console.log(data);
        axios.post(`/prenotazione/listaPrenotazioniUtente`, data).then(res => {
            console.log("prenotazioni", res.data);
            aggiornaPrenotazioni(res.data);
        })
            .catch(()=>mostraDialogErrore());
    }, []);


    const rimuoviPrenotazione = (id) => {
        let tmp = [...prenotazioni];
        const index = tmp.map((richiesta) => { return richiesta.id }).indexOf(id);
        tmp.splice(index, 1);
        aggiornaPrenotazioni(tmp);
    }

    return (
        <div className="d-block">
            <div className="row mx-auto">
                <SidebarUtente></SidebarUtente>
                <div className="container my-3 col-12 pr-3 col-md-9">
                    {/* Richieste in attesa */}

                    <div className="my-3">
                        <h3>Richieste in attesa</h3>
                        <ul className="list-group list-group-flush ">
                            {
                                prenotazioni.map((prenotazione, indice) => {
                                    if (prenotazione.confermata === 0) {
                                        return(
                                            <PrenotazioneOspite key={indice}  indiceElemento={indice} prenotazione={prenotazione} primo={indice ===0}  rimuovi={rimuoviPrenotazione}/>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>

                    {/* Prenotazioni prenotazioni */}
                    { prenotazioni[0] && (
                        <div className="my-3">
                            <h3>Prenotazioni precedenti</h3>
                            <ul className="list-group list-group-flush ">
                                {
                                    prenotazioni.map((prenotazione, indice) => {
                                        if (prenotazione.confermata === 1) {
                                            return (
                                                <PrenotazioneOspite key={indice}  indiceElemento={indice} prenotazione={prenotazione} primo={indice === 0}  rimuovi={rimuoviPrenotazione}/>)
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SchermataPrenotazioniOspite;