import React from "react";
import FormCondizioni from "../Registrazione Struttura/FormCondizioni";
import axios from "axios";

function ModificaCondizioni(props) {

    function modificaCondizioni(event) {
        event.preventDefault();
        try {
            document.getElementById("formCondizioni").classList.add("was-validated");
            console.log("ciao");
            if (document.getElementById("pagamentoLoco").checked || document.getElementById("pagamentoOnline").checked) {
                console.log("dentro primo if");
                document.getElementById("feedbackPagamento").classList.add("collapse");
                console.log(document.getElementById("formCondizioni"));
                if (document.getElementById("formCondizioni").checkValidity) {
                    console.log("dentro secondo if");
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
                document.getElementById("feedbackPagamento").classList.remove("collapse");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <form id="formCondizioni" className="p-3" noValidate onChange={props.handleChange}>
            <FormCondizioni dati={props.dati} correzione={props.correzione}></FormCondizioni>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={modificaCondizioni} >Conferma</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px">Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCondizioni;