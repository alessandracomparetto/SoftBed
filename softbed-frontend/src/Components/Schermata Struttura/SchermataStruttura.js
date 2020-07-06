import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";
import {useParams, useHistory, useLocation} from "react-router-dom";

import Breadcrumb from "../Breadcrumb";
import Caratteristica from "../Schermata Risultati/Caratteristica";
import Mappa from "../Schermata Risultati/Mappa";
import ImmaginiStruttura from "./ImmaginiStruttura";

import {ambienti, generali, servizi} from "../../caratteristiche";
import reindirizza from "../../Actions/reindirizzamento";
import {GIORNO, convertiData} from "../../Actions/gestioneDate";


function SchermataStruttura() {
    const history = useHistory();
    const location = useLocation();

    const { id } = useParams();

    const [prezzo, setPrezzo] = useState(0);
    const [struttura, setStruttura] = useState({
        camere: [],
        idStruttura: id,
        localita: {},
        pagamento: {},
        prenotazione: {durata: {}, anticipo: {}, checkIn: {}, checkOut: {}},
        prezzo: 0,
        tasse: {}
    });

    // GESTIONE DELLE DATE
    const oggi = new Date(convertiData(new Date()));
    const minDataA = convertiData(oggi, struttura.prenotazione.anticipo.min || 2);
    const maxData = convertiData(oggi, 0, 0, 1);

    const [numeroAdulti, setNumeroAdulti] = useState( 2);
    const [maxOspiti, setMaxOspiti] = useState(100);
    const [numeroBambini, setNumeroBambini] = useState(0);
    const [minDataP, setMinDataP] = useState(convertiData(new Date(minDataA), 2));

    // CARICAMENTO DELLA STRUTTURA
    useEffect(() => {
        let tmp = {};
        axios.get(`/struttura/${id}`)
            .then((res) => {
                Object.assign(tmp, struttura);
                tmp.nome = res.data.nome;
                tmp.descrizione = res.data.descrizione;
                tmp.tipologia = res.data.tipologia;
                tmp.foto = res.data.foto;
                tmp.localita = res.data.localita;
                tmp.condizioniSoggiorno = res.data.condizioniSoggiorno;
                tmp.condizioniPrenotazione = res.data.condizioniPrenotazione;
                tmp.tasse = res.data.tasse;
                tmp.servizi = res.data.servizi.map((servizio) => { return servizi[servizio] });

                if (res.data.prezzo) // Solo per CV, per i B&B si trova nelle camere
                    tmp.prezzo = res.data.prezzo;

                if (res.data.camere) // Solo per B&B
                    tmp.camere = res.data.camere;

                if (res.data.ambienti) // Solo per CV
                    tmp.ambienti = res.data.ambienti.map((ambiente) => { return ambienti[ambiente] });

                if (res.data.altro) // Solo per CV: numCamere, numBagni, numLettiSingoli, numLettiMatrimoniali
                    tmp.altro = res.data.altro;

                setStruttura(tmp);

                // Caricamento di dati precedentemente impostati
                if (location.state && location.state.data) {
                    const d = location.state.data;

                    if (d.adulti)
                        $("#adulti").val(d.adulti);

                    if (d.adultiEsenti)
                        $("#adultiEsenti").val(d.adultiEsenti);

                    if (d.bambini)
                        $("#bambini").val(d.bambini);

                    if (d.bambiniEsenti)
                        $("#bambiniEsenti").val(d.bambiniEsenti);

                    if (d.dataCheckIn)
                        $("#dataCheckIn").val(d.dataCheckIn);

                    if (d.dataCheckOut)
                        $("#dataCheckOut").val(d.dataCheckOut);

                    if (d.orarioCheckIn)
                        $("#orarioCheckIn").val(d.orarioCheckIn);

                    if (d.orarioCheckOut)
                        $("#orarioCheckOut").val(d.orarioCheckOut);

                    if (d.camere) {
                        Object.keys(d.camere).map((tipologiaCamera) => {
                            let elemento = $(`#${tipologiaCamera}`);

                            if (elemento)
                                elemento.val(d.camere[tipologiaCamera]);
                        })
                    }
                }
            })
            .then(() => {
                // Aggiunta della struttura alla lista annunciRecenti della local storage
                if (localStorage) {
                    let LS = JSON.parse(localStorage.getItem("annunciRecenti")) || [];

                    let nuovaStruttura = {id: id, nome: tmp.nome}
                    if (tmp.foto) {
                        nuovaStruttura.img = tmp.foto[0];
                    }
                    const pos = LS.map((e) => { return e.id; }).indexOf(nuovaStruttura.id);

                    if (pos !== -1) { LS.splice(pos, 1); } // Rimozione della struttura se già presente

                    // Aggiunta della struttura
                    let nuovoLS = [...LS, nuovaStruttura];
                    nuovoLS = nuovoLS.slice(Math.max(nuovoLS.length - 3, 0), nuovoLS.length);
                    localStorage.setItem("annunciRecenti", JSON.stringify(nuovoLS));
                }
            })
            .catch(() => reindirizza(history, "/", 4000, "Si è verificato un problema col caricamento della struttura."));
    }, []);

    // GESTIONE STATO NUMERO ADULTI
    useEffect(() => {
        const adulti = $("#adulti");
        const bambini = $("#bambini")

        adulti.on('change', () => {
            setNumeroAdulti(parseInt(adulti.val()));
        })

        bambini.on('change', () => {
            setNumeroBambini(parseInt(bambini.val()));
        })
    }, []);

    // Aggiorna il valore minimo per la data di partenza in base alla data di arrivo inserita
    const aggiornaMinDataPartenza = (event) => {
        const dataInserita = new Date(event.target.value);
        const nuovaDataConvertita = convertiData(new Date(dataInserita), struttura.condizioniSoggiorno.soggiorno.min);
        setMinDataP(nuovaDataConvertita);
        controlloDate(event);
    }

    const controlloAccesso = (event) => {
        event.preventDefault();

        // Mi genero un URL personalizzato interpretabile dalla pagina di pagamento
        let parametri = {
            idStruttura: id,
            dataCheckIn: $("#dataCheckIn").val(),
            orarioCheckIn: $("#orarioCheckIn").val(),
            dataCheckOut: $("#dataCheckOut").val(),
            orarioCheckOut: $("#orarioCheckOut").val(),
            adulti: $("#adulti").val(),
            bambini: $("#bambini").val(),
            adultiEsenti: $("#adultiEsenti").val(),
            bambiniEsenti: $("#bambiniEsenti").val(),
            struttura: struttura,
            prezzo: prezzo
        }

        if (struttura.camere) {
            parametri.camere = [];

            struttura.camere.map((camera) => {
                parametri.camere[camera.tipologiaCamera] = $(`#${camera.tipologiaCamera}`).val();
            });
        }

        if (sessionStorage.getItem("utente") && JSON.parse(sessionStorage.getItem("utente")).idUtente) {
            history.push({
                pathname:'/pagamento',
                state: {
                    provenienza: 'Schermata struttura',
                    urlProvenienza: {
                        pathname: location.pathname,
                        // Passo dei parametri nel caso in cui l'utente voglia tornare alla schermata struttura
                        state: {
                            data: parametri
                        }
                    },
                    data: parametri
                }
            })
        }

        else {
            // Se l'utente non risulta loggato, viene rimandato alla pagina di login
            reindirizza(history, {
                pathname: '/accedi',
                state: {
                    provenienza: 'Schermata struttura',
                    urlProvenienza: {
                        pathname: location.pathname,
                        // Passaggio dei parametri affinché vengano caricati automaticamente dopo il login
                        state: {
                            data: parametri
                        }
                    }
                }
            }, 3000, "Devi effettuare l'accesso per poter effettuare una richiesta di prenotazione.");
        }
    }

    const controlloForm = (event) => {
        if ((struttura.tipologia === "B&B" && !controlloCamere()) || !controlloOspiti() || !controlloDate()) {
            event.preventDefault();
        }

        else controlloAccesso(event);
    }

    const controlloCamere = () => {
        let somma = 0;
        const camereAiuto = $("#camereAiuto");

        // Controllo che il numero di camere sia positivo per ciascuna tipologia e ne calcolo la somma
        struttura.camere.map((camera) => {
            const elemento = $(`#${camera.tipologiaCamera}`)

            if (elemento.val() < 0) {
                elemento.val(0);
            }

            somma += elemento.val();
        })

        if (somma < 1) {
            camereAiuto.removeClass("d-none");
            struttura.camere.map((camera) => {
                $(`#${camera.tipologiaCamera}`).addClass("border border-danger");
            })
            return false;
        }

        else {
            camereAiuto.addClass("d-none");
            struttura.camere.map((camera) => {
                $(`#${camera.tipologiaCamera}`).removeClass("border border-danger");
            })
        }

        aggiornaPrezzo();
        return true;
    }

    const controlloDate = () => {
        let risultato = true;
        const dataCI = $("#dataCheckIn");
        const dataCO = $("#dataCheckOut");
        const dateAiuto = $("#dateAiuto");
        const passatoAiuto = $("#passatoAiuto");
        const intervalloDateAiuto = $("#intervalloDateAiuto");

        const CI = new Date(dataCI.val());
        const CO = new Date(dataCO.val());

        const differenzaMS = new Date(new Date(CO).getTime() - new Date(CI).getTime());
        const differenzaGiorni = Math.ceil(differenzaMS.getTime() / GIORNO);

        if (struttura.condizioniSoggiorno) {
            if ((differenzaGiorni < struttura.condizioniSoggiorno.soggiorno.min) ||
                (differenzaGiorni > Math.min(struttura.condizioniSoggiorno.soggiorno.max, 28))) {
                intervalloDateAiuto.removeClass("d-none");
                risultato = false;
            }

            else {
                intervalloDateAiuto.addClass("d-none");
            }
        }

        if (CI.getTime() < oggi.getTime()) {
            passatoAiuto.removeClass("d-none");
            dataCI.addClass("border border-danger");
            risultato = false;
        }

        else {
            passatoAiuto.addClass("d-none");
            dataCI.removeClass("border border-danger");
        }

        if (CO.getTime() <= CI.getTime()) {
            dateAiuto.removeClass("d-none");
            dataCO.addClass("border border-danger");
            risultato = false;
        }

        else {
            dateAiuto.addClass("d-none");
            dataCO.removeClass("border border-danger");
        }

        aggiornaPrezzo();
        return risultato;
    }

    const controlloOrari = () => {
        const orarioCheckIn = $("#orarioCheckIn");
        const orarioCheckOut = $("#orarioCheckOut");
        const orarioCheckInAiuto = $("#orarioCheckInAiuto");
        const orarioCheckOutAiuto = $("#orarioCheckOutAiuto");

        if (struttura.condizioniSoggiorno) {
            if ((orarioCheckIn.val() < struttura.condizioniSoggiorno.checkIn.inizio.slice(0, 5)) ||
                (orarioCheckIn.val() > struttura.condizioniSoggiorno.checkIn.fine.slice(0, 5))) {
                orarioCheckIn.addClass("border border-danger");
                orarioCheckInAiuto.removeClass("d-none");
            }

            else {
                orarioCheckIn.removeClass("border border-danger");
                orarioCheckInAiuto.addClass("d-none")
            }

            if ((orarioCheckOut.val() < struttura.condizioniSoggiorno.checkOut.inizio.slice(0, 5)) ||
                (orarioCheckOut.val() > struttura.condizioniSoggiorno.checkOut.fine.slice(0, 5))) {
                orarioCheckOut.addClass("border border-danger");
                orarioCheckOutAiuto.removeClass("d-none");
            }

            else {
                orarioCheckOut.removeClass("border border-danger");
                orarioCheckOutAiuto.addClass("d-none")
            }
        }
    }

    const controlloOspiti = () => {
        const adultiEsenti = $("#adultiEsenti");
        const bambiniEsenti = $("#bambiniEsenti");
        const adulti = $("#adulti");
        const bambini = $("#bambini");
        const adultiAiuto = $("#adultiAiuto");
        const adultiEsentiAiuto = $("#adultiEsentiAiuto");
        const bambiniEsentiAiuto = $("#bambiniEsentiAiuto");
        const totaleOspitiAiuto = $("#totaleOspitiAiuto");

        let flag = true;

        // Controllo numero adulti
        if (adulti.val() < 1) {
            adultiAiuto.removeClass("d-none");
            flag = false;
        }

        else {
            adultiAiuto.addClass("d-none");
        }

        // Controllo numero adulti esenti
        if (adultiEsenti.val() > adulti.val()) {
            adultiEsentiAiuto.removeClass("d-none");
            flag = false;
        }

        else {
            adultiEsentiAiuto.addClass("d-none");
        }

        // Controllo numero bambini esenti
        if (bambiniEsenti.val() > bambini.val()) {
            bambiniEsentiAiuto.removeClass("d-none");
            flag = false;
        }

        else {
            bambiniEsentiAiuto.addClass("d-none");
        }

        // Controllo numero totale di ospiti
        if (parseInt(adulti.val()) + parseInt(bambini.val()) > maxOspiti) {
            totaleOspitiAiuto.removeClass("d-none");
            flag = false;
        }

        else {
            totaleOspitiAiuto.addClass("d-none");
        }

        aggiornaPrezzo();
        return flag;
    }

    const aggiornaPrezzo = () => {
        const adulti = parseInt($("#adulti").val());
        const bambini = parseInt($("#bambini").val());
        const adultiEsenti = parseInt($("#adultiEsenti").val());
        const bambiniEsenti = parseInt($("#bambiniEsenti").val());
        const dataCheckIn = $("#dataCheckIn").val();
        const dataCheckOut = $("#dataCheckOut").val();

        const differenzaMS = new Date(new Date(dataCheckOut).getTime() - new Date(dataCheckIn).getTime());
        const differenzaGiorni = Math.ceil(differenzaMS.getTime() / GIORNO);

        let prezzoBase;

        if (struttura.tipologia === "cv") { //CV
            prezzoBase = (adulti + bambini) * struttura.prezzo * differenzaGiorni;
        }

        else { // B&B
            let prezzoTMP = 0;

            struttura.camere.map((camera) => {
                prezzoTMP += parseInt($(`#${camera.tipologiaCamera}`).val()) * camera.prezzo;
            })

            prezzoBase = prezzoTMP * differenzaGiorni;
        }

        let tasseAdulti = 0;
        let tasseBambini = 0;

        if (struttura.tasse) {
            tasseAdulti = (adulti - adultiEsenti) * struttura.tasse.adulti;
            tasseBambini = (bambini - bambiniEsenti) * struttura.tasse.bambini;
        }

        setPrezzo(Math.max((Math.round((prezzoBase + tasseAdulti + tasseBambini) * 100) / 100), 0));
    }

    useEffect(() => {
        aggiornaPrezzo(); // Aggiornamento del prezzo al caricamento della struttura

        let totale = 0;

        if (struttura.tipologia === "cv") {
            totale = parseInt(struttura.altro.singoli) + 2 * parseInt(struttura.altro.matrimoniali);
        }

        else {

            struttura.camere.map((camera) => {
                if (camera.tipologiaCamera === "singola")
                    totale += parseInt(camera.numero);
                else if (camera.tipologiaCamera === "doppia")
                    totale += 2 * parseInt(camera.numero);
                else if (camera.tipologiaCamera === "tripla")
                    totale += 3 * parseInt(camera.numero);
                else
                    totale += 4 * parseInt(camera.numero);
            })
        }

        if (totale) {
            setMaxOspiti(totale);
        }
    }, [struttura]);

    return (
        <div className="container px-3 mt-3">
            {/* Nome e località */}
            <div className="shadow mt-3 card bg-white p-3">
                <h3>{struttura.nome}</h3>
                <Breadcrumb gerarchia={[
                    {url: "/search?destinazione=" + struttura.localita.regione, testo: struttura.localita.regione},
                    {url: "/search?destinazione=" + struttura.localita.provincia, testo: struttura.localita.provincia},
                    {url: "/search?destinazione=" + struttura.localita.comune, testo: struttura.localita.comune},
                    {testo: struttura.localita.indirizzo, stato: "active"}
                ]} icona="map"/>
            </div>

            {/* Immagini */}
            <ImmaginiStruttura struttura={struttura} idStruttura={id}/>

            <div className="d-lg-flex flex-lg-row-reverse">
                {/* Form dati di soggiorno */}
                <div className="shadow mt-3 card bg-dark text-light p-3 col-12 col-lg-6 h-100">
                    <form className="form" id="formRichiestaPrenotazione" onSubmit={controlloForm}>
                        <div className="my-3">
                            <h5>Calendario</h5>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label" htmlFor="dataCheckIn">Check-in</label>
                                <div className="col-sm-4">
                                    <input name="dataCheckIn" type="date" className="form-control" id="dataCheckIn"
                                           aria-describedby="Data check-in" min={minDataA} defaultValue={minDataA}
                                           max={maxData} onChange={aggiornaMinDataPartenza} required/>
                                </div>
                                <label className="sr-only" htmlFor="orarioCheckIn">Orario</label>
                                <div className="col-sm-4">
                                    <input name="orarioCheckIn" type="time" className="form-control" id="orarioCheckIn"
                                           defaultValue={struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkIn.inizio.slice(0, 5)}
                                           min={struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkIn.inizio.slice(0, 5)}
                                           max={struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkIn.fine.slice(0, 5)}
                                           required onChange={controlloOrari}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label" htmlFor="dataCheckOut">Check-out</label>
                                <div className="col-sm-4">
                                    <input name="dataCheckIn" type="date" className="form-control" id="dataCheckOut"
                                           aria-describedby="Data check-out" min={minDataP} defaultValue={minDataP}
                                           max={maxData} required onChange={controlloDate}/>
                                </div>
                                <label className="sr-only" htmlFor="orarioCheckOut">Orario</label>
                                <div className="col-sm-4">
                                    <input name="orarioCheckOut" type="time" className="form-control" id="orarioCheckOut"
                                           defaultValue={struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkOut.inizio.slice(0, 5)}
                                           min={struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkOut.inizio.slice(0, 5)}
                                           max={struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkOut.fine.slice(0, 5)}
                                           required onChange={controlloOrari}/>
                                </div>
                            </div>

                            <small id="passatoAiuto" className="form-text text-warning d-none">
                                Non siamo ancora in grado di tornare al passato, ma ci stiamo lavorando.
                            </small>

                            <small id="dateAiuto" className="form-text text-warning d-none">
                                La data di check-out deve essere posteriore alla data di check-in.
                            </small>

                            <small id="intervalloDateAiuto" className="form-text text-warning d-none">
                                Per questa struttura la durata del soggiorno deve essere compresa fra {struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.soggiorno.min} e {Math.min(struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.soggiorno.max, 28)}
                            </small>

                            <small id="orarioCheckInAiuto" className="form-text text-warning d-none">
                                Per questa struttura l'orario di check-in deve essere compreso fra le {struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkIn.inizio.slice(0, 5)} e le {struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkIn.fine.slice(0, 5)}
                            </small>

                            <small id="orarioCheckOutAiuto" className="form-text text-warning d-none">
                                Per questa struttura l'orario di check-out deve essere compreso fra le {struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkOut.inizio.slice(0, 5)} e le {struttura.condizioniSoggiorno && struttura.condizioniSoggiorno.checkOut.fine.slice(0, 5)}
                            </small>
                        </div>

                        { struttura.tipologia && struttura.tipologia === "B&B" && struttura.camere && (
                            <div className="my-3">
                                <h5>Seleziona camere</h5>

                                { struttura.camere.map((camera) => {
                                    return (
                                        <div key={camera.tipologiaCamera} className="form-group row">
                                            <label className="col-sm-4 col-form-label" htmlFor={camera.tipologiaCamera}>
                                                {camera.tipologiaCamera.charAt(0).toUpperCase() + camera.tipologiaCamera.slice(1)}
                                            </label>
                                            <div className="col-sm-3">
                                                <input name={camera.tipologiaCamera} type="number" className="form-control" id={camera.tipologiaCamera}
                                                       aria-describedby={`Numero camere di tipo ${camera.tipologiaCamera}`} min={0} max={camera.numero}
                                                       defaultValue={0} onChange={controlloCamere}/>
                                            </div>
                                        </div>
                                    )
                                })}

                                <small id="camereAiuto" className="form-text text-warning d-none">
                                    Devi selezionare almeno una camera.
                                </small>
                            </div>
                        )}

                        <div className="my-3">
                            <h5>Ospiti</h5>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label" htmlFor="adulti">Adulti</label>
                                <div className="col-sm-3">
                                    <input name="adulti" type="number" className="form-control" id="adulti"
                                           aria-describedby="Numero di adulti" min={1} max={maxOspiti}
                                           defaultValue={2} onChange={controlloOspiti} required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label" htmlFor="bambini">Bambini</label>
                                <div className="col-sm-3">
                                    <input name="bambini" type="number" className="form-control" id="bambini"
                                           aria-describedby="Numero di bambini" min={0} max={maxOspiti}
                                           defaultValue={0} onChange={controlloOspiti} required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label" htmlFor="adultiEsenti">Adulti esenti</label>
                                <div className="col-sm-3">
                                    <input name="adultiEsenti" type="number" className="form-control" id="adultiEsenti"
                                           aria-describedby="adultiEsentiHelp" min={0} max={numeroAdulti}
                                           defaultValue={0} onChange={controlloOspiti}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label" htmlFor="bambiniEsenti">Bambini esenti</label>
                                <div className="col-sm-3">
                                    <input name="bambiniEsenti" type="number" className="form-control" id="bambiniEsenti"
                                           aria-describedby="bambiniEsentiHelp" min={0} max={numeroBambini}
                                           defaultValue={0} onChange={controlloOspiti}/>
                                </div>
                            </div>

                            <small id="adultiAiuto" className="form-text text-warning d-none">
                                Deve essere presente almeno un adulto.
                            </small>

                            <small id="totaleOspitiAiuto" className="form-text text-warning d-none">
                                Con le attuali impostazioni la struttura può ospitare al più {maxOspiti} persone.
                            </small>

                            <small id="adultiEsentiAiuto" className="form-text text-warning d-none">
                                Il numero di adulti esenti non può essere superiore al numero totale di adulti.
                            </small>

                            <small id="bambiniEsentiAiuto" className="form-text text-warning d-none">
                                Il numero di bambini esenti non può essere superiore al numero totale di bambini.
                            </small>
                        </div>

                        <div className="d-flex flex-row">
                            <div className="d-flex">
                                <span className="h3 mt-auto mb-1">{prezzo}€</span>
                            </div>
                            <div className="ml-auto">
                                <button type="submit" className="btn btn-warning">Richiedi prenotazione</button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Informazioni struttura */}
                <div className="shadow mt-3 card bg-white p-3 col-12 col-lg-6">
                    <div className="mb-4">
                        <h6>Informazioni sulla struttura</h6>
                        <p className="mb-0">{struttura.descrizione}</p>
                    </div>

                    <div className="mb-4">
                        <h6>Servizi</h6>
                        <div className="row mx-auto">
                            { struttura.servizi && struttura.servizi[0] && struttura.servizi.map((servizio) => {
                                return (
                                    <Caratteristica key={servizio.nome} caratteristica={servizio.nome} icona={servizio.icona} esteso={true}/>
                                )
                            })}
                        </div>
                    </div>

                    { struttura.tipologia && struttura.tipologia === "cv" && (
                        <Fragment>
                            <div className="mb-4">
                                <h6>Ambienti</h6>
                                <div className="row mx-auto">
                                    { struttura.ambienti && struttura.ambienti[0] && struttura.ambienti.map((ambiente) => {
                                        return (
                                            <Caratteristica key={ambiente.nome} caratteristica={ambiente.nome} icona={ambiente.icona} esteso={true}/>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6>Camere e letti</h6>
                                <div className="row mx-auto">
                                    { struttura.altro && Object.keys(struttura.altro)[0] && Object.keys(struttura.altro).map((elemento) => {
                                        if (struttura.altro[elemento] !== 0) return (
                                            <Caratteristica key={elemento}
                                                            caratteristica={
                                                                `${struttura.altro[elemento]}x ${generali[elemento].nome}`
                                                            }
                                                            icona={generali[elemento].icona}
                                                            esteso={true}/>
                                        )

                                        else return null;
                                    })}
                                </div>
                            </div>
                        </Fragment>
                    )}

                    <div className="mb-4">
                        <h6>Modalità di pagamento</h6>
                        <div className="row mx-auto">
                            {struttura.condizioniPrenotazione && struttura.condizioniPrenotazione.pagamentoOnline &&
                            <Caratteristica key="pagamentoOnline" caratteristica="Pagamento online" icona="money-check"
                                            esteso={true}/>
                            }
                            {struttura.condizioniPrenotazione && struttura.condizioniPrenotazione.pagamentoInLoco &&
                            <Caratteristica key="pagamentoOnline" caratteristica="Pagamento in loco"
                                            icona="money-bill-alt" esteso={true}/>
                            }
                        </div>
                    </div>

                </div>
            </div>

            {/* Mappa */}
            <div className="shadow mt-3 card bg-white p-3">
                <h6>Esplora la zona</h6>
                <div className="shadow-sm w-100" style={{height: 250 + "px"}}>
                    <Mappa destinazione={struttura.localita.comune}/>
                </div>
            </div>

        </div>
    )
}

export default SchermataStruttura;