import React from "react";
import FormCaratteristiceB from "./FormCaratteristiceB";
function InserimentoCaratteristicheB(props){
    function vaiAvanti(event) {
        event.preventDefault();
        document.getElementById("form").classList.add("was-validated");
        if (document.getElementById("form").checkValidity()) {
            props.go();
        }
    }
    function  vaiIndietro() {
        props.goBack();
    }
    if(props.currentStep !== 4){
        return null;
    }
    return(
        <form id="form" className="p-3 needs-validation" onChange={props.handleChange} noValidate>
            <FormCaratteristiceB dati={props.dati}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={vaiAvanti}>Continua</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={vaiIndietro}>Indietro</button>
            </div>
        </form>
    )
}

export default InserimentoCaratteristicheB;