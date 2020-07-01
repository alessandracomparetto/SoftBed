import Prenotazione from "./Prenotazione";
import React, {useState} from "react";

function RichiesteInAttesa(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);
    return(
        <div >
            <div className="row  d-flex justify-content-center">
                <div className="col-6 col-sm-4 h-100 my-auto">
                    <strong>check-in: </strong>{new Date(props.prenotazione.checkIn).toLocaleString()}
                </div >
                <div className="col-6 col-sm-4 h-100 my-auto">
                    <strong>check-out: </strong>{new Date(props.prenotazione.checkOut).toLocaleString()}
                </div>
                <div className="col-6 col-sm-4 h-100 my-auto">
                    <strong>scadenza: </strong>{new Date(props.prenotazione.dataScadenza).toLocaleString()}
                </div>
                <div className="d-flex justify-content-around">
                    <button id="dichiaraOspiti" type="button" className="btn btn-primary mt-2 mr-2 disabled" style={{width: 170 + 'px',minWidth:130+'px'}}>Dichiarazione ospiti</button>
                    <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px', minWidth:130+'px'}} onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Visualizza"}</button>
                </div>
            </div>
            <div className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                <Prenotazione dati={props.prenotazione}></Prenotazione>
                <div id="buttonRemove" className="mt-3 btn-group d-flex justify-content-between">
                    <button type="button " className="btn  btn-success mr-2" style={{maxWidth : 170+'px'}} onClick={() => props.confermaPrenotazione( props.prenotazione.idPrenotazione)}>Conferma </button>
                    <button type="button " className="btn btn-danger mr-2" style={{maxWidth : 170+'px'}} onClick={() => props.rifiutaPrenotazione( props.prenotazione.idPrenotazione)}>Rifiuta</button>
                </div>
            </div>
        </div>
    )
}

export default RichiesteInAttesa;
