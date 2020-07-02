import React, {useEffect} from "react";
import FormCondizioni from "../Registrazione Struttura/FormCondizioni";
import axios from "axios";

function ModificaCondizioni(props) {
    let copia=props.dati;

    function printObject(o) {
        let out = '';
        for (let p in o) {
            out += p + ': ' + o[p] + '\n';
        } console.log(out);
    }

   useEffect(()=>{

        /*/!*copia["minSoggiorno"]=props.dati.minSoggiorno;
        copia["maxSoggiorno"]=props.dati.maxSoggiorno;
        copia["anticipoPrenotazioneMin"]=props.dati.anticipoPrenotazioneMin;
        copia["anticipoPrenotazioneMax"]=props.dati.anticipoPrenotazioneMax;
        copia["oraInizioCheckIn"]=props.dati.oraInizioCheckIn;
        copia["oraFineCheckIn"]=props.dati.oraFineCheckIn;
        copia["oraInizioCheckOut"]=props.dati.oraInizioCheckOut;
        copia["oraFineCheckOut"]=props.dati.oraFineCheckOut;
        copia["pagamentoLoco"]=props.dati.pagamentoLoco;
        copia["pagamentoOnline"]=props.dati.pagamentoOnline;
        copia["politicaCancellazione"]=props.dati.politicaCancellazione;
        copia["penaleCancellazione"]=props.dati.penaleCancellazione;
        copia["preavvisoDisdetta"]=props.dati.preavvisoDisdetta;
        copia["prezzoAdulti"]=props.dati.prezzoAdulti;
        copia["prezzoBambini"]=props.dati.prezzoBambini;*!/*/
        printObject(copia);
    }, [props.struttura]);

    function modificaCondizioni(event) {
        event.preventDefault();
        copia={};
        try {
            document.getElementById("formCondizioni").classList.add("was-validated");
            if (document.getElementById("pagamentoLoco").checked || document.getElementById("pagamentoOnline").checked) {
                document.getElementById("feedbackPagamento").classList.add("collapse");
                if (document.getElementById("formCondizioni").checkValidity()) {
                    let dato = props.dati;
                    dato["idStruttura"]=props.idStruttura;
                    console.log("Inizio della richiesta");
                    axios.post('/struttura/modificaCondizioni', dato)
                        .then(res => { // then print response status
                            if (res.status === 200) {
                                console.log("OK");
                            }
                        }).catch(() => console.log("Nesssuna riga modificata"))
                }
            }
            else{
                document.getElementById("feedbackPagamento").classList.remove("collapse");
            }
        } catch (e) {
            console.log(e);
        }
    }

    function ripristinaCondizioni(e) {
        e.preventDefault();
        console.log("annullo!")
        props.setStruttura(copia);
    }

    return (
        <form id="formCondizioni" className="p-3" noValidate onChange={props.handleChange}>
            <FormCondizioni dati={props.dati} correzione={props.correzione} handleChange={props.handleChange}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={modificaCondizioni} >Conferma</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={ripristinaCondizioni}>Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCondizioni;