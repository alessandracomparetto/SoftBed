import Prenotazione from "./Prenotazione";
import React from "react";
import SchermataPrenotazioneStruttura from "../SchermataPrenotazioneStruttura";
import $ from 'jquery';
let finestra=false;
function visualizzaPrenotazioneInAttesa(e){
    if(finestra==false){
        document.getElementById("prenotazioneInAttesa").classList.add("collapse");
        finestra=true;
    }
    else{
        document.getElementById("prenotazioneInAttesa").classList.remove("collapse");
        finestra=false;
    }
}
function confermaPrenotazione(e){
    {/*TODO inviare richiesta al beckend*/}
    /*let elemento=document.getElementById("listPrenotazioneConfermate").appendChild(document.getElementById("richiesta"));
    document.getElementById("prenotazioniInAttesa").removeChild(document.getElementsByClassName("btn-group"));
    elemento.classList.add("list-group-item");
    elemento.classList.add("list-group-item-success");*/

    document.getElementById("richiesta").parentElement.remove();
}
function rifiutaPrenotazione(e){
    {/*TODO inviare richiesta al beckend*/}
    document.getElementById("richiesta").parentElement.remove();
}
function RichiesteInAttesa(props){
    return(
        <div id="richiesta" >
            <div className="row  d-flex justify-content-center">
                <div className="col-4 col-md-3  mt-lg-4">
                    <strong>check-in:</strong> {props.dataCheckIn}
                </div >
                <div className="col-4 col-md-3  mt-lg-4">
                    <strong>check-out:</strong>{props.dataCheckOut}
                </div>
                <div className="col-4 col-md-3  mt-lg-4">
                    <strong>scadenza:</strong> {props.dataScadenza}
                </div>
                <div className=" col-12 col-lg-3 btn-group d-flex justify-content-around">
                    <button type="button" className="btn btn-primary mt-2 mr-2 disabled"style={{width: 170 + 'px'}}>Dichiarazione ospiti</button>
                    <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}} onClick={visualizzaPrenotazioneInAttesa}>Visualizza</button>
                </div>
            </div>
            <div id="prenotazioneInAttesa" className="collapse">
                <Prenotazione dataCheckIn={props.checkIn} dataCheckOut={props.checkOut} dataConferma={props.dataConferma} idPrenotazione={props.idPrenotazione} nAdulti={props.nAdulti} nBambini={props.nBambini} nEsenti={props.nEsenti} costo={props.costo} metodoPagamento={props.metodoPagamento} utente={props.refUtente}></Prenotazione>
                <div className="btn-group d-flex justify-content-between">
                    <button type="button " className="btn btn-success mr-2" style={{maxWidth : 170+'px'}} onClick={confermaPrenotazione}>Conferma</button>
                    <button type="button " className="btn btn-danger mr-2"style={{maxWidth : 170+'px'}} onClick={rifiutaPrenotazione}>Rifiuta</button>
                </div>
            </div>
        </div>
    )
}

export default RichiesteInAttesa;