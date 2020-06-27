/*
import React, {Fragment} from "react";
import Breadcrumb from "../Breadcrumb";
import ImmaginiStruttura from "../Schermata Struttura/ImmaginiStruttura";
import {Link} from "react-router-dom";
import Servizio from "../Schermata Risultati/Servizio";

/!*TODO: trasformare i numeri in nome provincia e nome comune*!/

function InformazioneLineare(props) {
    return (
        <div className="d-md-flex d-md-flex-row py-2">
            <div className="col-12 col-md-6">
                <strong>{props.nome}</strong>
            </div>
            <div className="col-12 col-md-6">
                {props.valore}
            </div>
        </div>
    );
}

function SchermataRiepilogoRegistrazione() {
    return (
        <Fragment>
            {/!* Nome e località *!/}
            <div className="shadow mt-3 card bg-white p-3">
                <h3>{struttura.name}</h3>
                <Breadcrumb gerarchia={[
                    {testo: struttura.region, active: true},
                    {testo: struttura.state, active: true},
                    {testo: struttura.town, active: true},
                ]} icona="map"/>
            </div>

            {/!* Immagini *!/}
            <ImmaginiStruttura struttura={struttura} idStruttura={struttura.id}/>

            {/!* Informazioni e caratteristiche struttura *!/}
            <div className="d-flex">
                <div className="shadow my-3 card bg-white p-3">
                    <div className="d-md-flex flex-md-row-reverse">
                        <div className="col-md-4 col-lg-3 my-2">
                            <Link to="prenotazioni" className="btn btn-block btn-warning">Prenotazioni</Link>
                        </div>

                        <div className="col-md-8 col-lg-9 px-0 mt-3 mt-md-0">
                            <h6>Informazioni sulla struttura</h6>
                            <p>{struttura.descrizione}</p>
                        </div>
                    </div>

                    {/!* Caratteristiche *!/}
                    <div className="my-3">
                        <h6>Caratteristiche</h6>

                        {/!* Per Casa Vacanze *!/}
                        { struttura.prezzo && (
                            <Fragment>
                                <InformazioneLineare nome="Prezzo a notte" valore={`${struttura.prezzo} €`} />
                                <div className="row py-2 mx-0">
                                    <div className="col-12 col-md-6">
                                        <strong>Ambienti</strong>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        { struttura.ambienti.map((ambiente, indice) => {
                                            return (
                                                <span key={indice} >{`${(indice !== 0) ? ", " : ""}${ambiente}`}</span>
                                            )
                                        })}
                                    </div>
                                </div>
                                <InformazioneLineare nome="Numero di bagni" valore={struttura.bagni} />
                            </Fragment>
                        )}

                        {/!* Per B&B *!/}
                        { struttura.camere && (
                            <div id="accordion">
                                { struttura.camere.map((camera, indice) => {
                                    return (
                                        <div className="card" key="indice">
                                            <div className="card-header" id={`headingCamera${indice}`}>
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link" data-toggle="collapse"
                                                            data-target={`#collapseCamera${indice}`} aria-expanded="true"
                                                            aria-controls={`collapseCamera${indice}`}>
                                                        Camera {indice + 1}
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id={`collapseCamera${indice}`} className="collapse"
                                                 aria-labelledby={`headingCamera${indice}`} data-parent="#accordion">
                                                <div className="card-body">
                                                    <InformazioneLineare nome="Letti matrimoniali" valore={camera.matrimoniali} />
                                                    <InformazioneLineare nome="Letti singoli" valore={camera.singoli} />
                                                    <InformazioneLineare nome="Prezzo a notte" valore={`${camera.prezzo} €`}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                    </div>

                    {/!* Servizi *!/}
                    <div className="my-3">
                        <h6>Servizi</h6>
                        <div className="row mx-auto">
                            {
                                struttura.servizi && struttura.servizi.map((servizio) => {
                                    return (
                                        <Servizio key={servizio.servizio} servizio={servizio.servizio} icona={servizio.icona}/>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/!* Condizioni di prenotazione *!/}
                    <div className="my-3">
                        <h6>Condizioni di prenotazione</h6>

                        <InformazioneLineare nome="Durata soggiorno" valore={`${struttura.prenotazione.durata.min} - ${struttura.prenotazione.durata.max}`} />
                        <InformazioneLineare nome="Anticipo prenotazione" valore={`${struttura.prenotazione.anticipo.min} (min) - ${struttura.prenotazione.anticipo.max} (max)`} />

                        {/!* Fascia oraria check-in e check-out *!/}
                        <InformazioneLineare nome="Fascia oraria check-in" valore={`${struttura.prenotazione.checkIn.inizio} - ${struttura.prenotazione.checkIn.fine}`} />
                        <InformazioneLineare nome="Fascia oraria check-out" valore={`${struttura.prenotazione.checkOut.inizio} - ${struttura.prenotazione.checkOut.fine}`} />
                    </div>

                    <div className="my-3">
                        <h6>Condizioni di pagamento</h6>
                        <InformazioneLineare nome="Pagamento in loco" valore={(struttura.pagamento.inLoco) ? "accettato" : "non accettato"} />
                        <InformazioneLineare nome="Pagamento online" valore={(struttura.pagamento.online) ? "accettato" : "non accettato"} />
                        <InformazioneLineare nome="Politica di cancellazione" valore={`${(struttura.pagamento.cancellazione) ? "gratuita" : "non gratuita"} ${(struttura.pagamento.preavviso) ? "con preavviso" : ""}`} />
                    </div>

                    <div className="my-3">
                        <h6>Tasse di soggiorno</h6>
                        <InformazioneLineare nome="Prezzo base adulti" valore={`${struttura.tasse.adulti} €`}/>
                        <InformazioneLineare nome="Prezzo base bambini" valore={`${struttura.tasse.bambini} €`}/>
                        <InformazioneLineare nome="Esclusione per soggiorni superiori a" valore={`${struttura.tasse.bonus.durataSoggiorno} giorni`} />
                        <InformazioneLineare nome="Riduzioni per gruppi composti da almeno" valore={`${struttura.tasse.bonus.numeroPersone} persone`} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SchermataRiepilogoRegistrazione;

*/
