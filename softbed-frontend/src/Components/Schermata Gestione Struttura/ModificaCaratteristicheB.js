import React, {Fragment} from "react"
import FormCaratteristiceB from "../Registrazione Struttura/FormCaratteristiceB";

function ModificaCaratteristicheB(props){
    return(
        <form id="form" className="p-3 needs-validation"noValidate>
            <FormCaratteristiceB dati={props}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px"> Conferma </button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px">Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCaratteristicheB;