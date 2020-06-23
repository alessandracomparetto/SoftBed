import React, {useState} from "react";
import RichiesteInAttesa from "./Schermata prenotazione struttura/RichiesteInAttesa";
import RichiesteConfermate from "./Schermata prenotazione struttura/RichiesteConfermate";
function SchermataPrenotazioneStruttura(){
    const [listaPrenotazioniNonConfermate, setRichiestePendenti] = useState([{idPrenotazione: "3333",
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
    }, {
        nome: "Struttura 5",
        checkIn: "28/06/2020",
        checkOut: "30/06/2020",
        costo:"10",
        nBambini:"3",
        nAdulti:"3",
        nEsenti:"1",
        confermata:"false",
        dichiarazioneOspiti:"false",
        struttura:"1",
        dataConferma:"10/06/2020",
        dataScadenza: "5/06/2020",
        metodoPagamento:"loco",
        refUtente:"1111"
    }, { nome: "Struttura 5",
        checkIn: "28/06/2020",
        checkOut: "30/06/2020",
        costo:"10",
        nBambini:"3",
        nAdulti:"3",
        nEsenti:"1",
        confermata:"false",
        dichiarazioneOspiti:"false",
        struttura:"1",
        dataConferma:"10/06/2020",
        dataScadenza: "5/06/2020",
        metodoPagamento:"loco",
        refUtente:"1111"}]);
    const [listaPrenotazioniConfermate, aggiornaPrenotazioniConfermate] = useState([
        {
            idPrenotazione: "3333",
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
        },
        {
            nome: "Struttura 100",
            checkIn: "22/06/2023",
            checkOut: "22/06/2023",
            costo:"10",
            nBambini:"3",
            nAdulti:"3",
            nEsenti:"1",
            confermata:"true",
            dichiarazioneOspiti:"false",
            struttura:"1",
            dataConferma:"22/06/1020",
            dataScadenza:"22/06/1020",
            metodoPagamento:"online",
            refUtente:"1111"
        }]);

    const rifiutaPrenotazione = (indice) => {
        // Rimuovere dalla lista in attesa
        let tmp = [...listaPrenotazioniNonConfermate];
        tmp.splice(indice, 1);
        setRichiestePendenti(tmp);
    }

    const confermaPrenotazione = (indice) => {
        // Aggiungere alla lista confermate
        let tmp = [...listaPrenotazioniConfermate];
        tmp.push(listaPrenotazioniNonConfermate[indice]);
        aggiornaPrenotazioniConfermate(tmp);

        // Rimuovere dalla lista in attesa
        tmp = [...listaPrenotazioniNonConfermate];
        tmp.splice(indice, 1);
        setRichiestePendenti(tmp);
    }


    return(
        <div className="container">
            <h4>Richieste in attesa</h4>
            <ul className="list-group list-group-flush ">
                {
                    listaPrenotazioniNonConfermate.map((prenotazioni, indice) => {
                        console.log("Lista:"+listaPrenotazioniNonConfermate);

                            return <li className="list-group-item list-group-item-warning"><RichiesteInAttesa key={indice} indiceElemento={indice} dataCheckIn={prenotazioni.checkIn} dataCheckOut={prenotazioni.checkOut} dataScadenza={prenotazioni.dataScadenza} idPrenotazione={prenotazioni.idPrenotazione} nAdulti={prenotazioni.nAdulti} nBambini={prenotazioni.nBambini} costo={prenotazioni.costo} nEsenti={prenotazioni.nEsenti} metodoPagamento={prenotazioni.metodoPagamento} rifiutaPrenotazione={rifiutaPrenotazione} confermaPrenotazione={confermaPrenotazione}/></li>
                        })

                }
            </ul>
            <h4>Richieste confermate</h4>
            <ul id="listPrenotazioneConfermate" className="list-group list-group-flush ">
                {
                    listaPrenotazioniConfermate.map((prenotazioni, indice) => {
                            return <li  className="list-group-item list-group-item-success"><RichiesteConfermate key={indice}  dataCheckIn={prenotazioni.checkIn} dataCheckOut={prenotazioni.checkOut} dataConferma={prenotazioni.dataConferma} idPrenotazione={prenotazioni.idPrenotazione} nAdulti={prenotazioni.nAdulti} nBambini={prenotazioni.nBambini} costo={prenotazioni.costo} nEsenti={prenotazioni.nEsenti} metodoPagamento={prenotazioni.metodoPagamento}/></li>
                    })
                }
            </ul>
        </div>
    )
}
export default SchermataPrenotazioneStruttura;