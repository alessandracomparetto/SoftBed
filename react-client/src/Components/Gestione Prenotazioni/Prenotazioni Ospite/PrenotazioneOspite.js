import React, {useState} from "react";
import axios from "axios";
import mostraDialogErrore from "../../../Actions/errore";
import {confirmAlert} from "react-confirm-alert";
import {convertiData} from "../../../Actions/gestioneDate";
import {Link} from "react-router-dom";

function PrenotazioneOspite(props) {
    // Gestiscono il funzionamento dei pulsanti per mostrare/nascondere le informazioni aggiuntive
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    // Stringhe per date e orari
    const dataCheckIn = new Date(props.prenotazione.checkin);
    const stringaCheckIn = `${dataCheckIn.toLocaleDateString()} ${dataCheckIn.toLocaleTimeString().slice(0, 5)}`;

    const dataCheckOut = new Date(props.prenotazione.checkout);
    const stringaCheckOut = `${dataCheckOut.toLocaleDateString()} ${dataCheckOut.toLocaleTimeString().slice(0, 5)}`;

    const dataCS = new Date((
        (props.prenotazione.confermata === true) ?
            props.prenotazione.dataconferma : props.prenotazione.datascadenza
    ));
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
        axios.post('/booking/annullamento', {idprenotazione: props.prenotazione.idprenotazione})
            .then(() => {

                let emailUtente= JSON.parse(window.sessionStorage.getItem("utente")).email;
                const informazioni = {
                    id: props.prenotazione.idprenotazione,
                    struttura: props.prenotazione.nomestruttura,
                    data: props.prenotazione.checkin,
                    emailospite: emailUtente,
                    emailgestore: props.prenotazione.email,
                }

                axios.post('/mail/annullamento-prenotazione', informazioni)
                    .catch(err => console.error(err));

                props.rimuovi(props.prenotazione.idprenotazione);
            })
             .catch(() => {
                mostraDialogErrore();
            });
    }

    return (
        <li className={"rounded list-group-item bg-dark text-white"}>
            <div className="row">
                <div className="col-12 col-sm-3 col-lg-4 h-100 my-auto">
                    <strong>Struttura</strong>
                    <br/>
                    <span>{props.prenotazione.nomestruttura}</span>
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
                        <strong>{(props.prenotazione.confermata === true) ? "Confermata il" : "Scade il"}</strong>
                        <br />
                        <span>{stringaDateCS}</span>
                    </div>
                </div>
                <div className="col-12 col-lg-2 h-100 my-auto">
                    <button className="btn btn-warning btn-block btn-lg-inline" onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Mostra di più"}</button>
                </div>

                <div className={"col-12 mt-3 pt-4 pb-2 border-top border-light" + ((mostraContenuto) ? "" : " collapse")}>
                    <div className="row">
                        <div className="d-none d-lg-block col-3">
                            <figure className="figure overflow-hidden rounded maxh-200px">
                                <img className="w-100 h-100 img-cover img-fluid" alt={props.prenotazione.nomestruttura} src={`/uploads/foto/${props.prenotazione.foto}`} />
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
                                                <span>{props.prenotazione.nadulti}</span>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <strong>Bambini</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nbambini}</span>
                                            </div>
                                        </div>

                                        <div className="row col-12 mt-2 mt-md-0">
                                            <div className="col-12 col-md-6">
                                                <strong>Adulti esenti da tasse</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nesentiadulti || 0}</span>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <strong>Bambini esenti da tasse</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.nesentibambini || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto">
                                    {/*{ props.prenotazione.tipologiastruttura && props.prenotazione.tipologiastruttura=== "B&B" && (*/}
                                    {/*    <div className="col-12 col-md-4">*/}
                                    {/*        <h5 style={{marginLeft: -15 + "px"}}>Camere</h5>*/}
                                    {/*        <div  className="mb-3">*/}
                                    {/*            {props.prenotazione.camere && props.prenotazione.camere.map((camera, indice) => {*/}
                                    {/*                return (*/}
                                    {/*                    <div key={indice} className="mb-2 mb-md-0">*/}
                                    {/*                        Camera {camera.idCamera}: {camera.tipologiacamera}*/}
                                    {/*                    </div>*/}
                                    {/*                );*/}
                                    {/*            })}*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}

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
                                                { props.prenotazione.metodopagamento ?
                                                    <span> online </span>   :
                                                    <span> in loco</span>
                                                }
                                            </div>


                                            <div className="mb-2 mb-md-0">
                                                <strong>Stato:&nbsp;</strong>
                                                    <span>
                                                        {
                                                            (props.prenotazione.confermata === true) ?
                                                                "confermata il" : "scade il"
                                                        } {stringaDateCS}
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
                            <Link className="btn btn-primary btn-block" to={`/struttura/${props.prenotazione.idstruttura}`}>Visualizza struttura</Link>
                        </div>

                        <div className="order-2 m-2">
                            <a href={`mailto:${props.prenotazione.email}`} className="btn btn-primary btn-block">
                                Contatta il gestore
                            </a>
                        </div>

                        {((props.prenotazione.confermata === true && new Date(convertiData(dataCheckIn, 0, -1, 0)) < new Date() || props.prenotazione.confermata === false)) && (
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