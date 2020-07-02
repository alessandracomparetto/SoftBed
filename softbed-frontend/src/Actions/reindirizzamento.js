import React from "react";
import {confirmAlert} from "react-confirm-alert";


const reindirizza = (history, url, tempo, messaggio) => {

    setTimeout(() => {
        history.push(url);
        try {
            document.getElementById("react-confirm-alert-firm-svg").remove();
            document.getElementById("react-confirm-alert").remove();
            document.body.classList.remove("react-confirm-alert-body-element");
        } catch (err) {}
    }, tempo);

    confirmAlert({
        customUI: () => {
            return (
                <div className="custom-ui text-center">
                    <h3>
                        {messaggio ? messaggio : "Si è verificato un problema con l'URL inserito."}
                        <br/>
                        Stai per essere reindirizzato.
                    </h3>

                </div>
            )
        }
    })
}


export default reindirizza;
