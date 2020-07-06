import React, {useState} from "react";
import axios from "axios";
import mostraDialogErrore from "../../Actions/errore";
import {confirmAlert} from "react-confirm-alert";
import {convertiData} from "../../Actions/gestioneDate";
import {Link} from "react-router-dom";

function PrenotazioneOspite(props) {
    // Gestiscono il funzionamento dei pulsanti per mostrare/nascondere le informazioni aggiuntive
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    // Stringhe per date e orari
    const dataCheckIn = new Date(props.prenotazione.checkIn);
    const stringaCheckIn = `${dataCheckIn.toLocaleDateString()} ${dataCheckIn.toLocaleTimeString().slice(0, 5)}`;
    const dataCheckOut = new Date(props.prenotazione.checkOut);
    const stringaCheckOut = `${dataCheckOut.toLocaleDateString()} ${dataCheckOut.toLocaleTimeString().slice(0, 5)}`;
    const dataCS = new Date(((props.prenotazione.confermata === 1) ? props.prenotazione.dataConferma : props.prenotazione.dataScadenza ));
    const stringaDateCS = dataCS.toLocaleDateString();
    const stringaTimeCS = dataCS.toLocaleTimeString().slice(0, 5);

    const mostraDialogConferma = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui">
                        <h3>Sei sicuro di voler annullare la prenotazione?</h3>
                        <div className="text-right">
                            <button className="btn btn-secondary px-3 py-2 m-2" onClick={onClose}>No, torna indietro</button>
                            <button className="btn btn-danger px-3 py-2 m-2" onClick={() => {
                                annullaPrenotazione();
                                onClose();
                            }} >
                                Sì, voglio annullare la prenotazione!
                            </button>
                        </div>
                    </div>
                )}
        })
    }

    const annullaPrenotazione = () => {
        axios.post('/prenotazione/annullamento', {idPrenotazione: props.prenotazione.idPrenotazione})
            .then(() => {

                let emailUtente= JSON.parse(window.sessionStorage.getItem("utente")).email;
                const informazioni = {
                    id: props.prenotazione.idPrenotazione,
                    struttura: props.prenotazione.nomeStruttura,
                    data: props.prenotazione.checkIn,
                    emailOspite: emailUtente,
                    emailGestore: props.prenotazione.email,
                }

                axios.post('/mail/annullamento-prenotazione', informazioni)
                    .catch(err => console.log(err));

                props.rimuovi(props.prenotazione.idPrenotazione);
            })
             .catch(() => {
                mostraDialogErrore();
            });
    }

    return (
        <li className={"rounded list-group-item text-dark border border-dark"}>
            <div className="row">
                <div className="col-12 col-sm-3 col-lg-4 h-100 my-auto">
                    <strong>Struttura</strong>
                    <br/>
                    <span>{props.prenotazione.nomeStruttura}</span>
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Check-in</strong>
                    <br/>
                    <span>{stringaCheckIn}</span>
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Check-out</strong>
                    <br />
                    <span>{stringaCheckOut}</span>
                </div>
                <div className="col-12 col-sm-3 col-lg-2 h-100 my-auto">
                    <div>
                        <strong>{(props.prenotazione.confermata === 1) ? "Confermata il" : "Scade il"}</strong>
                        <br />
                        <span>{stringaDateCS}</span>
                    </div>
                </div>
                <div className="col-12 col-lg-2 h-100 my-auto">
                    <button className="btn btn-warning btn-block btn-lg-inline" onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Mostra di più"}</button>
                </div>

                <div className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                    <div className="row">
                        {/* TODO: sistemare foto */}
                        <div className="d-none d-lg-block col-3">
                            <figure className="figure overflow-hidden rounded maxh-200px">
                                <img className="w-100 h-100 img-cover img-fluid" alt={props.prenotazione.nomeStruttura} src={`/uploads/foto/${props.prenotazione.foto}`} />
                            </figure>
                        </div>

                        <div className="col-12 col-lg-9">
                            <div className="w-100 text-md-left">
                                <div>
                                    <h5>Ospiti</h5>
                                    <div className="row mx-auto mb-3">
                                        <div className="row col-12">
                                            <div className="col-12 col-md-6">
                                                <strong>Adulti</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nAdulti}</span>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <strong>Bambini</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nBambini}</span>
                                            </div>
                                        </div>

                                        <div className="row col-12 mt-2 mt-md-0">
                                            <div className="col-12 col-md-6">
                                                <strong>Adulti esenti da tasse</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nEsentiAdulti || 0}</span>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <strong>Bambini esenti da tasse</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nEsentiBambini || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto">
                                    { props.prenotazione.tipologiaStruttura && props.prenotazione.tipologiaStruttura=== "B&B" && (
                                        <div className="col-12 col-md-4">
                                            <h5 style={{marginLeft: -15 + "px"}}>Camere</h5>
                                            <div  className="mb-3">
                                                {props.prenotazione.camere && props.prenotazione.camere.map((camera, indice) => {
                                                    return (
                                                        <div key={indice} className="mb-2 mb-md-0">
                                                            Camera {camera.idCamera}: {camera.tipologiaCamera}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div className="col-12 col-md-8">
                                        <h5 style={{marginLeft: -15 + "px"}}>Altre informazioni</h5>
                                        <div className="mb-3">
                                            <div className="mb-2 mb-md-0">
                                                <strong>Prezzo</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.costo}€</span>
                                            </div>

                                            <div className="mb-2 mb-md-0">
                                                <strong>Pagamento</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                { props.prenotazione.metodoPagamento ?
                                                    <span> online </span>   :
                                                    <span> in loco</span>
                                                }
                                            </div>


                                            <div className="mb-2 mb-md-0">
                                                <strong>Stato:&nbsp;</strong>
                                                    <span>
                                                        {(props.prenotazione.confermata === 1) ? "confermata il" : "scade il"} {stringaDateCS}
                                                        &nbsp;alle {stringaTimeCS}
                                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-md-flex flex-md-nowrap">
                        <div className="order-1 m-2 ml-md-auto">
                            <Link className="btn btn-primary btn-block" to={`/struttura/${props.prenotazione.idStruttura}`}>Visualizza struttura</Link>
                        </div>

                        <div className="order-2 m-2">
                            <a href={`mailto:${props.prenotazione.email}`} className="btn btn-primary btn-block">
                                Contatta il gestore
                            </a>
                        </div>

                        {((props.prenotazione.confermata === 1 && new Date(convertiData(dataCheckIn, 0, -1, 0)) < new Date() || props.prenotazione.confermata === 0)) && (
                            <div className="order-0 m-2 mr-md-auto">
                                <button className="btn btn-secondary btn-block" onClick={mostraDialogConferma}>Annulla prenotazione</button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </li>
    )
}

export default PrenotazioneOspite;