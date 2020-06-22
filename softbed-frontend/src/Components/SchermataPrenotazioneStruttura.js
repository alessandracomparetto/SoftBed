import React, {useState} from "react";
import RichiesteInAttesa from "./Schermata prenotazione struttura/RichiesteInAttesa";
import RichiesteConfermate from "./Schermata prenotazione struttura/RichiesteConfermate";
function SchermataPrenotazioneStruttura(){
    const [listaPrenotazioni] = useState([
        {idPrenotazione: "3333",
            nome: "Struttura 1",
            checkIn: "22/06/2020",
            checkOut: "22/06/2020",
            costo:"10",
            nBambini:"3",
            nAdulti:"3",
            nEsenti:"1",
            confermata:"false",
            dichiarazioneOspiti:"false",
            struttura:"1",
            dataConferma:"22/06/2020",
            dataScadenza: "22/06/2020",
            metodoPagamento:"loco",
            refUtente:"1111"
        },
        {idPrenotazione: "3333",
            nome: "Struttura 1",
            checkIn: "22/06/2020",
            checkOut: "22/06/2020",
            costo:"10",
            nBambini:"3",
            nAdulti:"3",
            nEsenti:"1",
            confermata:"true",
            dichiarazioneOspiti:"false",
            struttura:"1",
            dataConferma:"22/06/2020",
            dataScadenza:"22/06/2020",
            metodoPagamento:"online",
            refUtente:"1111"
        }
    ])
    return(
        <div className="container">
            <h4>Richieste in attesa</h4>
            <ul className="list-group list-group-flush ">
                {
                    listaPrenotazioni.map((prenotazioni, indice) => {
                        if(prenotazioni.confermata =="false" ){
                            return <li className="list-group-item list-group-item-warning"><RichiesteInAttesa key={indice} dataCheckIn={prenotazioni.checkIn} dataCheckOut={prenotazioni.checkOut} dataScadenza={prenotazioni.dataScadenza} idPrenotazione={prenotazioni.idPrenotazione} nAdulti={prenotazioni.nAdulti} nBambini={prenotazioni.nBambini} costo={prenotazioni.costo} nEsenti={prenotazioni.nEsenti} metodoPagamento={prenotazioni.metodoPagamento}/></li>
                        }
                    })
                }
            </ul>
            <h4>Richieste confermate</h4>
            <ul id="listPrenotazioneConfermate"className="list-group list-group-flush ">
                {
                    listaPrenotazioni.map((prenotazioni, indice) => {
                        if(prenotazioni.confermata =="true" ){
                            return <li  className="list-group-item list-group-item-success"><RichiesteConfermate key={indice} dataCheckIn={prenotazioni.checkIn} dataCheckOut={prenotazioni.checkOut} dataConferma={prenotazioni.dataConferma} idPrenotazione={prenotazioni.idPrenotazione} nAdulti={prenotazioni.nAdulti} nBambini={prenotazioni.nBambini} costo={prenotazioni.costo} nEsenti={prenotazioni.nEsenti} metodoPagamento={prenotazioni.metodoPagamento} /></li>
                        }
                    })
                }
            </ul>
        </div>
    )
}
export default SchermataPrenotazioneStruttura;