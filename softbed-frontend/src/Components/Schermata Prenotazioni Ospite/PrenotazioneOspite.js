import React, {useState} from "react";
import axios from "axios";
import mostraDialogErrore from "../../Actions/errore";
import {confirmAlert} from "react-confirm-alert";

function PrenotazioneOspite(props) {
    const [mostraContenuto, setMostraContenuto] = useState(false);

    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

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

                props.rimuovi(props.prenotazione.id);
            })
             .catch(() => {
                mostraDialogErrore();
            });
    }

    return (
        <li className={"rounded list-group-item text-dark border border-dark"}>
            {/*Todo rimuovere ogni bordo inferiore del list item tranne per l'ultimo */}
            <div className="row">
                <div className="col-12 col-sm-3 col-lg-4 h-100 my-auto">
                    <strong>Struttura</strong>
                    <br/>
                    <span>{props.prenotazione.nomeStruttura}</span>
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Check In</strong>
                    <br/>
                    <span>{new Date(props.prenotazione.checkIn).toISOString().slice(0, 19).replace('T', ' ')}</span>
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Check out</strong>
                    <br />
                    <span>{new Date(props.prenotazione.checkOut).toISOString().slice(0, 19).replace('T', ' ')}</span>
                </div>
                <div className="col-12 col-sm-3 col-lg-2 h-100 my-auto">
                    {props.prenotazione.confermata===1 ?
                        <div>
                            <strong>Confermata il </strong>
                            <br />
                            <span> {new Date(props.prenotazione.dataConferma).toISOString().slice(0, 19).replace('T', ' ')}</span>
                        </div>
                    :
                        <div>
                            <strong>Scade il </strong>
                            <br />
                            <span> {new Date(props.prenotazione.dataScadenza).toISOString().slice(0, 19).replace('T', ' ')}</span>
                        </div>
                    }
                </div>
                <div className="col-12 col-lg-2 h-100 my-2">
                    <button className="btn btn-warning btn-block btn-lg-inline" onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Mostra di più"}</button>
                </div>

                <div className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                    <div className="row">
                        {/*TODO: sistemare foto*/}
                        <div className="d-none d-lg-block col-3">
                            <figure className="figure overflow-hidden rounded" style={{maxHeight: 140 + "px"}}>
                                <img className="w-100 h-100 img-cover img-fluid" alt={props.prenotazione.nomeStruttura} src="/uploads/foto/1/1.jpg" />
                            </figure>
                        </div>

                        <div className="col-12 col-lg-9">
                            <div className="w-100 text-md-left">
                                <div>
                                    <h5>Ospiti</h5>
                                    <div className="row mx-auto mb-3">
                                        <div className="row col-12">
                                            <div className="col-12 col-md-4">
                                                <strong>Adulti</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nAdulti}</span>
                                            </div>

                                            <div className="col-12 col-md-4">
                                                <strong>Bambini</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nBambini}</span>
                                            </div>
                                        </div>

                                        <div className="row col-12 mt-2 mt-md-0">
                                            <div className="col-12 col-md-4">
                                                <strong>Adulti esenti da tasse</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nEsentiAdulti}</span>
                                            </div>

                                            <div className="col-12 col-md-4">
                                                <strong>Bambini esenti da tasse</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nEsentiBambini}</span>
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
                                                            Camera {camera.idCamera} : {camera.tipologiaCamera}
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
                                                <strong>Stato:</strong>{
                                                props.prenotazione.confermata===1 ?
                                                    <span> confermata il {new Date(props.prenotazione.dataConferma).toLocaleDateString()}</span>
                                                    :
                                                    <span> scade il {new Date(props.prenotazione.dataScadenza).toLocaleString()}</span>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-md-flex flex-md-nowrap">
                        {(props.prenotazione.confermata === 1 && props.prenotazione.checkIn < new Date() || props.prenotazione.confermata === 0) &&
                            <div className="p-2 col-12 col-md-6">
                                <div className="col-12 col-md-6 mr-auto">
                                <button className="btn btn-primary btn-block" onClick={mostraDialogConferma}>Annulla</button>
                                </div>
                            </div>
                        }
                        <div className="p-2 col-12 col-md-3 ml-auto">
                            <a href={`/struttura/${props.prenotazione.idStruttura}`}>
                                <button className="btn btn-primary btn-block"> Visualizza struttura </button>
                            </a>
                        </div>

                        <div className="p-2 col-12 col-md-3">
                            <a href={`mailto:${props.prenotazione.email}`} className="btn btn-primary btn-block">Contatta il gestore</a>
                        </div>
                    </div>
                </div>

            </div>
        </li>
    )
}

export default PrenotazioneOspite;