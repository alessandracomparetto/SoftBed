import React, {useEffect} from "react";
import FormCondizioni from "../Registrazione Struttura/FormCondizioni";

function ModificaCondizioni(props) {

    function verificaCheckBox(event) {
        if (document.getElementById("pagamentoLoco").checked || document.getElementById("pagamentoOnline").checked) {
            document.getElementById("feedback").classList.add("collapse");
        } else {
            document.getElementById("feedback").classList.remove("collapse");
            event.preventDefault();
        }
    }

    return (
        <form id="form" className="p-3 needs-validation" noValidate onSubmit={verificaCheckBox}
              onChange={props.handleChange}>
            <FormCondizioni dati={props.dati}></FormCondizioni>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" >Conferma
                </button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px">Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCondizioni;