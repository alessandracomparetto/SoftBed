import React from "react";
import FormCaratteristicheC from "../Registrazione Struttura/FormCaratteristicheC";
function ModificaCaratteristicheC(props){

    return(
        <form id="form" className="p-3 needs-validation" onChange={props.handleChange} noValidate>
            <FormCaratteristicheC dati={props}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" >Conferma</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" >Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCaratteristicheC;