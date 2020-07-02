import React from "react";
import FormCondizioni from "../Registrazione Struttura/FormCondizioni";
import axios from "axios";
import mostraDialogErrore from "../../Actions/errore";

function ModificaCondizioni(props) {

    function modificaCondizioni(event) {
        event.preventDefault();
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
                                let contatore=props.flag+1;
                                //aggiorno lo stato flag presente nella Schermata Gestione Struttura
                                props.setFlag(contatore);
                            }
                        }).catch(() => console.log("Nesssuna riga modificata"))
                }
            }
            else{
                document.getElementById("feedbackPagamento").classList.remove("collapse");
            }
        } catch (e) {
            mostraDialogErrore();
        }
    }

    return (
        <form id="formCondizioni" className="p-3" noValidate onChange={props.handleChange}>
            <FormCondizioni dati={props.dati} correzione={props.correzione} handleChange={props.handleChange}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={modificaCondizioni} >Conferma</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px">Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCondizioni;