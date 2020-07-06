import React, {useEffect} from "react";
import data from "../../regioni_province_comuni.js";
import $ from 'jquery';

function FormStruttura (props) {

    useEffect(() => {
        if (props.currentStep === 2) {
            regioniEventHandler();
            provinceEventHandler();
        }
    }, [props.currentStep]);

    let province = null;
    function addressEventHandler(event) {
        const inputs = $(".form-row input");

        if (event.target.value !== '') {
            inputs.not('#via').removeAttr('disabled').attr('required', 'required');
        } else {
            inputs.not("#via").attr('disabled', 'disabled');
            $("#cap").val("");
            $("#numeroCivico").val("");
        }
    }

    function tabEventHandler(event){
        const inputs = $(".form-row input");

        if (event.keyCode === 9) { // pressione TAB
            if ($(this).val() !== '') {
                inputs.not('#via').removeAttr('disabled').attr('required', 'required');
            } else {
                inputs.not('#via').attr('disabled', 'disabled').removeAttr('required');
            }
        }
    }

    function regioniEventHandler() {
        const regioneInput = document.getElementById("nomeRegione");
        const provinceInput = document.getElementById("nomeProvincia");

        // rimozione dei precedenti elementi del menu provinca e comune
        provinceInput.innerHTML = '<option value="" selected/>';
        document.getElementById("nomeComune").innerHTML='<option value="" selected/>';

        if (regioneInput.value !== '') {
            for (let regione of data.regioni) {
                if (regione.nome === regioneInput.value) {
                    province = regione.province;
                    break;
                }
            }

            for (let provincia of province) {
                let opt = document.createElement('option');
                opt.value = provincia.code;
                opt.innerText = provincia.nome;
                provinceInput.appendChild(opt);
            }

            if (props.dati.nomeProvincia) {
                provinceInput.value = props.dati.nomeProvincia;
            }
        }
    }

    function provinceEventHandler(){
        const provinceInput = document.getElementById("nomeProvincia");
        const comuniInput = document.getElementById("nomeComune");

        // rimozione dei precedenti elementi del menu Comune
        comuniInput.innerHTML='<option value="" selected/>';
        if (provinceInput.value !== '') {
            for (let provincia of province) {
                if (provincia.code === provinceInput.value) {
                    for (let comune of provincia.comuni) {
                        let opt = document.createElement('option');
                        opt.value = comune.code;
                        opt.innerText = comune.nome;
                        document.getElementById("nomeComune").appendChild(opt);
                    }
                    break; // non dobbiamo cercare oltre
                }
            }

            if (props.dati.nomeComune) {
                comuniInput.value = props.dati.nomeComune;
            }
        }
    }

    function vaiAvanti(event) {
        event.preventDefault();
        $("#form").addClass("was-validated");
        if (controlloCAP()) {
            $("#feedbackCap").removeClass("collapse");
            if (document.getElementById("form").checkValidity()) {
               props.go();
            } else {
                event.preventDefault();
            }
        }
    }

    function controlloCAP() {
        const form = $("#form");
        const cap = $("#cap");
        const capVal = cap.val();

        if (capVal >= 10 && capVal <= 98168) {
            if (form.hasClass("was-validated")) {
                cap.removeClass("border-danger");
                cap.removeClass("is-invalid");
            }
            return true;
        }

        else {
            if (form.hasClass("was-validated")) {
                cap.addClass("border-danger");
                cap.addClass("is-invalid");
            }
            return false;
        }
    }

    function vaiIndietro() {
        props.goBack();
    }

    if(props.currentStep !== 2){
        return null;
    }

    return(
        <form id="form" className="p-3 needs-validation" onChange={props.handleChange} noValidate>
            <div className="form-group mb-3">
                <label htmlFor="nomeStruttura">Come si chiama la tua struttura?</label>
                <input id="nomeStruttura" name="nomeStruttura" type="text" className="form-control" maxLength="60" defaultValue={props.dati.nomeStruttura}  required/>
                <div className="invalid-feedback">
                    Inserisci il nome della struttura
                </div>
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text w-105px">Regione&nbsp;&nbsp;</span>
                </div>
                <select id="nomeRegione" className="custom-select" name="nomeRegione" onLoad={regioniEventHandler} onChange={regioniEventHandler} defaultValue={props.dati.nomeRegione} required>
                    <option value=""/>
                    <option value="Abruzzo">Abruzzo</option>
                    <option value="Basilicata">Basilicata</option>
                    <option value="Calabria">Calabria</option>
                    <option value="Campania">Campania</option>
                    <option value="Emilia-Romagna">Emilia-Romagna</option>
                    <option value="Friuli-Venezia Giulia">Friuli-Venezia Giulia</option>
                    <option value="Lazio">Lazio</option>
                    <option value="Liguria">Liguria</option>
                    <option value="Lombardia">Lombardia</option>
                    <option value="Marche">Marche</option>
                    <option value="Molise">Molise</option>
                    <option value="Piemonte">Piemonte</option>
                    <option value="Puglia">Puglia</option>
                    <option value="Sardegna">Sardegna</option>
                    <option value="Sicilia">Sicilia</option>
                    <option value="Toscana">Toscana</option>
                    <option value="Trentino-Alto Adige">Trentino-Alto Adige</option>
                    <option value="Umbria">Umbria</option>
                    <option value="Valle d'Aosta">Valle d'Aosta</option>
                    <option value="Veneto">Veneto</option>
                </select>
                <div className="invalid-feedback">
                    Selezionare la regione
                </div>
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text w-105px">Provincia&nbsp;</span>
                </div>
                <select id="nomeProvincia" name="nomeProvincia" className="custom-select" onLoad={provinceEventHandler} onChange={provinceEventHandler} defaultValue={props.dati.nomeProvincia} required>
                    <option value=""/>
                </select>
                <div className="invalid-feedback">
                    Selezionare la provincia
                </div>
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text w-105px">Comune&nbsp;&nbsp;</span>
                </div>
                <select id="nomeComune" name="nomeComune" className="custom-select" defaultValue={props.dati.nomeComune} required>
                    <option value="" />
                </select>
                <div className="invalid-feedback">
                    Selezionare il comune
                </div>
            </div>

            <div className="form-row mb-3">
                <div className="col-12 col-lg-6">
                    <label htmlFor="via">Via/Piazza</label>
                    <input name="via" id="via" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control"
                           maxLength="40" onBlur={addressEventHandler} onKeyDown={tabEventHandler} defaultValue={props.dati.via} required/>
                    <div className="invalid-feedback">
                        Selezionare la via
                    </div>
                </div>
                <div className="col-5 col-md-4 col-lg-3">
                    <label htmlFor="numeroCivico">N.</label>
                    <input name="numeroCivico" id="numeroCivico" type="number" className="form-control " min="1" max="9999" size="4"
                           maxLength="4" defaultValue={props.dati.numeroCivico} required disabled/>
                    <div className="invalid-feedback">1 - 9999</div>
                </div>
                <div className="col-4 col-md-4 col-lg-3">
                    <label htmlFor="cap">CAP.</label>
                    <input name="cap" id="cap" type="tel" className="form-control form-check" pattern="^\d{5}$" placeholder="#####"
                           title="Inserire 5 cifre da 00010 a 98168" size="5" maxLength="5"  disabled defaultValue={props.dati.cap}
                           onChange={controlloCAP} required/>
                    <div className="invalid-feedback">00010 - 98168</div>
                </div>
                <p id="feedbackCap" className=" text-danger collapse" >00010 - 98168</p>
            </div>

            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={vaiAvanti}>Continua</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={vaiIndietro}>Indietro</button>
            </div>
        </form>
    );
}

export default FormStruttura;
