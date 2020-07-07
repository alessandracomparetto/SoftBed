import React from "react";
import PaginaNonTrovata from "../Pagina Non Trovata/PaginaNonTrovata";
import { useLocation, useHistory, useParams} from "react-router-dom";

function DichiarazioneCompletata(){
    const location = useLocation();
    const history = useHistory();
    const {indice} = useParams();
    console.log(indice);
    if (location.state && location.state.provenienza) {
        setTimeout(function(){
            history.push(`/struttura/gestioneStruttura/${indice}/prenotazioni`);
        }, 5000);

        return (
            <div className="text-center p-5">
                <i aria-hidden="true" className="display-4 ml-3 fas fa-check-circle text-success"/>
                <h1>Operazione completata con successo!</h1>
                <h2>
                    Il tuo documento è stato inviato alla Questura
                </h2>
                <h4>
                    Verrai reindirizzato alla pagina delle tue prenotazioni in 5 secondi
                </h4>
            </div>
        )
    }
    else return <PaginaNonTrovata />
}

export default DichiarazioneCompletata;

