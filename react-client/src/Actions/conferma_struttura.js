import {confirmAlert} from "react-confirm-alert";
import React from "react";

const mostraDialogConferma = () => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="custom-ui">
                    <h3>I dati sono stati modificati correttamente</h3>
                    <div className="text-right">
                        <button className="btn btn-success px-3 py-2 m-2" onClick={onClose}>OK</button>
                    </div>
                </div>
            )}
    })
};
export default mostraDialogConferma;