import {confirmAlert} from "react-confirm-alert";
import React from "react";

const mostraDialogErrore = () => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="custom-ui text-center">
                    <h1>Si è verificato un problema, ti invitiamo a riprovare!</h1>
                    <button className="btn btn-warning px-3 py-2 m-2 minw-200px" onClick={onClose}>OK</button>
                </div>
            )
        }
    })
}

export default mostraDialogErrore;