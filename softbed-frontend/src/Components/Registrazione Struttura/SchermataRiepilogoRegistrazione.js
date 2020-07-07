import React from "react";

import InformazioniStruttura from "./InformazioniStruttura";

function SchermataRiepilogoRegistrazione(props) {

    function conferma() {
        props.handleSubmit();
    }

    function  vaiIndietro() {
        props.goBack();
    }

    if (props.currentStep !== 8){
        return null;
    }
    else return (
        <div>
            <InformazioniStruttura struttura={props.struttura}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" className="btn btn-primary mt-3 w-200px" onClick={conferma}>Continua</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={vaiIndietro}>Indietro</button>
            </div>
        </div>
    )
}

export default SchermataRiepilogoRegistrazione;

