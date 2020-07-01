import React, {useState} from "react";

function RichiestaPrenotazioneOspite(props) {
    const [mostraContenuto, setMostraContenuto] = useState(false);

    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    // TODO: Da rimuovere
    const struttura = { gestore: { email: "softengineers@gmail.com" } };

    return (
        <li className={"rounded list-group-item text-dark border border-dark"+ ((!props.primo) ? " border-top-0" : "")}>
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
                    <strong>Conferma</strong>
                    <br />
                    <span>{props.prenotazione.conferma.data}</span>
                </div>
                <div className="col-12 col-lg-2 h-100 my-2">
                    <button className="btn btn-warning btn-block btn-lg-inline" onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Mostra di più"}</button>
                </div>

                <div className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                    <div className="row">

                        <div className="d-none d-lg-block col-3">
                            <figure className="figure overflow-hidden rounded" style={{maxHeight: 140 + "px"}}>
                                <img className="w-100 h-100 img-cover img-fluid" alt={props.prenotazione.struttura.nome} src="/uploads/foto/1/1.jpg" />
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
                                                <span>{props.prenotazione.ospiti.adulti}</span>
                                            </div>

                                            <div className="col-12 col-md-4">
                                                <strong>Bambini</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.ospiti.bambini}</span>
                                            </div>
                                        </div>

                                        <div className="row col-12 mt-2 mt-md-0">
                                            <div className="col-12 col-md-4">
                                                <strong>Adulti esenti da tasse</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.ospiti.adultiEsenti}</span>
                                            </div>

                                            <div className="col-12 col-md-4">
                                                <strong>Bambini esenti da tasse</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.ospiti.bambiniEsenti}</span>
                                            </div>
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

                                                    else return null;
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
                                                <strong>Conferma</strong>
                                                <strong className="d-none d-md-inline">: </strong>
                                                <br className="d-md-none" />
                                                <span>{props.prenotazione.conferma.data} alle ore {props.prenotazione.conferma.ora}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-md-flex">
                        <div className="p-2 col-12 col-md-3 ml-auto">
                            <button className="btn btn-primary btn-block">Visualizza struttura</button>
                        </div>

                        <div className="p-2 col-12 col-md-3">
                            <a href={`mailto:${struttura.gestore.email}`} className="btn btn-primary btn-block">Contatta il gestore</a>
                        </div>
                    </div>
                </div>

            </div>
        </li>
    )
}

export default RichiestaPrenotazioneOspite;