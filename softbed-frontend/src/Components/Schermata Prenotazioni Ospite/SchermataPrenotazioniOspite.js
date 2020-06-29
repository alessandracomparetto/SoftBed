import React, {useState} from "react";
import RichiestaPrenotazioneOspite from "./RichiestaPrenotazioneOspite";
import PrenotazioneOspite from "./PrenotazioneOspite";

function SchermataPrenotazioniOspite() {

    // TODO: da rimuovere
    const [inAttesa, setInAttesa] = useState([
        {
            id: 75,
            struttura: {
                nome: "Nome struttura 1",
                tipologia: "b&b",
                camere: [
                    {tipologia: "Singola", numero: 0},
                    {tipologia: "Doppia", numero: 2},
                    {tipologia: "Tripla", numero: 1},
                    {tipologia: "Quadrupla", numero: 1},
                ]
            },
            checkIn: "28-05-2020",
            checkOut: "30-05-2020",
            scadenza: {data: "25-05-2020", ora: "09:16"},
            ospiti: {adulti: 2, bambini: 1, esenti: 1},
            pagamento: "in loco",
            prezzo: "42.00",
        },
        {
            id: 2,
            struttura: {
                nome: "Nome struttura 2",
                tipologia: "casa vacanze"
            },
            checkIn: "28-05-2020",
            checkOut: "30-05-2020",
            scadenza: {data: "25-05-2020", ora: "09:16"},
            ospiti: {adulti: 3, bambini: 0, esenti: 2},
            pagamento: "online",
            prezzo: "123.70"
        }
    ]);
    const [precedenti, setPrecedenti] = useState([
        {
            id: 3,
            struttura: {
                nome: "Nome struttura 3",
                tipologia: "casa vacanze"
            },
            checkIn: "03-05-2020",
            checkOut: "05-05-2020",
            conferma: {data: "29-04-2020", ora: "21:30"},
            ospiti: {adulti: 2, bambini: 1, esenti: 1},
            pagamento: "in loco",
            prezzo: "42.00"
        },
        {
            id: 4,
            struttura: {
                nome: "Nome struttura 4",
                tipologia: "casa vacanze"
            },
            checkIn: "29-03-2020",
            checkOut: "30-04-2020",
            conferma: {data: "26-03-2020", ora: "22:29"},
            ospiti: {adulti: 2, bambini: 1, esenti: 1},
            pagamento: "in loco",
            prezzo: "42.00"
        },
        {
            id: 5,
            struttura: {
                nome: "Nome struttura 5",
                tipologia: "b&b",
                camere: [
                    {tipologia: "Singola", numero: 0},
                    {tipologia: "Doppia", numero: 2},
                    {tipologia: "Tripla", numero: 1},
                    {tipologia: "Quadrupla", numero: 1},
                ]
            },
            checkIn: "30-08-2019",
            checkOut: "02-09-2019",
            conferma: {data: "27-08-2019", ora: "13:47"},
            ospiti: {adulti: 2, bambini: 1, esenti: 0},
            pagamento: "in loco",
            prezzo: "42.00"
        }
    ]);

    const rimuoviPrenotazione = (id) => {
        let tmp = [...inAttesa];
        const index = tmp.map((richiesta) => { return richiesta.id }).indexOf(id);
        tmp.splice(index, 1);
        setInAttesa(tmp);
    }

    return (
        <div className="container my-3">
            {/* Richieste in attesa */}
            { inAttesa[0] && (
                <div className="my-3">
                    <h3>Richieste in attesa</h3>
                    <ul className="list-group list-group-flush">

                        { inAttesa.map((richiesta, indice) => {
                            return (
                                <RichiestaPrenotazioneOspite key={indice} prenotazione={richiesta} primo={indice === 0} rimuovi={rimuoviPrenotazione}/>
                            )
                        })}

                    </ul>
                </div>
            )}

            {/* Prenotazioni precedenti */}
            { precedenti[0] && (
                <div className="my-3">
                    <h3>Prenotazioni precedenti</h3>
                    <ul className="list-group list-group-flush">

                        { precedenti.map((prenotazione, indice) => {
                            return (
                                // TODO: Aggiungere annulla prenotazione per prenotazioni confermate (non passate)
                                <PrenotazioneOspite key={indice} prenotazione={prenotazione} primo={indice === 0}/>
                            )
                        })}

                    </ul>
                </div>
            )}
        </div>
    )
}

export default SchermataPrenotazioniOspite;