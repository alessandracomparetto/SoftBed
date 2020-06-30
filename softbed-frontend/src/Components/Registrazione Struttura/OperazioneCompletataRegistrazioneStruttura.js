import React, {useState} from "react";
import {useHistory} from "react-router-dom"

function OperazioneCompletataRegistrazioneStruttura(props) {
    const history = useHistory();
    const [contatore, setContatore] = useState(5)

    setTimeout(function(){
        history.push("/gestioneStrutture");
    }, 10000);

    setTimeout(()=>{
        let n = contatore-1;
        setContatore(n)
    }, 1000);

    if (props.currentStep !== 8){
        return null;
    }
    else return (
        <div className="text-center p-5">
            <i aria-hidden="true" className="display-4 ml-3 fas fa-check-circle text-success"/>
            <h1>Operazione completata con successo!</h1>
            <h4>
                La tua struttura è stata registrata correttamente!
                <br/>
                Verrai reindirizzato alla pagina delle tue strutture in {contatore} secondi
            </h4>

        </div>
    )
}

export default OperazioneCompletataRegistrazioneStruttura;