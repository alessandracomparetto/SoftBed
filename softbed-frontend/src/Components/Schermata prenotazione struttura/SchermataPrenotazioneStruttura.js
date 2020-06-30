import React, {useState} from "react";
import RichiesteInAttesa from "./RichiesteInAttesa";
import RichiesteConfermate from "./RichiesteConfermate";
function SchermataPrenotazioneStruttura(){
const [prenotazioniNonConfermate, aggiornaPrenotazioniNonConfermate] = useState([{idPrenotazione: "3333",
        nome: "Struttura 1",
        tipologia: "B&B",
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
        refUtente:"1111",
        camere:[{tipologia: "singola", nCamerePerTipologia:1},{tipologia: "doppia", nCamerePerTipologia:2}]
    }, {
        nome: "Struttura 5",
        tipologia: "B&B",
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
        refUtente:"1111",
        camere:[{tipologia: "doppia", nCamerePerTipologia:1}]
    }, { nome: "Struttura 5",
        tipologia: "cv",
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
        refUtente:"1111",
        camere:null}]);
    const [prenotazioniConfermate, aggiornaPrenotazioniConfermate] = useState([
        {
            idPrenotazione: "3333",
            nome: "Struttura 1",
            tipologia:"B&B",
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
            refUtente:"1111",
            camere:[{tipologia: "singola", nCamerePerTipologia:1}, {tipologia: "doppia", nCamerePerTipologia:1}, {tipologia: "tripla", nCamerePerTipologia:1}, {tipologia: "quadrupla", nCamerePerTipologia:1}]
        },
        {
            nome: "Struttura 100",
            tipologia: "cv",
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
            refUtente:"1111",
            camere: null
        }]);

    const rifiutaPrenotazione = (indice) => {
        // Rimuovere dalla lista in attesa
        let tmp = [...prenotazioniNonConfermate];
        tmp.splice(indice, 1);
        aggiornaPrenotazioniNonConfermate(tmp);
    }

    const confermaPrenotazione = (indice) => {
        // Aggiungere alla lista confermate
        let tmp = [...prenotazioniConfermate];
        tmp.push(prenotazioniNonConfermate[indice]);
        aggiornaPrenotazioniConfermate(tmp);

        // Rimuovere dalla lista in attesa
        tmp = [...prenotazioniNonConfermate];
        tmp.splice(indice, 1);
        aggiornaPrenotazioniNonConfermate(tmp);
    }


    return(
        <div className="container">
            <h4>Richieste in attesa</h4>
            <ul className="list-group list-group-flush ">
                {
                    prenotazioniNonConfermate.map((prenotazioni, indice) => {

                        return <li className="list-group-item list-group-item-warning"><RichiesteInAttesa key={indice} tipologia={prenotazioni.tipologia} indiceElemento={indice} dataCheckIn={prenotazioni.checkIn} dataCheckOut={prenotazioni.checkOut} dataScadenza={prenotazioni.dataScadenza} idPrenotazione={prenotazioni.idPrenotazione} nAdulti={prenotazioni.nAdulti} nBambini={prenotazioni.nBambini} costo={prenotazioni.costo} nEsenti={prenotazioni.nEsenti} metodoPagamento={prenotazioni.metodoPagamento} camere={prenotazioni.camere} rifiutaPrenotazione={rifiutaPrenotazione} confermaPrenotazione={confermaPrenotazione}/></li>
                    })

                }
            </ul>
            <h4>Richieste confermate</h4>
            <ul className="list-group list-group-flush ">
                {
                    prenotazioniConfermate.map((prenotazioni, indice) => {
                        return <li  className="list-group-item list-group-item-success"><RichiesteConfermate key={indice} tipologia={prenotazioni.tipologia}  dataCheckIn={prenotazioni.checkIn} dataCheckOut={prenotazioni.checkOut} dataConferma={prenotazioni.dataConferma} idPrenotazione={prenotazioni.idPrenotazione} nAdulti={prenotazioni.nAdulti} nBambini={prenotazioni.nBambini} costo={prenotazioni.costo} nEsenti={prenotazioni.nEsenti} metodoPagamento={prenotazioni.metodoPagamento} camere={prenotazioni.camere}/></li>
                    })
                }
            </ul>
        </div>
    )
}
export default SchermataPrenotazioneStruttura;