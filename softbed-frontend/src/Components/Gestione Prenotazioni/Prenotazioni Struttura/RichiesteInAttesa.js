import Prenotazione from "./Prenotazione";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";

function RichiesteInAttesa(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    useEffect(()=>{
        let listaStrutture = JSON.parse(window.sessionStorage.getItem("strutture"));
        if(!listaStrutture || !listaStrutture[props.indice] || props.indice >= listaStrutture.length){
            window.location.href="/gestioneStrutture/";
        }
    },[]);

    const mostraDialogConferma = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui">
                        <h3>Sei sicuro di voler rifiutare la prenotazione?</h3>
                        <div className="text-right">
                            <button className="btn btn-secondary px-3 py-2 m-2" onClick={onClose}>No, torna indietro</button>
                            <button className="btn btn-danger px-3 py-2 m-2" onClick={() => {
                                rifiutaPrenotazione();
                                onClose();
                            }} >
                                Sì, voglio rifiutare la prenotazione!
                            </button>
                        </div>
                    </div>
                )}
        })
    };

    function rifiutaPrenotazione(){
        axios.post(`/prenotazione/rifiutaPrenotazione`,{idPrenotazione: props.prenotazione.idPrenotazione}).then(res => {
            let emailGestore= JSON.parse(window.sessionStorage.getItem("utente")).email;
            const informazioni={
                "id":props.prenotazione.idPrenotazione,
                "struttura":props.nomeStruttura,
                "data":new Date(props.prenotazione.checkIn).toISOString().slice(0, 10),
                "emailOspite":props.prenotazione.email,
                "emailGestore":emailGestore,
            };
            axios.post('/mail/rifiuta-prenotazione',informazioni)
                .catch(err=> console.log(err));
            //aggiorno la lista delle prenotazioni
            let contatore=props.flag+1;
            props.aggiornaFlag(contatore);
        })
            .catch(err => console.log(err));
    }
    function confermaPrenotazione () {
        axios.post(`/prenotazione/confermaPrenotazione`, {idPrenotazione:props.prenotazione.idPrenotazione}).then(res => {
            let emailGestore= JSON.parse(window.sessionStorage.getItem("utente")).email;
            const informazioni={
                "id":props.prenotazione.idPrenotazione,
                "struttura":props.nomeStruttura,
                "data":new Date(props.prenotazione.checkIn).toISOString().slice(0, 10),
                "emailOspite":props.prenotazione.email,
                "emailGestore":emailGestore,
            };
            axios.post('/mail/conferma-prenotazione',informazioni).then(console.log("OK"))
                .catch(err=> console.log(err));
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
                    <button type="button " className="btn btn-danger mr-2" style={{maxWidth : 170+'px'}} onClick={mostraDialogConferma}>Rifiuta</button>
                </div>
            </div>
        </div>
    )
}

export default RichiesteInAttesa;
