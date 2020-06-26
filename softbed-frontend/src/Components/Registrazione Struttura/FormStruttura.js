import React, { useState } from "react";
import ButtonForm from "../ButtonForm";
import data from "../../regioni_province_comuni.js";
import $ from 'jquery';

/* TODO sistemare cap*/

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }

            }, false);
        });
    }, false);
})();

function FormStruttura (props) {
   /* function onSubmit(e){
        e.preventDefault();
        const indirizzo = {
            via: document.getElementById("address").value,
            numero: document.getElementById("addressnum").value,
            cap: document.getElementById("cap").value ,
        }
        console.log(indirizzo);
        try{
            axios.post("/struttura", indirizzo);
        }
        catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }

    } */
    let province = null;
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
    function regioniEventHandle(event){
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
    function vaiAvanti(event){
    event.preventDefault();
    props.go();
        /* let cap=parseInt(document.getElementById(cap));
        console.log(cap);
          if(cap>=10 && cap<=98168){
              document.getElementById("feedback").classList.add("collapse");
              document.getElementById("cap").classList.remove("border-danger");

          }
          else{
              document.getElementById("cap").classList.add("border-danger");
              document.getElementById("feedback").classList.add("invalid");
              event.preventDefault();
          } */
   }

   function vaiIndietro(event){
            props.goBack();
    }
    if(props.currentStep != 2){
        return null;
    }
    return(
        <div className="container col-sm-10 col-md-6 mt-3 ">
            <div className="progress">
                <div className="progress-bar" style={{width: 40 + '%'}}>40%</div>
            </div>
            <form className="container pt-3 needs-validation" onChange={props.handleChange} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Come si chiama la tua struttura?</label>
                    <input id="name" name="name" type="text" className="form-control" maxLength="60" defaultValue={props.dati.name}  />
                    <div className="invalid-feedback">
                        Inserisci il nome della struttura
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                    </div>
                    <select id="region" className="custom-select" name="region" onChange={regioniEventHandle} defaultValue={props.dati.region} >
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
                    <div className="invalid-feedback">
                        Selezionare la regione
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Provincia&nbsp;</span>
                    </div>
                    <select id="state" name="state" className="custom-select" onChange={ provinceEventHandler} defaultValue={props.dati.state}>
                        <option value="" selected></option>
                    </select>
                    <div className="invalid-feedback">
                        Selezionare la provincia
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                    </div>
                    <select id="town" name="town" className="custom-select" defaultValue={props.dati.town}>
                        <option value=""  selected></option>
                    </select>
                    <div className="invalid-feedback">
                        Selezionare il comune
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-12 col-lg-6">
                        <label htmlFor="address">Via/Piazza</label>
                        <input name="address" id="address" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control"
                               maxLength="40" onBlur={addressEventHandler} onKeyDown={tabEventHandler} defaultValue={props.dati.address} required/>
                    </div>
                    <div className="col-5 col-md-4 col-lg-3">
                        <label htmlFor="addressnum">N.</label>
                        <input name="addressnum" id="addressnum" type="number" className="form-control " min="1" max="9999" size="4"
                               maxLength="4" defaultValue={props.dati.addressnum} required/>
                        <div className="invalid-feedback">
                            1 - 9999
                        </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-3">
                        <label htmlFor="cap">CAP.</label>
                        <input name="cap" id="cap" type="tel" className="form-control form-check " pattern="^\d{5}$" placeholder="#####"
                               title="Inserire 5 cifre da 00100 a 98168" size="5" maxLength="5"  defaultValue={props.dati.cap} required/>
                    </div>
                    <p id="feedback" className=" text-danger collapse" >Inserire il CAP corretto 00010 - 98168</p>
                </div>
                 <button id="indietro" className="btn btn-secondary mt-3 float-left btn-lg w-200px" onClick={vaiIndietro}>Indietro</button>
                <button id="ok" type="submit" className="btn btn-primary mt-3  float-right btn-lg w-200px" onClick={vaiAvanti}>Continua</button>
            </form>
        </div>
        );
    }
    export default FormStruttura
