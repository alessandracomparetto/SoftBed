import Prenotazione from "./Prenotazione";
import React, {useState} from "react";
import SchermataPrenotazioneStruttura from "../SchermataPrenotazioneStruttura";
import $ from 'jquery';
function RichiesteInAttesa(props){
    const [prenotazioniNonConfermate, setRichiestePendenti]=useState(props.listaPrenotazioniNonConfermate);
    const [prenotazioniConfermate, aggiornaPrenotazioniConfermate]=useState(props.listaPrenotazioniConfermate);
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    function confermaPrenotazione(){
        {/*TODO inviare richiesta al beckend*/}
        let tmp = [...prenotazioniConfermate];
        tmp.push(prenotazioniNonConfermate[props.indiceElemento]);
        props.aggiornaPrenotazioniConfermate(tmp);
        console.log(prenotazioniConfermate);
        /* eliminazione della prenotazione dalle prenotazioni confermate*/
        let arg=[...prenotazioniNonConfermate];
        delete arg[props.indiceElemento];
        props.setRichiestePendenti(arg);
    }
    function rifiutaPrenotazione(e){
        {/*TODO inviare richiesta al beckend*/}
        let arg=[...prenotazioniNonConfermate];
        delete arg[props.indiceElemento];
        props.setRichiestePendenti(arg);
    }
    return(
        <div id="richiesta" >
            <div className="row  d-flex justify-content-center">
                <div className="col-4 col-md-3  mt-lg-4">
                    <strong>check-in: </strong>{props.dataCheckIn}
                </div >
                <div className="col-4 col-md-3  mt-lg-4">
                    <strong>check-out: </strong>{props.dataCheckOut}
                </div>
                <div className="col-4 col-md-3  mt-lg-4">
                    <strong>scadenza: </strong>{props.dataScadenza}
                </div>
                <div className=" col-12 col-lg-3 d-flex justify-content-around">
                    <button id="dichiaraOspiti" type="button" className="btn btn-primary mt-2 mr-2 disabled"style={{width: 170 + 'px'}}>Dichiarazione ospiti</button>
                    <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}} onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Visualizza"}</button>
                </div>
            </div>
            <div id="prenotazioneInAttesa" className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                <Prenotazione dataCheckIn={props.checkIn} dataCheckOut={props.checkOut} dataConferma={props.dataConferma} idPrenotazione={props.idPrenotazione} nAdulti={props.nAdulti} nBambini={props.nBambini} nEsenti={props.nEsenti} costo={props.costo} metodoPagamento={props.metodoPagamento} utente={props.refUtente}></Prenotazione>
                <div id="buttonRemove" className="btn-group d-flex justify-content-between">
                    <button type="button " className="btn btn-success mr-2" style={{maxWidth : 170+'px'}} onClick={confermaPrenotazione}>Conferma</button>
                    <button type="button " className="btn btn-danger mr-2"style={{maxWidth : 170+'px'}} onClick={rifiutaPrenotazione}>Rifiuta</button>
                </div>
            </div>
        </div>
    )
}

export default RichiesteInAttesa;