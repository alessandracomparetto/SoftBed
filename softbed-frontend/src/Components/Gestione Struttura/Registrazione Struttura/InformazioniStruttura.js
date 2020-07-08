import React, {Fragment, useEffect} from "react";
import Breadcrumb from "../../Componenti Parziali/Breadcrumb";
import ImmaginiStruttura from "../../Ricerca/Schermata Struttura/ImmaginiStruttura";

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

function InformazioniStruttura (props){

    function converti(giorni){
        let x;
        switch (parseInt(giorni)) {
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
                x = "debug";
        }
        return x;
    }

    useEffect(()=>{

    }, [props.struttura]);

    return(
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
            {/* TODO idStruttura={props.struttura.idStruttura}*/}
            <ImmaginiStruttura struttura={props.struttura} idStruttura={""}/>

            {/* Informazioni e caratteristiche struttura */}
            <div className="d-block">
                <div className="shadow my-3 card bg-white p-3">
                    <h6><strong>Descrizione</strong></h6>
                    <p>{props.struttura.descrizione}</p>
                    <InformazioneLineare nome="Indirizzo" valore={`${props.struttura.via}, numero ${props.struttura.numeroCivico}, CAP ${props.struttura.cap}`} />

                    {/*Caratteristiche*/}
                    <div className="my-3">
                        {/* Per Casa Vacanze */}
                        { props.struttura.tipologiaStruttura==="cv" && (
                            <Fragment>
                                <InformazioneLineare nome="Numero di letti matrimoniali" valore={`${props.struttura.nLettiMatrimoniali}`}/>
                                <InformazioneLineare nome="Numero di letti singoli" valore={`${props.struttura.nLettiSingoli}`}/>
                                <InformazioneLineare nome="Numero di bagni" valore={`${props.struttura.nBagni}`}/>
                                <InformazioneLineare nome="Prezzo a notte" valore={`${props.struttura.prezzoNotte} €`} />
                                <div className="row py-2 mx-0">
                                    {(props.struttura.salotto !=0  || props.struttura.giardino !=0 || props.struttura.terrazza!=0 || props.struttura.piscina !=0) &&
                                    (
                                        <div className="col-12">
                                            <h6><strong>Ambienti: </strong></h6>
                                            <ul>
                                                {props.struttura.salotto != 0 &&(
                                                    <li>Salotto </li>
                                                )}
                                                {props.struttura.giardino != 0 &&(
                                                    <li>Giardino </li>
                                                )}
                                                {props.struttura.terrazza != 0 &&(
                                                    <li>Terrazza </li>
                                                )}
                                                {props.struttura.piscina !=0 &&(
                                                    <li>Piscina </li>
                                                )}
                                            </ul>
                                        </div>)}
                                </div>
                            </Fragment>
                        )}
                        {/* Per B&B */}
                        { props.struttura.tipologiaStruttura==="B&B" && (
                            <Fragment>
                                <h6><strong>Camere: </strong></h6>

                                <ul>
                                    { props.struttura.camere.map((camera, indice) => {
                                        return (
                                            <li key={indice}>{`Camera ${indice+1} : ${props.struttura.camere[indice].tipologiaCamera}, letti matrimoniali: ${props.struttura.camere[indice].nLettiMatrimoniali}, letti singoli: ${props.struttura.camere[indice].nLettiSingoli}, 
                                    prezzo base a notte: ${props.struttura.camere[indice].prezzoBaseANotte}€`}</li>
                                        )
                                    })}
                                </ul>
                            </Fragment>
                        )}
                        {/* Servizi */}
                        <div className="my-1">
                            {(props.struttura.wifi !=0 || props.struttura.riscaldamento !=0|| props.struttura.strutturaDisabili  !=0|| props.struttura.ariaCondizionata !=0
                                || props.struttura.TV  !=0|| props.struttura.parcheggio !=0 || props.struttura.servizioInCamera !=0 || props.struttura.navettaAeroportuale !=0) &&
                            (
                                <div className="col-12">
                                    <h6><strong>Servizi</strong></h6>

                                    <strong>Servizi disponibili: </strong>
                                    <ul>
                                        {props.struttura.wifi !=0 &&(
                                            <li>Wifi</li>
                                        )}
                                        {props.struttura.riscaldamento !=0 &&(
                                            <li>Riscaldamento </li>
                                        )}
                                        { props.struttura.strutturaDisabili !=0 &&(
                                            <li>Strutture per disabili </li>
                                        )}
                                        {props.struttura.ariaCondizionata !=0 &&(
                                            <li>Aria condizionata </li>
                                        )}
                                        {props.struttura.TV !=0 &&(
                                            <li>TV </li>
                                        )}
                                        {props.struttura.parcheggio !=0 &&(
                                            <li>Parcheggio </li>
                                        )}
                                        {props.struttura.servizioInCamera !=0 &&(
                                            <li>Servizio in camera </li>
                                        )}
                                        {props.struttura.navettaAeroportuale !=0 &&(
                                            <li>Navetta Aereoportuale</li>
                                        )}
                                    </ul>
                                </div>)}
                        </div>

                        { (props.struttura.permessoFumare !=0 || props.struttura.animaliAmmessi !=0 || props.struttura.festeAmmesse !=0 || props.struttura.bambini !=0 ) &&
                        (
                            <div className="col-12">
                                <strong>Sugli ospiti: </strong>
                                <ul>
                                    {props.struttura.permessoFumare !=0 &&(
                                        <li>Permesso di fumare</li>
                                    )}
                                    {props.struttura.animaliAmmessi !=0 &&(
                                        <li>Animali ammessi </li>
                                    )}
                                    { props.struttura.festeAmmesse !=0 &&(
                                        <li>Permesso per feste ed eventi </li>
                                    )}
                                    {props.struttura.bambini !=0 &&(
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
                                        <InformazioneLineare nome="Politica di cancellazione" valore={`Non gratuita con preavviso massimo di disdetta ${converti(props.struttura.preavvisoDisdetta)} e penale pari a ${props.struttura.penaleCancellazione} €`} />
                                    )
                            }
                        </div>
                        <div className="py-3">
                            <h6><strong>Tasse di soggiorno</strong></h6>
                            <InformazioneLineare nome="Prezzo base adulti" valore={`${props.struttura.prezzoAdulti} €`}/>
                            <InformazioneLineare nome="Prezzo base bambini" valore={`${props.struttura.prezzoBambini} €`}/>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default InformazioniStruttura;