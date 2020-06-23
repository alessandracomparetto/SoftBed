import React, {useState} from "react";
import Prenotazione from "./Prenotazione";
function RichiesteConfermate(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);
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
                    {/* <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}}>Dichiarazione ospiti</button>
                    <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}} onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Visualizza"}</button> */}
                    <div className=" col-12 col-lg-3 d-flex justify-content-around">
                        <button id="dichiaraOspiti" type="button" className="btn btn-primary mt-2 mr-2"style={{width: 170 + 'px'}}>Dichiarazione ospiti</button>
                        <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}} onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Visualizza"}</button>
                    </div>
                </div>
            </div>
            <div id="prenotazioneConfermata" className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                   <Prenotazione  dataCheckIn={props.checkIn} dataCheckOut={props.checkOut} dataConferma={props.dataConferma} idPrenotazione={props.idPrenotazione} nAdulti={props.nAdulti} nBambini={props.nBambini} nEsenti={props.nEsenti} costo={props.costo} metodoPagamento={props.metodoPagamento} utente={props.refUtente}></Prenotazione>
            </div>
        </div>
    )
}


export default RichiesteConfermate;
