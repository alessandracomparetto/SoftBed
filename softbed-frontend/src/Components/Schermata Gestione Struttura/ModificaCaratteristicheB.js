import React, {Fragment} from "react"
import FormCaratteristicheB from "../Registrazione Struttura/FormCaratteristicheB";

function ModificaCaratteristicheB(props){

    function printObject(o) {
        let out = '';
        for (let p in o) {
            out += p + ': ' + o[p] + '\n';
        } console.log("Dati"+out);
    }

    return(
        <form id="form" className="p-3 needs-validation"noValidate>
            <FormCaratteristicheB dati={props.props}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px"> Conferma </button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px">Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCaratteristicheB;