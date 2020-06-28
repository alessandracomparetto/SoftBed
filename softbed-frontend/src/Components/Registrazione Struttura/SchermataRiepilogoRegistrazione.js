import React, {Fragment} from "react";
import Breadcrumb from "../Breadcrumb";
import ImmaginiStruttura from "../Schermata Struttura/ImmaginiStruttura";
import {Link} from "react-router-dom";
import Servizio from "../Schermata Risultati/Servizio";

/*TODO: trasformare i numeri in nome provincia e nome comune*/

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

function SchermataRiepilogoRegistrazione(props) {

    function converti(giorni){
        let x;
        switch (giorni) {
            case 2 :
                x = "2 giorni";
                break;
            case 3 :
                x = "3 giorni";
                break;
            case 5 :
                x = "5 giorni";
                break;
            case 7 :
                x = "1 settimana";
                break;
            case 10 :
                x = "10 giorni";
                break;
            case 14 :
                x = "2 settimane";
                break;
            case 21 :
                x = "3 settimane";
                break;
            case 30 :
                x = "1 mese";
                break;
            case 60 :
                x = "2 mesi";
                break;
            case 90 :
                x = "3 mesi";
                break;
            case 180 :
                x ="6 mesi";
                break;
            case 365 :
                x = "1 anno";
                break;
            default:
                x="debug";
        }
        return x;
    }


    if (props.currentStep !== 7){
        return null;
    }
    else return (
        <Fragment>
            {/* Nome e località */}
            <div className="shadow mt-3 card bg-white p-3">
                <h3>{props.struttura.name}</h3>
                <Breadcrumb gerarchia={[
                    {testo: props.struttura.region, active: true},
                    {testo: props.struttura.state, active: true},
                    {testo: props.struttura.town, active: true},
                ]} icona="map"/>
            </div>

           {/* Immagini */}
            <ImmaginiStruttura struttura={props.struttura} idStruttura={""}/>

            {/* Informazioni e caratteristiche struttura */}
            <div className="d-block">
                <div className="shadow my-3 card bg-white p-3">
                    <h6>Descrizione</h6>
                    <p>{props.struttura.descrizione}</p>
                    <InformazioneLineare nome="Indirizzo" valore={`${props.struttura.address}, numero ${props.struttura.addressnum}, CAP ${props.struttura.cap}`} />

                    {/*Caratteristiche*/}
                <div className="my-3">
                    <h6><strong>Caratteristiche</strong></h6>

                    {/* Per Casa Vacanze */}
                    { props.struttura.tipologia==="cv" && (
                        <Fragment>
                            <InformazioneLineare nome="Numero diletti matrimoniali" valore={`${props.struttura.nLettiMatrimoniali}`}/>
                            <InformazioneLineare nome="Numero di letti singoli" valore={`${props.struttura.nLettiSingoli}`}/>
                            <InformazioneLineare nome="Numero di bagni" valore={`${props.struttura.nBagni}`}/>
                            <InformazioneLineare nome="Prezzo a notte" valore={`${props.struttura.prezzo} €`} />
                            <div className="row py-2 mx-0">
                                {(props.struttura.salotto || props.struttura.giardino|| props.struttura.terrazza || props.struttura.piscina) &&
                                   (
                                   <div className="col-12">
                                       <strong>Ambienti: </strong>
                                        <ul>
                                        {props.struttura.salotto &&(
                                            <li>Salotto </li>
                                        )}
                                        {props.struttura.giardino &&(
                                            <li>Giardino </li>
                                        )}
                                        {props.struttura.terrazza &&(
                                            <li>Terrazza </li>
                                        )}
                                        {props.struttura.piscina &&(
                                            <li>Piscina </li>
                                        )}
                                        </ul>
                                   </div>)}
                            </div>
                            {/* Servizi */}
                            <div className="my-1">
                                {(props.struttura.connessione || props.struttura.riscaldamento|| props.struttura.disabili || props.struttura.aria
                                    || props.struttura.tv || props.struttura.parcheggio) &&
                                (
                                    <div className="col-12">
                                        <h6><strong>Servizi</strong></h6>

                                        <strong>Servizi disponibili: </strong>
                                        <ul>
                                            {props.struttura.connessione &&(
                                                <li>Wifi</li>
                                            )}
                                            {props.struttura.riscaldamento &&(
                                                <li>Riscaldamento </li>
                                            )}
                                            { props.struttura.disabili &&(
                                                <li>Strutture per disabili </li>
                                            )}
                                            {props.struttura.aria &&(
                                                <li>Aria condizionata </li>
                                            )}
                                            {props.struttura.tv &&(
                                                <li>TV </li>
                                            )}
                                            {props.struttura.parcheggio &&(
                                                <li>Parcheggio </li>
                                            )}
                                        </ul>
                                    </div>)}
                                {(props.struttura.feste || props.struttura.animali || props.struttura.permessoFumo || props.struttura.bambini) &&
                                (
                                    <div className="col-12">
                                        <strong>Sugli ospiti: </strong>
                                        <ul>
                                            {props.struttura.feste &&(
                                                <li>Permesso per feste/eventi</li>
                                            )}
                                            {props.struttura.animali &&(
                                                <li>Animali ammessi </li>
                                            )}
                                            { props.struttura.bambini &&(
                                                <li>Idoneità ad ospitare bambini </li>
                                            )}
                                        </ul>
                                    </div>)}
                            </div>

                        </Fragment>
                    )}
                    {/* Per B&B */}
                   {/* { props.struttura.tipologia==="B&B" && (
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

*/}
                    {/* Condizioni di prenotazione */}
                    <div className="py-3">
                        <h6><strong>Condizioni di prenotazione</strong></h6>
                        <InformazioneLineare nome="Durata soggiorno" valore={`${props.struttura.minSoggiorno} - ${props.struttura.maxSoggiorno}`} />
                        <InformazioneLineare nome="Anticipo prenotazione" valore={`${converti(props.struttura.minPrenotazione)} (min) - ${converti(props.struttura.maxPrenotazione)} (max)`} />

                        {/* Fascia oraria check-in e check-out */}
                        <InformazioneLineare nome="Fascia oraria check-in" valore={`${props.struttura.oraInizioCheckIn} - ${props.struttura.oraFineCheckIn}`} />
                        <InformazioneLineare nome="Fascia oraria check-out" valore={`${props.struttura.oraFineCheckOut} - ${props.struttura.oraFineCheckOut}`} />
                    </div>

                     <div className="py-3">
                        <h6><strong>Condizioni di pagamento</strong></h6>
                        <InformazioneLineare nome="Pagamento in loco" valore={(props.struttura.pagamentoLoco) ? "accettato" : "non accettato"} />
                        <InformazioneLineare nome="Pagamento online" valore={(props.struttura.pagamentoOnline) ? "accettato" : "non accettato"} />
                        <InformazioneLineare nome="Politica di cancellazione" valore={`${(props.struttura.politicaCancellazione === "gratuita") ? "gratuita" : "non gratuita con preavviso di "} ${converti(props.struttura.preavvisoDisdetta)} e penale pari a ${props.struttura.prezzoCancellazione} €`} />
                    </div>

                    <div className="py-3">
                        <h6><strong>Tasse di soggiorno</strong></h6>
                        <InformazioneLineare nome="Prezzo base adulti" valore={`${props.struttura.prezzoAdulti} €`}/>
                        <InformazioneLineare nome="Prezzo base bambini" valore={`${props.struttura.prezzoBambini} €`}/>
                        <InformazioneLineare nome="Esclusione per soggiorni superiori a" valore={`${props.struttura.nGiorniEsclusione} giorni`} />
                        <InformazioneLineare nome="Riduzioni per gruppi composti da almeno" valore={`${props.struttura.nPersone} persone`} />
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
}

export default SchermataRiepilogoRegistrazione;

