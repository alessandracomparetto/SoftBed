import React, {useEffect} from "react";
import {abilitazione} from "../../Actions/abilitazione"
import FormCondizioni from "./FormCondizioni";

function InserimentoCondizioni(props) {
     useEffect(() => {
        if (props.currentStep === 5) {
            abilitazione();
        }
    }, [props.currentStep]);

    function vaiAvanti(event) {
        event.preventDefault();
        document.getElementById("form").classList.add("was-validated");
        if (document.getElementById("pagamentoLoco").checked || document.getElementById("pagamentoOnline").checked) {
            document.getElementById("feedback").classList.add("collapse");
            if (document.getElementById("form").checkValidity()) {
                console.log(document.getElementById("form").checkValidity());
                props.go();
            }
        } else {
            document.getElementById("feedback").classList.remove("collapse");
            event.preventDefault();
        }
    }

    function vaiIndietro() {
        props.goBack();
    }

    function verificaCheckBox(event) {
        if (document.getElementById("pagamentoLoco").checked || document.getElementById("pagamentoOnline").checked) {
            document.getElementById("feedback").classList.add("collapse");
        } else {
            document.getElementById("feedback").classList.remove("collapse");
            event.preventDefault();
        }
    }

    if (props.currentStep !== 5) {
        return null;
    }
    return (
        <form id="form" className="p-3 needs-validation" noValidate onSubmit={verificaCheckBox}
              onChange={props.handleChange}>
            <FormCondizioni dati={props.dati} correzione={props.correzione}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={vaiAvanti}>Continua
                </button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={vaiIndietro}>Indietro</button>
            </div>
        </form>
    )
}

export default InserimentoCondizioni;