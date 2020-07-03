import React, {useEffect, useState} from "react";
import data from "../../regioni_province_comuni.js";
import $ from "jquery";
import axios from "axios";
import SidebarUtente from "./SidebarUtente";

const crypto = require('crypto');


function FormDatiAggiuntivi(){
    const [utente,setUtente]=useState([]);

    useEffect(()=>{
       document.getElementById("regioneResidenza").value=utente.regioneResidenza;
        document.getElementById("regioneNascita").value=utente.regioneNascita;/*
        console.log(utente.provinciaNascita);
        console.log(utente.provinciaResidenza);
        document.getElementById("provinciaNascita").value=utente.provinciaNascita;
        document.getElementById("provinciaResidenza").value=utente.provinciaResidenza;
        console.log(utente.refComuneNascita);
        document.getElementById("comuneNascita").defaultValue=utente.refComuneNascita;
        document.getElementById("comuneResidenza").innerHTML=utente.comuneResidenza;*/
        regioniHandler("N");
        regioniHandler("R");

    });

    //recupero i dati dell'utente
    useEffect(() => {
        let sessionUtente = JSON.parse(window.sessionStorage.getItem("utente"));
        if(sessionUtente[0].refIndirizzo === null && sessionUtente[0].refComuneNascita === null){
            console.log(sessionUtente[0]);
            let tmp = sessionUtente[0];
            tmp.dataNascita = tmp.dataNascita.split("T")[0];
            setUtente(tmp);
        }else {
            axios
                .post("/utente/fetch", sessionUtente[0])
                .then(res => {
                    res.data.dataNascita = res.data.dataNascita.split("T")[0];
                    console.log("DATI RECUPERATI=======");
                    console.log(res.data);
                    setUtente(res.data);
                })
                .catch(err => console.log(err));
        }
    }, []);

    //modifico i dati dell'utente
    function modificaDatiAggiuntivi(event) {
        event.preventDefault();

        let form=document.getElementById("form");
        form.classList.add("was-validated");

        if(form.checkValidity()) {
            let pass = document.getElementById("pass").value;
            let passhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
            passhash.update(pass); // cifriamo la password
            let encpass = passhash.digest('hex'); // otteniamo la stringa esadecimale
            utente.password= encpass;
            try {
                console.log("DATI INVIATI======= ");
                console.log(utente);
                axios.post('/utente/modificaDatiAggiuntivi', utente)
                    .then(res => { // then print response status
                        console.log("DATI MODIFICATI======= ");
                        console.log(res.data);
                        window.sessionStorage.setItem("utente", JSON.stringify(res.data));
                    });
            } catch (e) {
                console.log(e);
            }
        }
    }

    let province = null;
    function regioniHandler(parameter){
        // rimozione dei precedenti elementi del menu provinca e comune
        if(parameter="N"){
            document.getElementById("provinciaNascita").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneNascita").innerHTML='<option value="" selected></option>';
            if(!($('#regioneNascita').val()) ){
                for (let regione of data.regioni) {
                    if (regione.nome == utente.regioneNascita) {
                        province = regione.province;
                        break;
                    }
                }
                for (let provincia of province) {
                    if(provincia.nome === utente.provinciaNascita){
                        $('#provinciaNascita').val = utente.provinciaNascita;
                        break;
                    }

                }
            }
        }
        else{
            document.getElementById("provinciaResidenza").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneResidenza").innerHTML='<option value="" selected></option>'
            if($('#regioneResidenza').val() != '') {
                for (let regione of data.regioni) {
                    if (regione.nome == utente.regioneResidenza) {
                        province = regione.province;
                        break;
                    }
                }
                for (let provincia of province) {
                    let opt = document.createElement('option');
                    opt.value = provincia.code;
                    opt.innerText = provincia.nome;
                    if (utente.provinciaResidenza) {
                        $('#provinciaResidenza').val = utente.provinciaResidenza;
                    }

                    document.getElementById("provinciaResidenza").appendChild(opt);

                }
            }
        }

    }
    function provinceEventHandler(event){
        // rimozione dei precedenti elementi del menu Comune
        // rimozione dei precedenti elementi del menu provinca e comune
        if(event.target.id === "provinciaNascita"){
            document.getElementById("comuneNascita").innerHTML='<option value="" selected></option>';
        }
        else{
            document.getElementById("comuneResidenza").innerHTML='<option value="" selected></option>';
        }


        if (event.target.value != '') {
            for (let provincia of province) {
                if (provincia.code == event.target.value) {
                    for (let comune of provincia.comuni) {
                        let opt=document.createElement('option');
                        opt.value=comune.code;
                        opt.innerText = comune.nome;
                        if(event.target.id === "provinciaNascita"){
                            document.getElementById("comuneNascita").appendChild(opt);
                        }
                        else{
                            document.getElementById("comuneResidenza").appendChild(opt);
                        }


                    }
                    break; // non dobbiamo cercare oltre
                }
            }

        }
    }

    function regioniEventHandler(event){
        // rimozione dei precedenti elementi del menu provinca e comune
        if(event.target.id=== "regioneNascita"){
            document.getElementById("provinciaNascita").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneNascita").innerHTML='<option value="" selected></option>';
        }
        else{
            document.getElementById("provinciaResidenza").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneResidenza").innerHTML='<option value="" selected></option>'
            let via = document.getElementById("address");
            let numeroCivico= document.getElementById("addressnum");
            let cap = document.getElementById("cap");
            via.setAttribute("required", "required");
            numeroCivico.setAttribute("required", "required");
            cap.setAttribute("required", "required");
        }

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

                if(event.target.id === "regioneNascita"){
                    document.getElementById("provinciaNascita").appendChild(opt);
                }
                else{
                    document.getElementById("provinciaResidenza").appendChild(opt);
                }
            }
        }
    }
    function provinceEventHandler(event){
        // rimozione dei precedenti elementi del menu Comune
        // rimozione dei precedenti elementi del menu provinca e comune
        if(event.target.id === "provinciaNascita"){
            document.getElementById("comuneNascita").innerHTML='<option value="" selected></option>';
        }
        else{
            document.getElementById("comuneResidenza").innerHTML='<option value="" selected></option>';
        }


        if (event.target.value != '') {
            for (let provincia of province) {
                if (provincia.code == event.target.value) {
                    for (let comune of provincia.comuni) {
                        let opt=document.createElement('option');
                        opt.value=comune.code;
                        opt.innerText = comune.nome;
                        if(event.target.id === "provinciaNascita"){
                            document.getElementById("comuneNascita").appendChild(opt);
                        }
                        else{
                            document.getElementById("comuneResidenza").appendChild(opt);
                        }


                    }
                    break; // non dobbiamo cercare oltre
                }
            }

        }
    }


    function addressEventHandler(event) {
        if (event.target.value != '') {
            $('.form-row input').not('#address').removeAttr('disabled');
        } else {
            $('.form-row input').not('#address').attr('disabled', 'disabled');
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

    function verificaPass(event) {
        const strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}");
        if (strongPass.test(event.target.value)) {
            document.getElementById("mdPass").classList.remove('text-warning');
            document.getElementById("mdPass").innerHTML="Password forte";
        }
        else{
            document.getElementById("mdPass").classList.add('text-warning');
            document.getElementById("mdPass").innerHTML="Password media";
        }
    }

    function confermaPass(event){
        const mdPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$");
        if(mdPass.test(event.target.value)) {
            if ($('#pass').val() === $('#repass').val()) {
                $('#message').html('Password coincidenti').css('color', 'green');
            } else
                $('#message').html('Password non coincidenti').css('color', 'red');
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


    function handleChange(event){
        const{name,value}=event.target;
        let tmp=utente;
        tmp[name]=value;
        setUtente(tmp);
    }
    return(
        <div className="d-block">
            <div className="row mx-auto">
                <SidebarUtente></SidebarUtente>
                <div className="container my-3 pr-5 col-12 col-md-9">
                <form id="form" className="container p-3" noValidate onSubmit={modificaDatiAggiuntivi} onChange={handleChange} >
                <h6 className="lead mt-3 text-uppercase ">Modifica i tuoi dati</h6>
                <h6 className="mt-4 text-uppercase ">Dati anagrafici</h6>
                <div className="form-row">
                    <div className="form-group col-12 col-md-6 col-lg-3">
                        <label htmlFor="Name">Nome</label>
                        <input id="name" name="nome" type="text" className="form-control" defaultValue={utente.nome} disabled/>
                    </div>

                    <div className="form-group col-12 col-md-6 col-lg-3">
                        <label htmlFor="Surname">Cognome</label>
                        <input id="surname" name="cognome" type="text" className="form-control" defaultValue={utente.cognome} disabled/>
                    </div>

                    <div className="form-group col-12 col-md-6 col-lg-3">
                        <label htmlFor="cf">Codice fiscale</label>
                        <input id="cf" name="codiceFiscale"  type="text" className="form-control"
                               pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" value={utente.codiceFiscale}/>
                        <div className="invalid-feedback">
                            Codice fiscale errato
                        </div>
                    </div>

                    <div className="form-group col-12 col-md-6 col-lg-3">
                        <label htmlFor="birthdate">Data di Nascita</label>
                        <input id="birthdate" name="dataNascita" type="date" className="form-control"  defaultValue={utente.dataNascita} disabled/>
                    </div>

                    <div className="col-12 mb-2">Nato a</div>

                    <div className="input-group mb-3 col-12 col-lg-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                        </div>
                        <select id="regioneNascita" className="custom-select" name="regioneNascita" defaultValue="" onChange={regioniEventHandler} >
                            <option value=""></option>
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

                    <div className="input-group mb-3 col-12 col-lg-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Provincia&nbsp;</span>
                        </div>
                        <select id="provinciaNascita" name="provinciaNascita" defaultValue="" className="custom-select" onChange={ provinceEventHandler} >
                            <option value="" ></option>
                        </select>
                    </div>

                    <div className="input-group mb-3 col-12 col-lg-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                        </div>
                        <select id="comuneNascita" name="refComuneNascita" defaultValue={utente.refComuneNascita} className="custom-select">
                            <option value="" ></option>
                        </select>
                    </div>


                    <div className="col-12 mb-2">Residente a</div>
                    <div className="input-group mb-3 col-12 col-lg-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                        </div>
                        <select id="regioneResidenza" className="custom-select" name="regioneResidenza" defaultValue="" onChange={regioniEventHandler}>
                            <option value="" ></option>
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

                    <div className="input-group mb-3 col-12 col-lg-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Provincia&nbsp;</span>
                        </div>
                        <select id="provinciaResidenza" name="provinciaResidenza" className="custom-select" defaultValue="" onChange={ provinceEventHandler}>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-group mb-3 col-12 col-lg-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                        </div>
                        <select id="comuneResidenza" name="refComuneResidenza" defaultValue="" className="custom-select">
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="form-group col-12 col-md-4">
                        <label htmlFor="address">Via/Piazza</label>
                        <input id="address" name="via" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control" onBlur={addressEventHandler} onKeyDown={tabEventHandler} defaultValue={utente.via}/>
                    </div>

                    <div className="form-group col-4 col-md-2">
                        <label htmlFor="addressnum">N.</label>
                        <input id="addressnum" name="numeroCivico" type="number" className="form-control" min="1" max="9999" disabled defaultValue={utente.numeroCivico} required/>
                        <div className="invalid-feedback r">
                            1 - 9999
                        </div>
                    </div>

                    <div className="form-group col-8 col-md-2">
                        <label htmlFor="cap">CAP</label>
                        <input id="cap" name="cap" type="tel" className="form-control form-check " pattern="^\d{5}$" placeholder="#####"
                               title="Inserire 5 cifre da 00100 a 98168" size="5"  disabled onSubmit={controlloCAP} defaultValue={utente.cap} required/>
                    </div>
                    <p id="feedback" className=" text-danger collapse" >Inserire il CAP corretto 00010 - 98168</p>

                    <div className="form-group col-12 col-md-4">
                        <label htmlFor="telefono">Telefono</label>
                        <input id="tel" name="telefono" type="tel" className="form-control" placeholder="(+/00)PPLLLNNNNNNN"
                               pattern="((((\+|00)[1-9]{2})|0)?([1-9]{2,3}))([0-9]{6,10})"
                               title="Inserire il numero di telefono nel formato (+|00)<pref. int.><pref. loc.><numero> oppure 0<pref. loc.><numero>" defaultValue={utente.telefono}/>
                        <div className="invalid-feedback">
                            ((+ / 00)(pref. int.) / 0)(pref. loc)(numero)
                        </div>
                    </div>
                </div>

                <h6 className="mt-4 text-uppercase ">Autenticazione</h6>
                <div className="form-row">
                    <div className="form-group col-12 col-md-4">
                        <label htmlFor="email">E-mail</label>
                        <input name="email" id="email" type="email" className="form-control" defaultValue={utente.email} required/>
                    </div>

                    <div className="form-group col-12 col-md-4">
                        <label htmlFor="pass">Password</label>
                        <input id="pass" name="password" type="password" className="form-control"
                               title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                               pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" onChange={verificaPass}/>
                        <div className="invalid-feedback">
                            Almeno 8 caratteri di cui uno maiuscolo e un numero
                        </div>
                        <div id="mdPass" className="valid-feedback text-warning">
                            Password media
                        </div>
                    </div>

                    <div className="form-group col-12 col-md-4" >
                        <label htmlFor="repass">Conferma password</label>
                        <input id="repass" name="repass" type="password" className="form-control"
                               size="32" maxLength="40" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" onKeyUp={confermaPass}/>
                        <div>
                            <span id="message"></span>
                        </div>
                    </div>

                </div>

                <h6 className={utente.gestore ? "collapse" : "mt-4 text-uppercase" }>DIVENTA UN GESTORE</h6>
                <div className={utente.gestore ? "collapse" : "form-group mt-3"}>
                    <div className="form-check form-check-inline" style={{ top: -8 +'px'}}>
                        <input className="form-check-input" type="radio" name="gestore" id="gestore"/>
                        <label className="form-check-label" htmlFor="gestore">Gestore</label>
                    </div>
                </div>

                <button name="ok" id="ok" className="col-12 col-md-3 btn btn-warning mt-3 mb-3 float-right" >Conferma</button>
            </form>
                </div>
            </div>
        </div>

    )
}

export default FormDatiAggiuntivi;