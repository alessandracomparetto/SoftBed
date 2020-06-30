import React, {useEffect} from "react";
import FormCondizioni from "../Registrazione Struttura/FormCondizioni";
import axios from "axios";

function ModificaCondizioni(props) {

    function modificaCondizioni(event) {
        event.preventDefault();
        try {
            document.getElementById("form").classList.add("was-validated");
            if (document.getElementById("pagamentoLoco").checked || document.getElementById("pagamentoOnline").checked) {
                document.getElementById("feedback").classList.add("collapse");
                if (document.getElementById("form").checkValidity()) {
                    let dato = props.dati;
                    console.log("DATI======= ");
                    console.log(dato);
                    axios.post('/struttura/modificaCondizioni', dato)
                        .then(res => { // then print response status
                            if (res.status === 200) {
                                console.log(res.data);
                                console.log("OK");
                            }
                        }).catch(() => console.log("Nesssuna riga modificata"))
                }
            }
            else{
                document.getElementById("feedback").classList.remove("collapse");
            }

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <form id="form" className="p-3 needs-validation" noValidate onChange={props.handleChange}>
            <FormCondizioni dati={props.dati} correzione={props.correzione}></FormCondizioni>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" className="btn btn-primary mt-3 w-200px" onClick={modificaCondizioni} >Conferma</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px">Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCondizioni;