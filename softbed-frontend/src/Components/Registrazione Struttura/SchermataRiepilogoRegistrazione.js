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
                <h3>{props.struttura.nomeStruttura}</h3>
                <Breadcrumb gerarchia={[
                    {testo: props.struttura.nomeRegione, active: true},
                    {testo: props.struttura.nomeProvincia, active: true},
                    {testo: props.struttura.nomeComune, active: true},
                ]} icona="map"/>
            </div>

            {/* Immagini */}
            <ImmaginiStruttura struttura={props.struttura} idStruttura={""}/>

            {/* Informazioni e caratteristiche struttura */}
            <div className="d-block">
                <div className="shadow my-3 card bg-white p-3">
                    <h6>Descrizione</h6>
                    <p>{props.struttura.descrizione}</p>
                    <InformazioneLineare nome="Indirizzo" valore={`${props.struttura.via}, numero ${props.struttura.numeroCivico}, CAP ${props.struttura.cap}`} />

                    {/*Caratteristiche*/}
                    <div className="my-3">
                        <h6><strong>Caratteristiche</strong></h6>

                        {/* Per Casa Vacanze */}
                        { props.struttura.tipologiaStruttura==="cv" && (
                            <Fragment>
                                <InformazioneLineare nome="Numero diletti matrimoniali" valore={`${props.struttura.nLettiMatrimoniali}`}/>
                                <InformazioneLineare nome="Numero di letti singoli" valore={`${props.struttura.nLettiSingoli}`}/>
                                <InformazioneLineare nome="Numero di bagni" valore={`${props.struttura.nBagni}`}/>
                                <InformazioneLineare nome="Prezzo a notte" valore={`${props.struttura.prezzoNotte} €`} />
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
                                    { (props.struttura.wifi || props.struttura.riscaldamento|| props.struttura.strutturaDisabili || props.struttura.ariaCondizionata
                                        || props.struttura.TV || props.struttura.parcheggio)&&
                                    (
                                        <div className="col-12">
                                            <h6><strong>Servizi</strong></h6>

                                            <strong>Servizi disponibili: </strong>
                                            <ul>
                                                {props.struttura.wifi &&(
                                                    <li>Wifi</li>
                                                )}
                                                {props.struttura.riscaldamento &&(
                                                    <li>Riscaldamento </li>
                                                )}
                                                { props.struttura.strutturaDisabili &&(
                                                    <li>Strutture per disabili </li>
                                                )}
                                                {props.struttura.ariaCondizionata &&(
                                                    <li>Aria condizionata </li>
                                                )}
                                                {props.struttura.TV &&(
                                                    <li>TV </li>
                                                )}
                                                {props.struttura.parcheggio &&(
                                                    <li>Parcheggio </li>
                                                )}
                                            </ul>
                                        </div>)}
                                </div>
                            </Fragment>
                        )}
                        {/* Per B&B */}
                        { props.struttura.tipologiaStruttura==="B&B" && (
                            <Fragment>
                                <strong>Camere: </strong>
                                <ul>
                                    { props.struttura.camere.map((camera, indice) => {
                                        return (
                                            <li>{`Camera ${indice+1} : ${props.struttura.camere[indice].tipologiaCamera}, letti matrimoniali: ${props.struttura.camere[indice].nLettiMatrimoniali}, letti singoli: ${props.struttura.camere[indice].nLettiSingoli}, 
                                    prezzo base a notte: ${props.struttura.camere[indice].prezzoBaseANotte}€`}</li>
                                        )
                                    })}
                                </ul>
                                {/* Servizi */}
                                <div className="my-1">
                                    {(props.struttura.wifi || props.struttura.riscaldamento|| props.struttura.strutturaDisabili || props.struttura.ariaCondizionata
                                        || props.struttura.TV || props.struttura.parcheggio || props.struttura.servizioInCamera || props.struttura.navettaAeroportuale) &&
                                    (
                                        <div className="col-12">
                                            <h6><strong>Servizi</strong></h6>

                                            <strong>Servizi disponibili: </strong>
                                            <ul>
                                                {props.struttura.wifi &&(
                                                    <li>Wifi</li>
                                                )}
                                                {props.struttura.riscaldamento &&(
                                                    <li>Riscaldamento </li>
                                                )}
                                                { props.struttura.strutturaDisabili &&(
                                                    <li>Strutture per disabili </li>
                                                )}
                                                {props.struttura.ariaCondizionata &&(
                                                    <li>Aria condizionata </li>
                                                )}
                                                {props.struttura.TV &&(
                                                    <li>TV </li>
                                                )}
                                                {props.struttura.parcheggio &&(
                                                    <li>Parcheggio </li>
                                                )}
                                                {props.struttura.servizioInCamera &&(
                                                    <li>Servizio in camera </li>
                                                )}
                                                {props.struttura.navettaAeroportuale &&(
                                                    <li>Navetta Aereoportuale</li>
                                                )}
                                            </ul>
                                        </div>)}
                                </div>
                            </Fragment>
                        )}

                        { (props.struttura.permessoFumare || props.struttura.animaliAmmessi|| props.struttura.festeAmmesse || props.struttura.bambini) &&
                        (
                            <div className="col-12">
                                <strong>Sugli ospiti: </strong>
                                <ul>
                                    {props.struttura.permessoFumare &&(
                                        <li>Permesso di fumare</li>
                                    )}
                                    {props.struttura.animaliAmmessi &&(
                                        <li>Animali ammessi </li>
                                    )}
                                    { props.struttura.festeAmmesse &&(
                                        <li>Permesso per feste ed eventi </li>
                                    )}
                                    {props.struttura.bambini&&(
                                        <li>Disponibilità ad ospitare bambini </li>
                                    )}
                                </ul>
                            </div>)}
                        {/* Condizioni di prenotazione */}
                        <div className="py-3">
                            <h6><strong>Condizioni di prenotazione</strong></h6>
                            <InformazioneLineare nome="Durata soggiorno" valore={`${props.struttura.minSoggiorno} - ${props.struttura.maxSoggiorno}`} />
                            <InformazioneLineare nome="Anticipo prenotazione" valore={`${converti(props.struttura.anticipoPrenotazioneMin)} (min) - ${converti(props.struttura.anticipoPrenotazioneMax)} (max)`} />

                            {/* Fascia oraria check-in e check-out */}
                            <InformazioneLineare nome="Fascia oraria check-in" valore={`${props.struttura.oraInizioCheckIn} - ${props.struttura.oraFineCheckIn}`} />
                            <InformazioneLineare nome="Fascia oraria check-out" valore={`${props.struttura.oraFineCheckOut} - ${props.struttura.oraFineCheckOut}`} />
                        </div>

                        <div className="py-3">
                            <h6><strong>Condizioni di pagamento</strong></h6>
                            <InformazioneLineare nome="Pagamento in loco" valore={(props.struttura.pagamentoLoco) ? "accettato" : "non accettato"} />
                            <InformazioneLineare nome="Pagamento online" valore={(props.struttura.pagamentoOnline) ? "accettato" : "non accettato"} />
                            {
                                props.struttura.politicaCancellazione === "gratuita" ?
                                    (
                                        <InformazioneLineare nome="Politica di cancellazione" valore={"gratuita"} />
                                    ):(
                                        <InformazioneLineare nome="Politica di cancellazione" valore={`Non gratuita con preavviso di ${converti(props.struttura.preavvisoDisdetta)} e penale pari a ${props.struttura.penaleCancellazione} €`} />
                                    )
                            }
                        </div>

                        <div className="py-3">
                            <h6><strong>Tasse di soggiorno</strong></h6>
                            <InformazioneLineare nome="Prezzo base adulti" valore={`${props.struttura.prezzoAdulti} €`}/>
                            <InformazioneLineare nome="Prezzo base bambini" valore={`${props.struttura.prezzoBambini} €`}/>
                            <InformazioneLineare nome="Esclusione per soggiorni superiori a" valore={`${props.struttura.esclusioneSoggiorni} giorni`} />
                            <InformazioneLineare nome="Riduzioni per gruppi composti da almeno" valore={`${props.struttura.nPersoneRiduzione} persone pari ad una percentuale di ${props.struttura.percentualeRiduzione}%`} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SchermataRiepilogoRegistrazione;

