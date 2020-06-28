import React, {useEffect} from "react";
import data from "../../regioni_province_comuni.js";
import $ from 'jquery';
import axios from 'axios';

/* TODO sistemare cap, rimuovere spunta quando non validato*/


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
            inputs.not('#address').removeAttr('disabled');
            inputs.not('#address').attr('required', 'required');
        } else {
            inputs.not('#address').attr('disabled', 'disabled');
            inputs.not('#address').removeAttr('required');
        }
    }

    function tabEventHandler(event){
        const inputs = $(".form-row input");

        if (event.keyCode === 9) { // pressione TAB
            if ($(this).val() !== '') {
                inputs.not('#address').removeAttr('disabled');
                inputs.not('#address').attr('required', 'required');
            } else {
                inputs.not('#address').attr('disabled', 'disabled');
                inputs.not('#address').removeAttr('required');
            }
        }
    }

    function regioniEventHandler() {
        const regioneInput = document.getElementById("region");
        const provinceInput = document.getElementById("state");

        // rimozione dei precedenti elementi del menu provinca e comune
        provinceInput.innerHTML = '<option value="" selected/>';
        document.getElementById("town").innerHTML='<option value="" selected/>';

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

            if (props.dati.state) {
                provinceInput.value = props.dati.state;
            }
        }
    }

    function provinceEventHandler(){
        const provinceInput = document.getElementById("state");
        const comuniInput = document.getElementById("town");

        // rimozione dei precedenti elementi del menu Comune
        comuniInput.innerHTML='<option value="" selected/>';
        if (provinceInput.value !== '') {
            for (let provincia of province) {
                if (provincia.code === provinceInput.value) {
                    for (let comune of provincia.comuni) {
                        let opt = document.createElement('option');
                        opt.value = comune.code;
                        opt.innerText = comune.nome;
                        document.getElementById("town").appendChild(opt);
                    }
                    break; // non dobbiamo cercare oltre
                }
            }

            if (props.dati.town) {
                comuniInput.value = props.dati.town;
            }
        }
    }

    function vaiAvanti(event) {
        event.preventDefault();
        document.getElementById("form").classList.add("was-validated");
        if (controlloCAP()) {
            document.getElementById("feedback").classList.add("collapse");
            if (document.getElementById("form").checkValidity()) {
                try {
                    let dati = props.dati;
                    console.log("DATI======= ");
                    console.log(dati);
                    axios.post('/struttura', dati)
                        .then(res => { // then print response status
                            console.log(res.data);
                        });
                    props.go();
                } catch (e) {
                    console.log(e);
                }
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
        <form id="form" className="container pt-3 needs-validation" onChange={props.handleChange} noValidate>
            <div className="form-group mb-3">
                <label htmlFor="name">Come si chiama la tua struttura?</label>
                <input id="name" name="name" type="text" className="form-control" maxLength="60" defaultValue={props.dati.name}  required/>
                <div className="invalid-feedback">
                    Inserisci il nome della struttura
                </div>
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text w-105px">Regione&nbsp;&nbsp;</span>
                </div>
                <select id="region" className="custom-select" name="region" onLoad={regioniEventHandler} onChange={regioniEventHandler} defaultValue={props.dati.region} required>
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
                <select id="state" name="state" className="custom-select" onLoad={provinceEventHandler} onChange={provinceEventHandler} defaultValue={props.dati.state} required>
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
                <select id="town" name="town" className="custom-select" defaultValue={props.dati.town} required>
                    <option value="" />
                </select>
                <div className="invalid-feedback">
                    Selezionare il comune
                </div>
            </div>

            <div className="form-row mb-3">
                <div className="col-12 col-lg-6">
                    <label htmlFor="address">Via/Piazza</label>
                    <input name="address" id="address" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control"
                           maxLength="40" onBlur={addressEventHandler} onKeyDown={tabEventHandler} defaultValue={props.dati.address} required/>
                </div>
                <div className="col-5 col-md-4 col-lg-3">
                    <label htmlFor="addressnum">N.</label>
                    <input name="addressnum" id="addressnum" type="number" className="form-control " min="1" max="9999" size="4"
                           maxLength="4" defaultValue={props.dati.addressnum} required/>
                    <div className="invalid-feedback">1 - 9999</div>
                </div>
                <div className="col-4 col-md-4 col-lg-3">
                    <label htmlFor="cap">CAP.</label>
                    <input name="cap" id="cap" type="tel" className="form-control form-check" pattern="^\d{5}$" placeholder="#####"
                           title="Inserire 5 cifre da 00010 a 98168" size="5" maxLength="5"  defaultValue={props.dati.cap}
                           onChange={controlloCAP} required/>
                </div>
                <p id="feedback" className=" text-danger collapse" >Inserire il CAP corretto 00010 - 98168</p>
            </div>

            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={vaiAvanti}>Continua</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={vaiIndietro}>Indietro</button>
            </div>
        </form>
    );
}

export default FormStruttura;
