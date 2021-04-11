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

function InformazioniStruttura (props) {
    console.log(props)

    function converti(giorni) {
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
                x = "nullo (disdetta non ammessa)";
        }
        return x;
    }

    useEffect(()=>{

    }, [props.struttura]);

    return(
        <Fragment>
            {/* Nome e località */}
            <div className="shadow mt-3 card bg-white p-3">
                <h3>{props.struttura.nomestruttura}</h3>
                <Breadcrumb gerarchia={[
                    {testo: props.struttura.nomeregione, active: true},
                    {testo: props.struttura.nomeprovincia, active: true},
                    {testo: props.struttura.nomecomune, active: true},
                ]} icona="map"/>
            </div>

            {/* Immagini */}
            {/* TODO idstruttura={props.struttura.idstruttura}*/}
            <ImmaginiStruttura struttura={props.struttura} idstruttura={""}/>

            {/* Informazioni e caratteristiche struttura */}
            <div className="d-block">
                <div className="shadow my-3 card bg-white p-3">
                    <h6><strong>Descrizione</strong></h6>
                    <p>{props.struttura.descrizione}</p>
                    <InformazioneLineare nome="Indirizzo" valore={`${props.struttura.via}, numero ${props.struttura.numerocivico}, CAP ${props.struttura.cap}`} />

                    {/*Caratteristiche*/}
                    <div className="my-3">
                        {/* Per Casa Vacanze */}
                        { props.struttura.tipologiastruttura==="cv" && (
                            <Fragment>
                                <InformazioneLineare nome="Numero di letti matrimoniali" valore={`${props.struttura.nlettimatrimoniali}`}/>
                                <InformazioneLineare nome="Numero di letti singoli" valore={`${props.struttura.nlettisingoli}`}/>
                                <InformazioneLineare nome="Numero di bagni" valore={`${props.struttura.nbagni}`}/>
                                <InformazioneLineare nome="Prezzo a notte" valore={`${props.struttura.prezzonotte} €`} />
                                <div className="row py-2 mx-0">
                                    {(props.struttura.salotto  || props.struttura.giardino || props.struttura.terrazza || props.struttura.piscina) &&
                                    (
                                        <div className="col-12">
                                            <h6><strong>Ambienti: </strong></h6>
                                            <ul>
                                                {props.struttura.salotto && (
                                                    <li>Salotto </li>
                                                )}
                                                {props.struttura.giardino && (
                                                    <li>Giardino </li>
                                                )}
                                                {props.struttura.terrazza && (
                                                    <li>Terrazza </li>
                                                )}
                                                {props.struttura.piscina && (
                                                    <li>Piscina </li>
                                                )}
                                            </ul>
                                        </div>)}
                                </div>
                            </Fragment>
                        )}
                        {/* Per B&B */}
                        { props.struttura.tipologiastruttura === "B&B" && (
                            <Fragment>
                                <h6><strong>Camere: </strong></h6>

                                <ul>
                                    { props.struttura.camere.map((camera, indice) => {
                                        return (
                                            <li key={indice}>{`Camera ${indice+1} : ${props.struttura.camere[indice].tipologiacamera}, letti matrimoniali: ${props.struttura.camere[indice].nlettimatrimoniali}, letti singoli: ${props.struttura.camere[indice].nlettisingoli}, 
                                    prezzo base a notte: ${props.struttura.camere[indice].prezzobaseanotte}€`}</li>
                                        )
                                    })}
                                </ul>
                            </Fragment>
                        )}
                        {/* Servizi */}
                        <div className="my-1">
                            {(
                                props.struttura.wifi ||
                                props.struttura.riscaldamento ||
                                props.struttura.strutturadisabili ||
                                props.struttura.ariacondizionata ||
                                props.struttura.tv ||
                                props.struttura.parcheggio ||
                                props.struttura.servizioincamera ||
                                props.struttura.navettaaeroportuale
                            ) && (
                                <div className="col-12">
                                    <h6><strong>Servizi</strong></h6>

                                    <strong>Servizi disponibili: </strong>
                                    <ul>
                                        {props.struttura.wifi && (
                                            <li>Wifi</li>
                                        )}
                                        {props.struttura.riscaldamento && (
                                            <li>Riscaldamento </li>
                                        )}
                                        {props.struttura.strutturadisabili && (
                                            <li>Strutture per disabili </li>
                                        )}
                                        {props.struttura.ariacondizionata && (
                                            <li>Aria condizionata </li>
                                        )}
                                        {props.struttura.tv && (
                                            <li>TV </li>
                                        )}
                                        {props.struttura.parcheggio && (
                                            <li>Parcheggio </li>
                                        )}
                                        {props.struttura.servizioincamera && (
                                            <li>Servizio in camera </li>
                                        )}
                                        {props.struttura.navettaaeroportuale && (
                                            <li>Navetta Aereoportuale</li>
                                        )}
                                    </ul>
                                </div>)}
                        </div>

                        {(
                            props.struttura.permessofumare ||
                            props.struttura.animaliammessi ||
                            props.struttura.festeammesse ||
                            props.struttura.bambini
                        ) && (
                            <div className="col-12">
                                <strong>Sugli ospiti: </strong>
                                <ul>
                                    {props.struttura.permessofumare && (
                                        <li>Permesso di fumare</li>
                                    )}
                                    {props.struttura.animaliammessi && (
                                        <li>Animali ammessi </li>
                                    )}
                                    {props.struttura.festeammesse && (
                                        <li>Permesso per feste ed eventi </li>
                                    )}
                                    {props.struttura.bambini && (
                                        <li>Disponibilità ad ospitare bambini </li>
                                    )}
                                </ul>
                            </div>)}
                        {/* Condizioni di prenotazione */}
                        <div className="py-3">
                            <h6><strong>Condizioni di prenotazione</strong></h6>
                            <InformazioneLineare nome="Durata soggiorno" valore={`${props.struttura.minsoggiorno} - ${props.struttura.maxsoggiorno}`} />
                            <InformazioneLineare nome="Anticipo prenotazione" valore={`${converti(props.struttura.anticipoprenotazionemin)} (min) - ${converti(props.struttura.anticipoprenotazionemax)} (max)`} />

                            {/* Fascia oraria check-in e check-out */}
                            <InformazioneLineare nome="Fascia oraria check-in" valore={`${props.struttura.orainiziocheckin && props.struttura.orainiziocheckin.slice(0, 5)} - ${props.struttura.orafinecheckin && props.struttura.orafinecheckin.slice(0, 5)}`} />
                            <InformazioneLineare nome="Fascia oraria check-out" valore={`${props.struttura.orainiziocheckout && props.struttura.orainiziocheckout.slice(0, 5)} - ${props.struttura.orafinecheckout && props.struttura.orafinecheckout.slice(0, 5)}`} />
                        </div>

                        <div className="py-3">
                            <h6><strong>Condizioni di pagamento</strong></h6>
                            <InformazioneLineare nome="Pagamento in loco" valore={(props.struttura.pagamentoloco) ? "accettato" : "non accettato"} />
                            <InformazioneLineare nome="Pagamento online" valore={(props.struttura.pagamentoonline) ? "accettato" : "non accettato"} />
                            {
                                props.struttura.politicacancellazione === "gratuita" ?
                                    (
                                        <InformazioneLineare nome="Politica di cancellazione" valore={"gratuita"} />
                                    ):(
                                        <InformazioneLineare nome="Politica di cancellazione" valore={`Non gratuita con preavviso massimo di disdetta ${converti(props.struttura.preavvisodisdetta)} e penale pari a ${props.struttura.penalecancellazione || 0.00} €`} />
                                    )
                            }
                        </div>
                        <div className="py-3">
                            <h6><strong>Tasse di soggiorno</strong></h6>
                            <InformazioneLineare nome="Prezzo base adulti" valore={`${props.struttura.prezzoadulti} €`}/>
                            <InformazioneLineare nome="Prezzo base bambini" valore={`${props.struttura.prezzobambini} €`}/>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default InformazioniStruttura;