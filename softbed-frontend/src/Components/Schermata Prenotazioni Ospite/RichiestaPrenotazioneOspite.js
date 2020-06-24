import React, {useState} from "react";

function RichiestaPrenotazioneOspite(props) {
    const [mostraContenuto, setMostraContenuto] = useState(false);

    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    return (
        <li className={"rounded list-group-item list-group-item-warning text-dark border border-dark"+ ((!props.primo) ? " border-top-0" : "")}>
            <div className="row">
                <div className="col-12 col-sm-3 col-lg-4 h-100 my-auto">
                    <strong>Struttura</strong>
                    <br/>
                    <span>{props.prenotazione.struttura.nome}</span>
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Check In</strong>
                    <br/>
                    <span>{props.prenotazione.checkIn}</span>
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Check out</strong>
                    <br />
                    <span>{props.prenotazione.checkOut}</span>
                </div>
                <div className="col-12 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>Scadenza</strong>
                    <br />
                    <span>{props.prenotazione.scadenza.data}</span>
                </div>
                <div className="col-12 col-lg-2 h-100 my-2">
                    <button className="btn btn-warning btn-block btn-lg-inline" onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Mostra di più"}</button>
                </div>

                <div className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                    <div className="row">

                        <div className="d-none d-lg-block col-3">
                            <figure className="figure overflow-hidden rounded" style={{maxHeight: 140 + "px"}}>
                                <img className="w-100 h-100 img-cover img-fluid" alt={props.prenotazione.struttura.nome} src="/uploads/1/1.jpg" />
                            </figure>
                        </div>

                        <div className="col-12 col-lg-9">
                            <div className="w-100 text-md-left">
                                <div>
                                    <h5>Ospiti</h5>
                                    <div className="row mx-auto mb-3">
                                        <div className="col-4">
                                            <strong>Adulti</strong>
                                            <strong className="d-none d-md-inline">: </strong>
                                            <br className="d-md-none" />
                                            <span>{props.prenotazione.ospiti.adulti}</span>
                                        </div>

                                        <div className="col-4">
                                            <strong>Bambini</strong>
                                            <strong className="d-none d-md-inline">: </strong>
                                            <br className="d-md-none" />
                                            <span>{props.prenotazione.ospiti.bambini}</span>
                                        </div>

                                        <div className="col-4">
                                            <strong>Esenti da tasse</strong>
                                            <strong className="d-none d-md-inline">: </strong>
                                            <br className="d-md-none" />
                                            <span>{props.prenotazione.ospiti.esenti}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto">
                                    { props.prenotazione.struttura.tipologia && props.prenotazione.struttura.tipologia === "b&b" && (
                                        <div className="col-12 col-md-4">
                                            <h5 style={{marginLeft: -15 + "px"}}>Camere</h5>
                                            <div  className="mb-3">
                                                {props.prenotazione.struttura.camere.map((camera, indice) => {
                                                    if (camera.numero !== 0) {
                                                        return (
                                                            <div key={indice} className="mb-2 mb-md-0">
                                                                {camera.numero}x&nbsp;<strong>{camera.tipologia}</strong>
                                                            </div>
                                                        );
                                                    }
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
                                                <span>{props.prenotazione.prezzo}€</span>
                                            </div>

                                            <div className="mb-2 mb-md-0">
                                                <strong>Pagamento</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.pagamento}</span>
                                            </div>


                                            <div className="mb-2 mb-md-0">
                                                <strong>Scadenza</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.scadenza.data} alle ore {props.prenotazione.scadenza.ora}</span>
                                            </div>
                                        </div>
                                    </div>
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

export default RichiestaPrenotazioneOspite;