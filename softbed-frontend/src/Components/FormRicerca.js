import React, { useEffect, useState, Fragment } from "react";
import $ from 'jquery';
import { convertiData, GIORNO } from "../Actions/gestioneDate";
import { useLocation } from "react-router-dom";

function FormRicerca(props) {

    /* TODO: BACKEND - OPZIONALE
     * Lista delle località (regioni, province e comuni) con almeno una struttura per suggerire
     * le opzioni disponibili mentre si digita la destinazione
     */

    // Gestione delle date
    const oggi = new Date(convertiData(new Date())); // Restituisce la data odierna con orario 00:00:00

    const minDataA = convertiData(oggi, 2);
    const maxData = convertiData(oggi, 0, 0, 1);

    // Stato: Data minima per la data di partenza
    const [minDataP, setMinDataP] = useState(convertiData(new Date(minDataA), 1));

    // Aggiorna il valore minimo per la data di partenza in base alla data di arrivo inserita
    const aggiornaMinDataPartenza = (event) => {
        const dataInserita = new Date(event.target.value);
        const nuovaDataConvertita = convertiData(dataInserita, 1);
        setMinDataP(nuovaDataConvertita);
        controlloDate();
    }

    // Gestione della comparsa per mobile
    const [visibile, toggleVisibile] = useState(true);

    // Gestione dei parametri della GET
    const query = new URLSearchParams(useLocation().search);
    const path = useLocation().pathname;

    useEffect(() => {
        const destinazione = query.get("destinazione");
        const arrivo = query.get("arrivo");
        const partenza = query.get("partenza");
        const ospiti = query.get("ospiti");

        if (path === "/search")
            toggleVisibile(false);

        // TODO: Gestire lettura dei parametri b&b e casa vacanze
        // const bb = query.get("b&b");
        // const cv = query.get("casa vacanze");
        //
        // if (!bb || bb !== "true")
        //     $("#b\\&b").prop("checked", false);
        //
        // if (!cv || cv !== "true")
        //     $("#cv").prop("checked", false);

        if (destinazione) {
            props.setDestinazione(destinazione);
            $("#destinazione").val(destinazione);
        }

        if (arrivo)
            $("#arrivo").val(arrivo);

        if (partenza)
            $("#partenza").val(partenza);

        if (ospiti)
            $("#ospiti").val(ospiti);

    }, []);

    // Controllo destinazione
    const controlloDestinazione = () => {
        const destinazione = $("#destinazione");
        const valore = destinazione.val();

        if (!valore || valore === "") {
            destinazione.addClass("border border-danger");
        }

        else {
            destinazione.removeClass("border border-danger");
        }
    }

    // Controllo date
    const controlloDate = () => {
        const arrivo = $("#arrivo");
        const partenza = $("#partenza");
        const dateAiuto = $("#dateAiuto");
        const preavvisoAiuto = $("#preavvisoAiuto");
        const passatoAiuto = $("#passatoAiuto");

        const arr = new Date(arrivo.val());
        const par = new Date(partenza.val());

        // Differenza in ms fra la data di partenza inserita e la data attuale
        const differenza = arr.getTime() - oggi.getTime();

        // Controllo sulla data di arrivo
        if (differenza < 2 * GIORNO) {

            if (differenza < 0) {
                preavvisoAiuto.addClass("d-none");
                passatoAiuto.removeClass("d-none");
            }

            else {
                passatoAiuto.addClass("d-none");
                preavvisoAiuto.removeClass("d-none");
            }

            arrivo.addClass("border border-danger");
        }

        else {
            preavvisoAiuto.addClass("d-none");
            passatoAiuto.addClass("d-none");
            arrivo.removeClass("border border-danger");
        }

        // Controllo su data di partenza
        if (arr.getTime() >= par.getTime()) {
            dateAiuto.removeClass("d-none");
            partenza.addClass("border border-danger");
        }

        else {
            dateAiuto.addClass("d-none");
            partenza.removeClass("border border-danger");
        }
    }

    const controlloOspiti = () => {
        const ospiti = $("#ospiti");

        if (ospiti.val() < 1) {
            ospiti.addClass("border border-danger");
        }

        else {
            ospiti.removeClass("border border-danger");
        }
    }

    const controlloTipologia = () => {
        const selezionati = $("#checkboxes :checkbox:checked").length;
        const tipologiaAiuto = $("#tipologiaAiuto");
        const bb = $("#b\\&b");
        const cv = $("#cv");

        if (selezionati === 0) {
            bb.addClass("outline-error");
            cv.addClass("outline-error");
            tipologiaAiuto.removeClass("d-none");
            return true;
        }

        else {
            bb.removeClass("outline-error");
            cv.removeClass("outline-error");
            tipologiaAiuto.addClass("d-none");
            return false;
        }
    }

    const controlloForm = (event) => {
        // Se l'utente non ha modificato la destinazione essa non viene evidenziata automaticamente
        controlloDestinazione();

        // Controllo sulla selezione di almeno una delle checkbox tipologia
        if (controlloTipologia()) {
            event.preventDefault();
        }
    }

    return (
        <Fragment>
            <form id="formRicerca" className={`form d-md-flex  justify-content-center bg-warning ${visibile ? "d-flex" : "d-none"}`} action="/search" onSubmit={controlloForm}>
                <div className={`form-row px-2 px-sm-3 ${(path !== "/") ? "pt-2 pb-md-2" : "py-2"} mx-3 mt-3 mb-md-3 w-100 minw-15em maxw-xl`}>
                    <div className="col-12 col-lg-9 mb-3">
                        <label htmlFor="destinazione">Destinazione</label>
                        <input name="destinazione" id="destinazione" type="text" className="form-control"
                               placeholder="Inserisci la tua destinazione..." onChange={controlloDestinazione} required/>
                    </div>

                    <div id="checkboxes" className="col-12 col-lg-3 mb-2 mt-auto">
                        <small id="tipologiaAiuto" className="d-none text-danger">
                            Seleziona almeno una tipologia di struttura.
                        </small>

                        <div className="d-flex d-lg-block justify-content-around">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input my-0" type="checkbox" name="b&b" id="b&b"
                                       value={true} defaultChecked={true} onChange={controlloTipologia}/>
                                <label className="form-check-label" htmlFor="b&b">Bed and breakfast</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input my-0" type="checkbox" name="casa vacanze" id="cv"
                                       value={true} defaultChecked={true} onChange={controlloTipologia}/>
                                <label className="form-check-label" htmlFor="cv">Casa vacanze</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 mb-3">
                        <label htmlFor="arrivo">Arrivo</label>
                        <input name="arrivo" id="arrivo" type="date" className="form-control" min={minDataA}
                               max={maxData} defaultValue={minDataA} onChange={aggiornaMinDataPartenza} required/>

                        <small id="preavvisoAiuto" className="form-text text-danger d-none">
                            I nostri gestori devono avere a disposizione 48 ore di tempo per visionare una richiesta.
                        </small>

                        <small id="passatoAiuto" className="form-text text-danger d-none">
                            Non siamo ancora in grado di tornare al passato, ma ci stiamo lavorando.
                        </small>
                    </div>

                    <div className="col-6 col-md-4 mb-3">
                        <label htmlFor="partenza">Partenza</label>
                        <input name="partenza" id="partenza" type="date" className="form-control" min={minDataP}
                               max={maxData} defaultValue={minDataP} onChange={controlloDate} required/>

                        <small id="dateAiuto" className="form-text text-danger d-none">
                            La data di partenza deve essere posteriore alla data di arrivo.
                        </small>
                    </div>

                    <div className="col-12 col-md-2 mb-3">
                        <label htmlFor="Ospiti">Ospiti</label>
                        <input name="ospiti" id="ospiti" type="number" className="form-control" min={1} max={99}
                               defaultValue={2} onChange={controlloOspiti} required/>
                    </div>

                    <div className="col-md-2 mb-3">
                        <label className="d-none d-md-inline-block">&nbsp;</label>
                        <button id="cerca" type="submit" className="btn btn-primary btn-block">Cerca</button>
                    </div>
                </div>
            </form>
            {
                (path !== "/") && (
                    <div className={`mx-auto bg-warning text-center d-md-none`}>
                        <button type="button" className="btn btn-block" onClick={() => toggleVisibile(!visibile)}>
                            <span className={`fas fa-${visibile ? "sort-up" : "search"}`}/>
                        </button>
                    </div>
                )
            }
        </Fragment>
    );
}

export default FormRicerca