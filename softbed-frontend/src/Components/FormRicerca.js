import React, { useState } from "react";

function FormRicerca() {
    /* TODO: BACKEND
     * Gestione props nel caso di richiesta GET
     */


    /* TODO: BACKEND
     * Lista delle località (regioni, province e comuni) con almeno una struttura per suggerire
     * le opzioni disponibili mentre si digita la destinazione
     */

    const GIORNO = 86400000;
    const dataAttuale = new Date();

    // Il gestore deve avere almeno 48 ore per confermare o rifiutare la richiesta per cui la prima data disponibile
    // sarà 2 giorni dopo la data in cui viene effettuata la ricerca (3 se dopo le 12:00)
    const primaDataArrivo = new Date(dataAttuale.getTime() + 2.5 * GIORNO);
    const minDataA = convertiData(primaDataArrivo);

    // Il soggiorno deve durare almeno 1 giorno
    const primaDataPartenza = new Date(primaDataArrivo.getTime() + GIORNO);

    // Si assume che la data massima inseribile sia il 31 Dicembre dell'anno successivo (un po' eccessiva)
    const maxData = (dataAttuale.getFullYear() + 1) + "-12-31"

    const [minDataP, setMinDataP] = useState(convertiData(primaDataPartenza));

    // Converte la data da oggetto Date a stringa in formato "AAAA-MM-GG"
    function convertiData (data) {
        const giorno = data.getDate().toString().padStart(2, "0");
        // +1 poiché getMonth() restituisce valori da 0 (Gennaio) a 11 (Dicembre).
        const mese = (data.getMonth() + 1).toString().padStart(2, "0");
        const anno = data.getFullYear();

        return anno + "-" + mese + "-" + giorno;
    }

    // Aggiorna il valore minimo per la data di partenza in base alla data di arrivo inserita
    const aggiornaMinDataPartenza = (event) => {
        const dataInserita = new Date(event.target.value);
        const nuovaData = new Date(dataInserita.getTime() + GIORNO);
        console.log(nuovaData);
        const nuovaDataConvertita = convertiData(nuovaData);
        console.log(nuovaDataConvertita);
        setMinDataP(nuovaDataConvertita);
    }

    return (
        <form className="form pt-3 pl-5 pr-5 d-flex justify-content-center">
            <div className="form-row maxw-lg">
                <div className="col-12 col-lg-4 mb-3">
                    <label htmlFor="destinazione">Destinazione</label>
                    <input name="destinazione" id="destinazione" type="text" className="form-control" placeholder="Inserisci la tua destinazione..." required/>
                </div>

                <div className="col-12 col-sm-6 col-md-3 mb-3 maxw-lg-12em">
                    <label htmlFor="arrivo">Arrivo</label>
                    <input name="arrivo" id="arrivo" type="date" className="form-control" min={minDataA} max={maxData} defaultValue={minDataA} onChange={aggiornaMinDataPartenza} required/>
                </div>

                <div className="col-12 col-sm-6 col-md-3 mb-3 maxw-lg-12em">
                    <label htmlFor="partenza">Partenza</label>
                    <input name="partenza" id="partenza" type="date" className="form-control" min={minDataP} max={maxData} defaultValue={minDataP} required/>
                </div>

                <div className="col-12 col-md-3 col-lg-1 mb-3 minw-6em">
                    <label htmlFor="Ospiti">Ospiti</label>
                    <input name="ospiti" id="ospiti" type="number" className="form-control" min={1} max={99} defaultValue={2} required/>
                </div>

                <div className="mt-auto col-md-3 col-lg-1 mb-3 minw-6em">
                    <button id="cerca" type="submit" className="btn btn-primary btn-block">Cerca</button>
                </div>
            </div>
        </form>
    )
}

export default FormRicerca