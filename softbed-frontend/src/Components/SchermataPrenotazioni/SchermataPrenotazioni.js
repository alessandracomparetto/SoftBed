import React from "react";
import RichiestaPrenotazione from "./RichiestaPrenotazione";
import Prenotazione from "./Prenotazione";

function SchermataPrenotazioni() {
    const inAttesa = [
        {
            struttura: "Nome struttura 1",
            checkIn: "28-05-2020",
            checkOut: "30-05-2020",
            scadenza: {data: "25-05-2020", ora: "09:16"},
            ospiti: {adulti: 2, bambini: 1, esenti: 1},
            pagamento: "in loco",
            prezzo: "42.00"
        },
        {
            struttura: "Nome struttura 2",
            checkIn: "28-05-2020",
            checkOut: "30-05-2020",
            scadenza: {data: "25-05-2020", ora: "09:16"},
            ospiti: 3,
            esenti: 2,
            pagamento: "online",
            prezzo: "123.70"
        }
    ]

    const precedenti = [
        {
            struttura: "Nome struttura 3",
            checkIn: "03-05-2020",
            checkOut: "05-05-2020",
            conferma: {data: "29-04-2020", ora: "21:30"},
            ospiti: {adulti: 2, bambini: 1, esenti: 1},
            pagamento: "in loco",
            prezzo: "42.00"
        },
        {
            struttura: "Nome struttura 4",
            checkIn: "29-03-2020",
            checkOut: "30-04-2020",
            conferma: {data: "26-03-2020", ora: "22:29"},
            ospiti: {adulti: 2, bambini: 1, esenti: 1},
            pagamento: "in loco",
            prezzo: "42.00"
        },
        {
            struttura: "Nome struttura 5",
            checkIn: "30-08-2019",
            checkOut: "02-09-2019",
            conferma: {data: "27-08-2019", ora: "13:47"},
            ospiti: {adulti: 2, bambini: 1, esenti: 0},
            pagamento: "in loco",
            prezzo: "42.00"
        }
    ]

    return (
        <div className="container my-3">
            {/* Richieste in attesa */}
            { inAttesa[0] && (
                <div className="my-3">
                    <h3>Richieste in attesa</h3>
                    <ul className="list-group list-group-flush">

                        { inAttesa.map((richiesta, indice) => {
                            return (
                                <RichiestaPrenotazione key={indice} richiesta={richiesta} primo={indice === 0}/>
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
                                <Prenotazione key={indice} prenotazione={prenotazione} primo={indice === 0}/>
                            )
                        })}

                    </ul>
                </div>
            )}
        </div>
    )
}

export default SchermataPrenotazioni;