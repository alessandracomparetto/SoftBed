import React from "react";

function SchermataOperazioneCompletata() {
    return (
        <div className="text-center p-5">
            <i aria-hidden="true" className="display-4 ml-3 fas fa-check-circle text-success"/>
            <h1>Operazione completata con successo!</h1>
            {/* TODO: Inserire il link */}
            <h4>
                La tua richiesta è stata inoltrata.
                <br/>
                Puoi trovare le tue richieste e le tue prenotazioni nella&nbsp;
                <a href="#">schermata delle prenotazioni</a>.
            </h4>
        </div>
    )
}

export default SchermataOperazioneCompletata;