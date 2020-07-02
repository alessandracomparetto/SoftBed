import React, {useEffect, useState} from "react";
import RichiesteInAttesa from "./RichiesteInAttesa";
import RichiesteConfermate from "./RichiesteConfermate";

import axios from "axios";
function SchermataPrenotazioneStruttura(props){
    const [prenotazioni, aggiornaPrenotazioni]=useState([]);
    const  [flag, aggiornaFlag]=useState(0); //utilizzo dello stato per indicare quando aggiornare la lista della prenotazioni

     useEffect(() => {
        let data = {"idStruttura":props.idStruttura, "tipologiaStruttura":props.tipologiaStruttura};
        console.log(data);
        axios.post(`/prenotazione/listaPrenotazioni`, data).then(res => {
            console.log("prenotazioni", res.data);
            aggiornaPrenotazioni(res.data);
        })
        .catch(err => console.log(err));
    }, [flag, props.tipologiaStruttura]);

    return(
        <div className="container">
            <h4>Richieste in attesa</h4>
            <ul className="list-group list-group-flush ">
                {
                    prenotazioni.map((prenotazione, indice) => {
                            if (prenotazione.confermata === 0) {
                                return (<li key={indice} className="list-group-item list-group-item-warning">
                                    <RichiesteInAttesa key={indice}  indiceElemento={indice} prenotazione={prenotazione} flag={flag} aggiornaFlag={aggiornaFlag}/></li>)
                            }
                    })
                }
            </ul>
            <h4>Richieste confermate</h4>
            <ul className="list-group list-group-flush ">
                {
                    prenotazioni.map((prenotazione, indice) => {
                        if (prenotazione.confermata === 1) {
                            return (<li key={indice} className="list-group-item list-group-item-warning">
                                <RichiesteConfermate key={indice}  indiceElemento={indice} prenotazione={prenotazione}/></li>)
                        }
                    })
                }
            </ul>
        </div>
    )
}
export default SchermataPrenotazioneStruttura;