import React, {useEffect, useState} from "react";
import Prenotazione from "./Prenotazione";
import {Link} from "react-router-dom";
function RichiesteConfermate(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);
    /*useEffect(() => {
        console.log("Richieste confermate");
        console.log(props.prenotazione);

    }, []);*/
    return(
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-6 col-sm-4 h-100 my-auto">
                    <strong> check-in: </strong> {new Date(props.prenotazione.checkIn).toLocaleString()}
                </div>
                <div className="col-6 col-sm-4  h-100 my-auto">
                    <strong> check-out: </strong> {new Date(props.prenotazione.checkOut).toLocaleString()}
                </div>
                <div className="col-6 col-sm-4 h-100 my-auto">
                    <strong>confermata: </strong>{new Date(props.prenotazione.dataConferma).toLocaleString()}
                </div>
                <div  className="d-flex justify-content-around">
                    <Link className="text-light" to={`/ospiti/dichiarazioneOspiti/${props.indice}/${props.prenotazione.idPrenotazione}`}><button id="dichiaraOspiti" type="button" className="btn btn-primary mt-2 mr-2" style={{width: 170 + 'px'}}>Dichiarazione ospiti</button></Link>
                    <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}} onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Visualizza"}</button>
                </div>
            </div>
            <div id="prenotazioneConfermata" className={"col-12 my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                   <Prenotazione dati={props.prenotazione}/>
            </div>
        </div>
    )
}


export default RichiesteConfermate;
