import React from "react";

function FormRicerca() {
    /* TODO:
     * dovremmo ottenere una lista delle località (regioni, province e comuni) con almeno una struttura per suggerire
     * le opzioni disponibili mentre si digita la destinazione
     */

    /* TODO: bisogna gestire le date */
    // Data di arrivo minima: almeno x giorni dopo la data attuale
    // Data di partenza minima: almeno y giorni dopo la data di arrivo selezionata
    const domani = "2020-06-18"
    const dopodomani = "2020-06-19"
    const maxData = "2021-12-31"

    return (
        <form className="form pt-3 pl-5 pr-5 d-flex justify-content-center">
            <div className="form-row maxw-lg">
                <div className="col-12 col-lg-3 mb-3">
                    <label htmlFor="destinazione">Destinazione</label>
                    {/* TODO: opterei per una select con input */}
                    <input name="destinazione" id="destinazione" type="text" className="form-control" required/>
                </div>

                <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <label htmlFor="arrivo">Arrivo</label>
                    <input name="arrivo" id="arrivo" type="date" className="form-control" min={domani} max={maxData} value={domani} required/>
                </div>

                <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <label htmlFor="partenza">Partenza</label>
                    <input name="partenza" id="partenza" type="date" className="form-control" min={dopodomani} max={maxData} value={dopodomani} required/>
                </div>

                <div className="col-md-3 col-lg-2 mb-3">
                    <label htmlFor="Ospiti">Ospiti</label>
                    <input name="ospiti" id="ospiti" type="number" className="form-control" min={1} max={99} value={2} required/>
                </div>

                <div className="mt-auto col-md-3 col-lg-1 mb-3">
                    <button id="cerca" type="submit" className="btn btn-primary btn-block">Cerca</button>
                </div>
            </div>
        </form>
    )
}

export default FormRicerca