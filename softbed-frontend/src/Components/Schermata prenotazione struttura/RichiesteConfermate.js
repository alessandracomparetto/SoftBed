import React, {useState} from "react";
import Prenotazione from "./Prenotazione";
function RichiesteConfermate(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);
    return(
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong> check-in: </strong> {props.dataCheckIn}
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong> check-out: </strong> {props.dataCheckOut}
                </div>
                <div className="col-6 col-sm-3 col-lg-2 h-100 my-auto">
                    <strong>confermata: </strong>{props.dataConferma}
                </div>
                <div  className=" col-12 col-lg-6 d-flex justify-content-around">
                    <button id="dichiaraOspiti" type="button" className="btn btn-primary mt-2 mr-2"style={{width: 170 + 'px'}}>Dichiarazione ospiti</button>
                    <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}} onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Visualizza"}</button>
                </div>
            </div>
            <div id="prenotazioneConfermata" className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                   <Prenotazione  dataCheckIn={props.checkIn} dataCheckOut={props.checkOut} dataConferma={props.dataConferma} idPrenotazione={props.idPrenotazione} nAdulti={props.nAdulti} nBambini={props.nBambini} nEsenti={props.nEsenti} costo={props.costo} metodoPagamento={props.metodoPagamento} utente={props.refUtente}></Prenotazione>
            </div>
        </div>
    )
}


export default RichiesteConfermate;
