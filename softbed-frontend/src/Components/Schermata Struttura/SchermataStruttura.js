import React, { useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";

import Breadcrumb from "../Breadcrumb";
import Servizio from "../Schermata Risultati/Servizio";
import Mappa from "../Schermata Risultati/Mappa";
import ImmaginiStruttura from "./ImmaginiStruttura";
import { convertiData } from "../../Actions/gestioneDate";


function SchermataStruttura(props) {
    let { id } = useParams();

    // Gestione delle date
    const oggi = new Date();
    const minDataA = convertiData(oggi, 2);
    const maxData = convertiData(oggi, 0, 0, 1);

    const [numeroAdulti, setNumeroAdulti] = useState(props.ospiti || 2);
    const [minDataP, setMinDataP] = useState(convertiData(new Date(minDataA), 1));

    // Aggiorna il valore minimo per la data di partenza in base alla data di arrivo inserita
    const aggiornaMinDataPartenza = (event) => {
        const dataInserita = new Date(event.target.value);
        const nuovaDataConvertita = convertiData(dataInserita, 1);
        setMinDataP(nuovaDataConvertita);
        controlloDate();
    }

    $(document).ready(() => {
        // Gestione stato numeroAdulti
        const adulti = $('#adulti');

        adulti.on('change', () => {
            setNumeroAdulti(adulti.val());
        })
    });


    const controlloForm = (event) => {
        if (props.struttura.tipologia && props.struttura.tipologia === "b&b") {
            const singole = $("#singole");
            const doppie = $("#doppie");

            // Camere > 0
            if (singole.val() + doppie.val() < 1)
                event.preventDefault();
        }
    }

    const controlloCamere = () => {
        const singole = $("#singole");
        const doppie = $("#doppie");
        const camereAiuto = $("#camereAiuto");

        if (singole.val() < 0)
            singole.val(0);

        if (doppie.val() < 0)
            doppie.val(0);

        if (! (singole.val() + doppie.val() > 1)) {
            camereAiuto.removeClass("d-none");
            singole.addClass("border border-danger");
            doppie.addClass("border border-danger");
        }

        else {
            camereAiuto.addClass("d-none");
            singole.removeClass("border border-danger");
            doppie.removeClass("border border-danger");
        }
    }

    const controlloDate = () => {
        const dataCI = $("#dataCheckIn");
        const dataCO = $("#dataCheckOut");
        const dateAiuto = $("#dateAiuto");
        const passatoAiuto = $("#passatoAiuto");

        const CI = new Date(dataCI.val());
        const CO = new Date(dataCO.val());

        if (CI.getTime() <=  oggi.getTime()) {
            passatoAiuto.removeClass("d-none");
            dataCI.addClass("border border-danger");
        }

        else {
            passatoAiuto.addClass("d-none");
            dataCI.removeClass("border border-danger");
        }

        if (CO.getTime() <= CI.getTime()) {
            dateAiuto.removeClass("d-none");
            dataCO.addClass("border border-danger");
        }

        else {
            dateAiuto.addClass("d-none");
            dataCO.removeClass("border border-danger");
        }
    }

    const controlloOspiti = () => {
        const esenti = $("#esenti");
        const adulti = $("#adulti");
        const adultiAiuto = $("#adultiAiuto");
        const esentiAiuto = $("#esentiAiuto");

        // Controllo numero adulti
        if (adulti.val() < 1) {
            adultiAiuto.removeClass("d-none");
        }

        else {
            adultiAiuto.addClass("d-none");
        }

        // Controllo numero esenti
        if (esenti.val() > adulti.val()) {
            esentiAiuto.removeClass("d-none");
        }

        else {
            esentiAiuto.addClass("d-none");
        }
    }

    return (
        <div className="container px-3 mt-3">
            {/* Nome e località */}
            <div className="shadow mt-3 card bg-white p-3">
                <h3>{props.struttura.nome}</h3>
                <Breadcrumb gerarchia={[
                    {url: "/search?destinazione=" + props.struttura.regione, testo: props.struttura.regione},
                    {url: "/search?destinazione=" + props.struttura.provincia, testo: props.struttura.provincia},
                    {url: "/search?destinazione=" + props.struttura.comune, testo: props.struttura.comune}
                ]} icona="map"/>
            </div>

            {/* Immagini */}
            <ImmaginiStruttura struttura={props.struttura} idStruttura={id}/>

            <div className="d-lg-flex flex-lg-row-reverse">
                {/* Form dati di soggiorno */}
                <div className="shadow mt-3 card bg-dark text-light p-3 col-12 col-lg-6">
                    <form className="form" id="formRichiestaPrenotazione" onSubmit={controlloForm}>
                        <div className="my-3">
                            <h5>Calendario</h5>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="dataCheckIn">Check-in</label>
                                <div className="col-sm-4">
                                    <input name="dataCheckIn" type="date" className="form-control" id="dataCheckIn"
                                           aria-describedby="Data check-in" min={minDataA} defaultValue={minDataA}
                                           max={maxData} onChange={aggiornaMinDataPartenza} required/>
                                </div>
                                <label className="sr-only" htmlFor="orarioCheckIn">Orario</label>
                                <div className="col-sm-4">
                                    <input name="orarioCheckIn" type="time" className="form-control" id="orarioCheckIn"
                                           defaultValue="11:00" min="06:00" max="15:00" required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="dataCheckOut">Check-out</label>
                                <div className="col-sm-4">
                                    <input name="dataCheckIn" type="date" className="form-control" id="dataCheckOut"
                                           aria-describedby="Data check-out" min={minDataP} defaultValue={minDataP}
                                           max={maxData} required onChange={controlloDate}/>
                                </div>
                                <label className="sr-only" htmlFor="orarioCheckOut">Orario</label>
                                <div className="col-sm-4">
                                    <input name="orarioCheckOut" type="time" className="form-control" id="orarioCheckOut"
                                           defaultValue="11:00" min="06:00" max="15:00" required/>
                                </div>
                            </div>

                            <small id="passatoAiuto" className="form-text text-warning d-none">
                                Non siamo ancora in grado di tornare al passato, ma ci stiamo lavorando.
                            </small>

                            <small id="dateAiuto" className="form-text text-warning d-none">
                                La data di check-out deve essere posteriore alla data di check-in.
                            </small>
                        </div>

                        { props.struttura.tipologia && props.struttura.tipologia === "b&b" && (
                            <div className="my-3">
                                <h5>Seleziona camere</h5>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="singole">Singole</label>
                                    <div className="col-sm-3">
                                        <input name="singole" type="number" className="form-control" id="singole"
                                               aria-describedby="Numero camere singole" min={0} max={10}
                                               defaultValue={0} onChange={controlloCamere}/>
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="doppie">Doppie</label>
                                    <div className="col-sm-3">
                                        <input name="doppie" type="number" className="form-control" id="doppie"
                                               aria-describedby="Numero camere doppie" min={0} max={10}
                                               defaultValue={1} onChange={controlloCamere}/>
                                    </div>
                                </div>


                                <small id="camereAiuto" className="form-text text-warning d-none">
                                    Devi selezionare almeno una camera.
                                </small>
                            </div>
                        )}

                        <div className="my-3">
                            <h5>Ospiti</h5>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="adulti">Adulti</label>
                                <div className="col-sm-3">
                                    <input name="adulti" type="number" className="form-control" id="adulti"
                                           aria-describedby="Numero di adulti" min={1} max={100}
                                           defaultValue={props.ospiti || 2} onChange={controlloOspiti} required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="bambini">Bambini</label>
                                <div className="col-sm-3">
                                    <input name="bambini" type="number" className="form-control" id="numeroSingole"
                                           aria-describedby="Numero di bambini" min={0} max={100}
                                           defaultValue={0} required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="esenti">Esenti</label>
                                <div className="col-sm-3">
                                    <input name="esenti" type="number" className="form-control" id="esenti"
                                           aria-describedby="esentiHelp" min={0} max={numeroAdulti}
                                           defaultValue={0} onChange={controlloOspiti}/>
                                </div>
                            </div>

                            <small id="adultiAiuto" className="form-text text-warning d-none">
                                Deve essere presente almeno un adulto.
                            </small>

                            <small id="esentiAiuto" className="form-text text-warning d-none">
                                Il numero di esenti non può essere superiore al numero di adulti.
                            </small>
                        </div>

                        <div className="text-right">
                            <button type="submit" className="btn btn-warning">Richiedi prenotazione</button>
                        </div>
                    </form>
                </div>

                {/* Informazioni struttura */}
                <div className="shadow mt-3 card bg-white p-3 col-12 col-lg-6">
                    <div>
                        <h6>Informazioni sulla struttura</h6>
                        <p>{props.struttura.descrizione}</p>
                    </div>
                    <div>
                        <h6>Servizi</h6>
                        <div className="row mx-auto">
                            {
                                props.struttura.servizi && props.struttura.servizi.map((servizio) => {
                                    return (
                                        <Servizio key={servizio.servizio} servizio={servizio.servizio} icona={servizio.icona}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Mappa */}
            <div className="shadow mt-3 card bg-white p-3">
                <h6>Esplora la zona</h6>
                <div className="shadow-sm w-100" style={{height: 250 + "px"}}>
                    <Mappa destinazione={props.struttura.comune}/>
                </div>
            </div>

        </div>
    )
}

export default SchermataStruttura;