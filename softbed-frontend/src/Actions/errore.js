import {confirmAlert} from "react-confirm-alert";
import React from "react";

const mostraDialogErrore = (messaggioDiErrore) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="custom-ui text-center">
                    <h3>Si è verificato un problema, ti invitiamo a riprovare!</h3>
                    { messaggioDiErrore && <h5>{messaggioDiErrore}</h5> }
                    <button className="btn btn-warning px-3 py-2 m-2 minw-200px" onClick={onClose}>OK</button>
                </div>
            )
        }
    })
}

export default mostraDialogErrore;