import React, { useEffect, useState } from "react";
import $ from 'jquery';
import { convertiData } from "../Actions/gestioneDate";
import { useLocation } from "react-router-dom";

function FormRicerca() {

    /* TODO: BACKEND - OPZIONALE
     * Lista delle località (regioni, province e comuni) con almeno una struttura per suggerire
     * le opzioni disponibili mentre si digita la destinazione
     */

    const oggi = new Date();
    const minDataA = convertiData(oggi, 2.5);
    const maxData = convertiData(oggi, 0, 0, 1);

    // Stato: Data minima per la data di partenza
    const [minDataP, setMinDataP] = useState(convertiData(new Date(minDataA), 1));

    // Aggiorna il valore minimo per la data di partenza in base alla data di arrivo inserita
    const aggiornaMinDataPartenza = (event) => {
        console.log(event);
        const dataInserita = new Date(event.target.value);
        const nuovaDataConvertita = convertiData(dataInserita, 1);
        console.log(nuovaDataConvertita);
        setMinDataP(nuovaDataConvertita);
    }
    
    const query = new URLSearchParams(useLocation().search);

    // Gestione dei parametri della GET
    useEffect(() => {
        const destinazione = query.get("destinazione");
        const arrivo = query.get("arrivo");
        const partenza = query.get("partenza");
        const ospiti = query.get("ospiti");

        if (destinazione)
            $("#destinazione").val(destinazione);

        if (arrivo)
            $("#arrivo").val(arrivo);

        if (partenza)
            $("#partenza").val(partenza);

        if (ospiti)
            $("#ospiti").val(ospiti);

    }, []);

    return (
        <form className="form mb-3 d-flex justify-content-center bg-warning" action="/search" >
            <div className="form-row px-2 px-sm-3 py-2 m-3 w-100 minw-15em maxw-xl">
                <div className="col-12 col-lg-4 mb-3">
                    <label htmlFor="destinazione">Destinazione</label>
                    <input name="destinazione" id="destinazione" type="text" className="form-control"
                           placeholder="Inserisci la tua destinazione..." required/>
                </div>

                <div className="col-6 col-md-4 col-lg-3 mb-3">
                    <label htmlFor="arrivo">Arrivo</label>
                    <input name="arrivo" id="arrivo" type="date" className="form-control" min={minDataA} max={maxData}
                           defaultValue={minDataA} onChange={aggiornaMinDataPartenza} required/>
                </div>

                <div className="col-6 col-md-4 col-lg-3 mb-3">
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