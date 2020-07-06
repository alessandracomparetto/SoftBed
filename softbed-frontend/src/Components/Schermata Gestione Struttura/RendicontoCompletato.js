import React from "react";
import PaginaNonTrovata from "../Pagina Non Trovata/PaginaNonTrovata";
import { useLocation, useHistory} from "react-router-dom";
function RendicontoCompletato(){
    const location = useLocation();
    const history = useHistory();

    if (location.state && location.state.provenienza) {
        setTimeout(function(){
            history.push("/gestioneStrutture");
        }, 5000);

        return (

            <div className="text-center p-5">
                <i aria-hidden="true" className="display-4 ml-3 fas fa-check-circle text-success"/>
                <h1>Operazione completata con successo!</h1>
                <h2>
                    Il tuo documento è stato inviato all'Ufficio del Turismo.
                </h2>
                <h4>
                    Verrai reindirizzato alla pagina delle tue strutture in 5 secondi
                </h4>
            </div>
        )
    }

    else return <PaginaNonTrovata />
}

export default RendicontoCompletato;

