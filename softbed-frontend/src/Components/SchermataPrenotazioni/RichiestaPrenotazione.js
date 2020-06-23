import React, {useState} from "react";

function RichiestaPrenotazione(props) {
    const [mostraContenuto, setMostraContenuto] = useState(false);

    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    return (
        <li className={"rounded text-center list-group-item list-group-item-warning text-dark border border-dark"+ ((!props.primo) ? " border-top-0" : "")}>
            <div className="row">
                <div className="col-12 col-sm-3 col-lg-4 h-100 my-auto">
                    <strong>Struttura</strong>
                    <br/>
                    <span>{props.richiesta.struttura}</span>
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Check In</strong>
                    <br/>
                    <span>{props.richiesta.checkIn}</span>
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Check out</strong>
                    <br />
                    <span>{props.richiesta.checkOut}</span>
                </div>
                <div className="col-12 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Scadenza</strong>
                    <br />
                    <span>{props.richiesta.scadenza.data}</span>
                </div>
                <div className="col-12 col-lg-2 h-100 text-center my-2">
                    <button className="btn btn-warning btn-block btn-lg-inline" onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Mostra di più"}</button>
                </div>

                <div className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                    <div className="row">

                        <div className="d-none d-lg-block col-3">
                            <figure className="figure overflow-hidden rounded" style={{maxHeight: 140 + "px"}}>
                                <img className="w-100 h-100 img-cover img-fluid" alt={props.richiesta.struttura} src="/uploads/1/1.jpg" />
                            </figure>
                        </div>

                        <div className="col-12 col-lg-9">
                            <div className="w-100 text-md-left">
                                <div className="d-flex flex-row my-3">
                                    <div className="col-4">
                                        <strong>Adulti</strong>
                                        <strong className="d-none d-md-inline">: </strong>
                                        <br className="d-md-none" />
                                        <span>{props.richiesta.ospiti.adulti}</span>
                                    </div>

                                    <div className="col-4">
                                        <strong>Bambini</strong>
                                        <strong className="d-none d-md-inline">: </strong>
                                        <br className="d-md-none" />
                                        <span>{props.richiesta.ospiti.bambini}</span>
                                    </div>

                                    <div className="col-4">
                                        <strong>Esenti da tasse</strong>
                                        <strong className="d-none d-md-inline">: </strong>
                                        <br className="d-md-none" />
                                        <span>{props.richiesta.ospiti.esenti}</span>
                                    </div>
                                </div>

                                <div className="d-flex flex-row my-3">
                                    <div className="col-4">
                                        <strong>Pagamento</strong>
                                        <strong className="d-none d-md-inline">: </strong>
                                        <br className="d-md-none" />
                                        <span>{props.richiesta.pagamento}</span>
                                    </div>

                                    <div className="col-4">
                                        <strong>Prezzo</strong>
                                        <strong className="d-none d-md-inline">: </strong>
                                        <br className="d-md-none" />
                                        <span>{props.richiesta.prezzo}€</span>
                                    </div>
                                </div>

                                <div className="col-12 my-3">
                                    <strong>Scadenza</strong>
                                    <strong className="d-none d-md-inline">: </strong>
                                    <br className="d-md-none" />
                                    <span>{props.richiesta.scadenza.data} alle ore {props.richiesta.scadenza.ora}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-md-flex flex-md-nowrap">

                        <div className="order-1 p-2 col-12 col-md-3">
                            <button className="btn btn-primary btn-block">Visualizza struttura</button>
                        </div>

                        <div className="order-2 p-2 col-12 col-md-3">
                            <button className="btn btn-primary btn-block">Contatta il gestore</button>
                        </div>

                        <div className="order-0 mr-md-auto p-2 col-12 col-md-3">
                            <button className="btn btn-secondary btn-block">Annulla prenotazione</button>
                        </div>
                    </div>
                </div>

            </div>
        </li>
    )
}

export default RichiestaPrenotazione;