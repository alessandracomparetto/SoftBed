import React, {useEffect, useState} from "react";
import $ from 'jquery';

function FormRicerca(props) {
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
    const maxData =
        (dataAttuale.getFullYear() + 1) + "-" +
        (dataAttuale.getMonth() + 1).toString().padStart(2, "0") + "-" +
        dataAttuale.getDate().toString().padStart(2, "0");

    // Converte la data da oggetto Date a stringa in formato "AAAA-MM-GG"
    function convertiData (data) {
        const giorno = data.getDate().toString().padStart(2, "0");
        // +1 poiché getMonth() restituisce valori da 0 (Gennaio) a 11 (Dicembre).
        const mese = (data.getMonth() + 1).toString().padStart(2, "0");
        const anno = data.getFullYear();

        return anno + "-" + mese + "-" + giorno;
    }

    // Stato: Data minima per la data di partenza
    const [minDataP, setMinDataP] = useState(convertiData(primaDataPartenza));

    // Aggiorna il valore minimo per la data di partenza in base alla data di arrivo inserita
    const aggiornaMinDataPartenza = (event) => {
        const dataInserita = new Date(event.target.value);
        const nuovaData = new Date(dataInserita.getTime() + GIORNO);
        const nuovaDataConvertita = convertiData(nuovaData);
        setMinDataP(nuovaDataConvertita);
    }

    // Gestione della GET
    useEffect(() => {
            const currentURL = window.location.href;
            const basePath = window.location.protocol + "//" + window.location.host + "/";

            if (currentURL !== basePath) {
                fetch(currentURL)
                    .then(res => res.json())
                    .then(res => {
                        if (res.destinazione) {
                            $('#destinazione').val(res.destinazione);

                            if (props.setDestinazione) {
                                props.setDestinazione(res.destinazione);
                            }
                        }

                        if (res.arrivo)
                            $('#arrivo').val(res.arrivo);

                        if (res.partenza)
                            $('#partenza').val(res.partenza);

                        if (res.ospiti)
                            $('#ospiti').val(res.ospiti);
                    })
                    .catch(err => err);
            }

    }, []);

    return (
        <form className="form mb-3 d-flex justify-content-center bg-warning" action="/search" >
            <div className="form-row px-3 py-2 m-3 w-100 minw-15em maxw-xl">
                <div className="col-12 col-lg-4 mb-3">
                    <label htmlFor="destinazione">Destinazione</label>
                    <input name="destinazione" id="destinazione" type="text" className="form-control"
                           placeholder="Inserisci la tua destinazione..." required/>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <label htmlFor="arrivo">Arrivo</label>
                    <input name="arrivo" id="arrivo" type="date" className="form-control" min={minDataA} max={maxData}
                           defaultValue={minDataA} onChange={aggiornaMinDataPartenza} required/>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <label htmlFor="partenza">Partenza</label>
                    <input name="partenza" id="partenza" type="date" className="form-control" min={minDataP}
                           max={maxData} defaultValue={minDataP} required/>
                </div>

                <div className="col-12 col-md-2 col-lg-1 mb-3">
                    <label htmlFor="Ospiti">Ospiti</label>
                    <input name="ospiti" id="ospiti" type="number" className="form-control" min={1} max={99}
                           defaultValue={2} required/>
                </div>

                <div className="mt-auto col-md-2 col-lg-1 mb-3">
                    <button id="cerca" type="submit" className="btn btn-primary btn-block mt-3">Cerca</button>
                </div>
            </div>
        </form>
    );
}

export default FormRicerca