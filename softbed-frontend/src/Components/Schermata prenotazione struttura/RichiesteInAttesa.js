import Prenotazione from "./Prenotazione";
import React, {useState} from "react";
import axios from "axios";

function RichiesteInAttesa(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);
    function rifiutaPrenotazione(){
        axios.post(`/prenotazione/rifiutaPrenotazione`,{idPrenotazione: props.prenotazione.idPrenotazione}).then(res => {
            console.log(res.data);
            const informazioni={
                id:props.prenotazione.idPrenotazione,
                struttura:props.prenotazione.refStruttura,
                data:props.prenotazione.checkIn,
                emailOspite:props.prenotazione.email,
                emailGestore:"mary_pal@live.it", /*TODO:modificare*/
            }
            axios.post('/mail/rifiuta-prenotazione',informazioni)
                .catch(err=> console.log(err));
            //aggiorno la lista delle prenotazioni
            let contatore=props.flag+1;
            props.aggiornaFlag(contatore);
        })
            .catch(err => console.log(err));
    }
    function confermaPrenotazione () {
        console.log("sto per inviare la conferma di prenotazione");
        axios.post(`/prenotazione/confermaPrenotazione`, {idPrenotazione:props.prenotazione.idPrenotazione}).then(res => {
            console.log(res.data);
            const informazioni={
                id:props.prenotazione.idPrenotazione,
                struttura:props.prenotazione.refStruttura,
                data:props.prenotazione.checkIn,
                emailOspite:props.prenotazione.email,
                emailGestore:"mary_pal@live.it", /*TODO:modificare*/
            }
            axios.post('/mail/conferma-prenotazione',informazioni).then(console.log("OK"))
                .catch(err=> console.log(err));
            console.log("aggiorno lo stato");

            let contatore=props.flag+1;
            props.aggiornaFlag(contatore);
        })
            .catch(err => console.log(err));
    }
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
                    <button type="button " className="btn  btn-success mr-2" style={{maxWidth : 170+'px'}} onClick={confermaPrenotazione}>Conferma </button>
                    <button type="button " className="btn btn-danger mr-2" style={{maxWidth : 170+'px'}} onClick={rifiutaPrenotazione}>Rifiuta</button>
                </div>
            </div>
        </div>
    )
}

export default RichiesteInAttesa;
