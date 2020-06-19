import React from "react";
import data from "../regioni_province_comuni";
import $ from "jquery";
(function() {
    'use strict';
    window.addEventListener('load', function() {
// Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
// Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function FormDatiOspite(){
    let province = null;

    function regioniEventHandler(event){
        // rimozione dei precedenti elementi del menu provinca e comune
        document.getElementById("state").innerHTML='<option value="" selected></option>';
        document.getElementById("town").innerHTML='<option value="" selected></option>';
        if (event.target.value != '') {
            for (let regione of data.regioni) {
                if (regione.nome == event.target.value) {
                    province = regione.province;
                    break;
                }
            }
            for (let provincia of province) {
                let opt = document.createElement('option');
                opt.value = provincia.code;
                opt.innerText = provincia.nome;
                document.getElementById("state").appendChild(opt);
            }
        }
    }
    function provinceEventHandler(event){
        let comuni=null;
        // rimozione dei precedenti elementi del menu Comune
        document.getElementById("town").innerHTML='<option value="" selected></option>';
        if (event.target.value != '') {
            for (let provincia of province) {
                if (provincia.code == event.target.value) {
                    for (let comune of provincia.comuni) {
                        let opt=document.createElement('option');
                        opt.value=comune.code;
                        opt.innerText = comune.nome;
                        document.getElementById("town").appendChild(opt);
                    }
                    break; // non dobbiamo cercare oltre
                }
            }
        }
    }
    function addressEventHandler(event) {
        if (event.target.value != '') {
            $('.form-row input').not('#address').removeAttr('disabled');
            $('.form-row input').not('#address').attr('required', 'required');
        } else {
            $('.form-row input').not('#address').attr('disabled', 'disabled');
            $('.form-row input').not('#address').removeAttr('required');
        }
    }

    function tabEventHandler(event){
        if (event.keyCode == 9) { // pressione TAB
            if ($(this).val() != '') {
                $('.form-row input').not('#address').removeAttr('disabled');
                $('.form-row input').not('#address').attr('required', 'required');
            } else {
                $('.form-row input').not('#address').attr('disabled', 'disabled');
                $('.form-row input').not('#address').removeAttr('required');
            }
        }
    }
    return(
        <form className="container needs-validation pt-3 col-sm-10 col-md-6" noValidate>
            <h6 className="lead mt-3 text-uppercase ">Aggiungi un nuovo ospite</h6>
            <h6 className="mt-3 ">Inserisci i dati dell'ospite:</h6>
            <div className="form-row">
                <div className="form-group col-sm-12 col-md-5">
                    <label htmlFor="Name">Nome</label>
                    <input id="name" name="name" type="text" className="form-control" required/>
                </div>

                <div className="form-group col-sm-12 col-md-5">
                    <label htmlFor="Surname">Cognome</label>
                    <input id="surname" name="surname" type="text" className="form-control" required/>
                </div>

                <div className="form-group col-sm-12 col-md-2">
                    <div className="custom-control custom-radio custom-control-inline mt-4">
                        <input type="radio" className="custom-control-input" id="male" name="gender" value="male" required/>
                        <label className="custom-control-label" htmlFor="male">Uomo</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline mt-1">
                        <input type="radio" className="custom-control-input" id="female" name="gender" value="female" required/>
                        <label className="custom-control-label" htmlFor="female">Donna</label>
                    </div>
                </div>
                <div className="form-group col-sm-12 col-md-6">
                    <label htmlFor="birthdate">Data di Nascita</label>
                    <input name="birthdate" id="birthdate" type="date" className="form-control" required/>
                </div>

                <div className="form-group col-sm-12 col-md-6">
                    <label htmlFor="pass">Codice fiscale</label>
                    <input name="cf" id="cf" type="text" className="form-control"
                           pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" required/>
                    <div className="invalid-feedback">
                        Codice fiscale errato
                    </div>
                </div>

                <p>Nato a </p>
                <div className="input-group mb-3 col-sm-12">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                    </div>
                    <select id="region" className="custom-select" name="region" onChange={regioniEventHandler} required>
                        <option value="" selected></option>
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
                </div>

                <div className="input-group mb-3 col-sm-12">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Provincia&nbsp;</span>
                    </div>
                    <select id="state" name="state" className="custom-select" onChange={ provinceEventHandler} required>
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="input-group mb-3 col-sm-12">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                    </div>
                    <select id="town" name="town" className="custom-select" required>
                        <option value="" selected></option>
                    </select>
                </div>
            </div>

            <h6 className="mt-4 text-uppercase ">Indirizzo</h6>
            <div className="form-row">
                <div className="form-group col-sm-12 col-md-6">
                    <label htmlFor="address">Via/Piazza</label>
                    <input name="address" id="address" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control" onBlur={addressEventHandler} onKeyDown={tabEventHandler} required/>
                </div>

                <div className="form-group col-sm-4 col-md-3">
                    <label htmlFor="addressnum">N.</label>
                    <input name="addressnum" id="addressnum" type="number" className="form-control" min="1" max="9999" disabled required/>
                    <div className="invalid-feedback">
                        1 - 9999
                    </div>
                </div>

                <div className="form-group col-sm-8 col-md-3">
                    <label htmlFor="cap">CAP</label>
                    <input name="cap" id="cap" type="tel" className="form-control" pattern="^\d{5}$" placeholder="#####"
                           title="Inserire 5 cifre da 00100 a 98168" disabled required/>
                    <div className="invalid-feedback">
                        00010 - 98168
                    </div>
                </div>

                <div className=" form-group col-sm-12">
                    <label htmlFor="city">Località</label>
                    <input name="city" id="city" type="text" className="form-control" pattern="^(\s*\w+\.*\s*)+" disabled required/>
                    <div className="invalid-feedback">
                        Nome località
                    </div>
                </div>
            </div>

            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="esente"/>
                    <label className="form-check-label" htmlFor="esente">Esente da tasse</label>
            </div>

            <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3 float-left">Aggiungi documento</button>

            <br/><br/><br/><br/>
            <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3 float-right btn-lg w-200px">Aggiungi ospite</button>


        </form>

    )
}

export default FormDatiOspite;