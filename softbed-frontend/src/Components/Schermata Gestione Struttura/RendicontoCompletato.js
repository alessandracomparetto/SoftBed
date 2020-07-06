import React from "react";
import PaginaNonTrovata from "../Pagina Non Trovata/PaginaNonTrovata";
import { useLocation} from "react-router-dom";
function RendicontoCompletato(){
    const location = useLocation();

    if (location.state && location.state.provenienza) {
        return (
            <div className="text-center p-5">
                <i aria-hidden="true" className="display-4 ml-3 fas fa-check-circle text-success"/>
                <h1>Operazione completata con successo!</h1>
                <h4>
                    Il tuo documento è stato inviato all'Ufficio del Turismo.
                </h4>
            </div>
        )
    }

    else return <PaginaNonTrovata />
}

export default RendicontoCompletato;

