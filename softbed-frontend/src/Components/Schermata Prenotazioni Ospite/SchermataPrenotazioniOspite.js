import React, {useEffect, useState} from "react";
import PrenotazioneOspite from "./PrenotazioneOspite";
import SidebarUtente from "../SchermataPersonaleUtente/SidebarUtente";
import axios from "axios";
import mostraDialogErrore from "../../Actions/errore";
import FormRicerca from "../FormRicerca";
import {useHistory, useLocation} from "react-router-dom";
import reindirizza from "../../Actions/reindirizzamento";

function SchermataPrenotazioniOspite() {
    const history = useHistory();
    const location = useLocation();

    // Prenotazioni
    const [richieste, setRichieste] = useState([]);
    const [confermate, setConfermate] = useState ([]);

    useEffect(() => {

        if (sessionStorage.getItem("utente") && JSON.parse(sessionStorage.getItem("utente")).idUtente) {

            let idUtente = JSON.parse(sessionStorage.getItem("utente")).idUtente;

            axios.post(`/prenotazione/listaPrenotazioniUtente`, {idUtente: idUtente}).then(res => {
                console.log(res.data);

                let rich = [];
                let conf = [];

                for (let prenotazione of res.data)
                    (prenotazione.confermata === 0) ? rich.push(prenotazione) : conf.push(prenotazione);


                setRichieste(rich);
                setConfermate(conf);
            })
                .catch(() => mostraDialogErrore());
        }

        else {
            reindirizza(history, {
                pathname: '/accedi',
                state: {
                    provenienza: 'Schermata Prenotazioni Ospite',
                    urlProvenienza: location.pathname
                }

            }, 3000, "Devi effettuare l'accesso per visualizzare le tue prenotazioni!");
        }
    }, []);

    const rimuoviRichiesta = (id) => {
        let tmp = [...richieste];
        let arrayID = tmp.map((richiesta) => { return richiesta.idPrenotazione });
        let index = arrayID.indexOf(id);
        tmp.splice(index, 1);
        setRichieste(tmp);
    }

    const rimuoviConfermate = (id) => {
        let tmp = [...confermate];
        const index = tmp.map((prenotazione) => { return prenotazione.idPrenotazione }).indexOf(id);
        tmp.splice(index, 1);
        setConfermate(tmp);
    }

    return (
        <div>
            <div className="row mx-auto">
                <SidebarUtente/>
                <div className="container my-3 col-12 pr-3 col-md-9">

                    {/* Richieste in attesa */}
                    { richieste[0] && (
                        <div className="my-3">
                            <h3>Richieste in attesa</h3>
                            <ul className="list-group list-group-flush ">
                                { richieste.map((richiesta) => {
                                    return <PrenotazioneOspite key={richiesta.idPrenotazione} prenotazione={richiesta} rimuovi={rimuoviRichiesta} />
                                })}
                            </ul>
                        </div>
                    )}

                    {/* Prenotazioni prenotazioni */}
                    { confermate[0] && (
                        <div className="my-3">
                            <h3>Prenotazioni precedenti</h3>
                            <ul className="list-group list-group-flush ">
                                { confermate.map((prenotazione) => {
                                  return <PrenotazioneOspite key={prenotazione.idPrenotazione} prenotazione={prenotazione} rimuovi={rimuoviConfermate} />
                                })}
                            </ul>
                        </div>
                    )}

                    { !richieste[0] && !confermate[0] && (
                        <div className="card shadow p-3 m-2 m-sm-3 maxw-xl text-center">
                            <h4>Pare che tu non abbia ancora alcuna prenotazione.</h4>
                            <h4>Sarà forse il momento di fare la prima?</h4>
                            <FormRicerca />
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default SchermataPrenotazioniOspite;