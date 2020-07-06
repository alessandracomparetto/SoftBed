import React from "react";
import {Link, useLocation} from "react-router-dom";
import SchermataPaginaNonTrovata from "../Pagina Non Trovata/SchermataPaginaNonTrovata";

function SchermataOperazioneCompletata() {
    const location = useLocation();

    if (location.state && location.state.provenienza) {
        return (
            <div className="text-center p-5">
                <i aria-hidden="true" className="display-4 ml-3 fas fa-check-circle text-success"/>
                <h1>Operazione completata con successo!</h1>
                <h4>
                    La tua richiesta è stata inoltrata.
                    <br/>
                    Puoi trovare le tue richieste e le tue prenotazioni nella&nbsp;
                    <Link to={`/utente/prenotazioni`}>schermata delle prenotazioni</Link>.
                </h4>
            </div>
        )
    }

    else return <SchermataPaginaNonTrovata />
}

export default SchermataOperazioneCompletata;
