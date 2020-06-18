import React, {useEffect, useState} from "react";
import axios from "axios";

function FormRicerca() {
    /* TODO: BACKEND - OPZIONALE
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

    // La data di partenza non può superare un anno dalla data odierna
    const maxData = (dataAttuale.getFullYear() + 1) + "-" +
        (dataAttuale.getMonth() + 1).toString().padStart(2, "0") + "-" +
        dataAttuale.getDate().toString().padStart(2, "0");
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

    // Gestione delle GET per la ricerca
    const [valori, setValori] = useState({destinazione: "", arrivo: minDataA, partenza: minDataP, ospiti: 2});

    function ricercaAPI() {
        const currentURL = window.location.href;
        const basePath = window.location.protocol + "//" + window.location.host + "/";

        if (currentURL !== basePath) {
            axios.get(currentURL)
                .then(res => {
                    setValori(res.data);
                    console.log(res.data);
                })
        }
    }

    useEffect(() => {
        ricercaAPI();
    }, [])

    return (
        <form className="form d-flex justify-content-center" action="search">
            <div className="form-row p-3 m-3 w-100 minw-15em maxw-xl bg-warning rounded">
                <div className="col-12 col-lg-4 mb-3">
                    <label htmlFor="destinazione">Destinazione</label>
                    <input name="destinazione" id="destinazione" type="text" className="form-control"
                           placeholder="Inserisci la tua destinazione..." defaultValue={valori.destinazione} required/>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <label htmlFor="arrivo">Arrivo</label>
                    <input name="arrivo" id="arrivo" type="date" className="form-control" min={minDataA} max={maxData}
                           defaultValue={valori.arrivo} onChange={aggiornaMinDataPartenza} required/>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <label htmlFor="partenza">Partenza</label>
                    <input name="partenza" id="partenza" type="date" className="form-control" min={minDataP}
                           max={maxData} defaultValue={valori.partenza} required/>
                </div>

                <div className="col-12 col-md-2 col-lg-1 mb-3">
                    <label htmlFor="Ospiti">Ospiti</label>
                    <input name="ospiti" id="ospiti" type="number" className="form-control" min={1} max={99}
                           defaultValue={valori.ospiti} required/>
                </div>

                <div className="mt-auto col-md-2 col-lg-1 mb-3">
                    <button id="cerca" type="submit" className="btn btn-primary btn-block mt-3">Cerca</button>
                </div>
            </div>
        </form>
    )
}

export default FormRicerca