import React, {useState} from "react";
import Prenotazione from "./Prenotazione";
let finestra=false;
function visualizzaPrenotazioneConfermata(e){
    if(finestra==false){
        document.getElementById("prenotazioneConfermata").classList.add("collapse");
        finestra=true;
    }
    else{
        document.getElementById("prenotazioneConfermata").classList.remove("collapse");
        finestra=false;
    }
}
function RichiesteConfermate(props){
    return(
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-4 col-md-3 mt-lg-4">
                    <strong> check-in: </strong> {props.dataCheckIn}
                </div>
                <div className="col-4 col-md-3 mt-lg-4">
                    <strong> check-out: </strong> {props.dataCheckOut}
                </div>
                <div className="col-4 col-md-3 mt-lg-4">
                    <strong>confermata il: </strong>{props.dataConferma}
                </div>
                <div  className=" col-12 col-lg-3 d-flex justify-content-around">
                    <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}}>Dichiarazione ospiti</button>
                    <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}} onClick={visualizzaPrenotazioneConfermata}>Visualizza</button>
                </div>
            </div>
            <div id="prenotazioneConfermata" className="collapse">
                   <Prenotazione  dataCheckIn={props.checkIn} dataCheckOut={props.checkOut} dataConferma={props.dataConferma} idPrenotazione={props.idPrenotazione} nAdulti={props.nAdulti} nBambini={props.nBambini} nEsenti={props.nEsenti} costo={props.costo} metodoPagamento={props.metodoPagamento} utente={props.refUtente}></Prenotazione>
            </div>
        </div>
    )
}


export default RichiesteConfermate;
