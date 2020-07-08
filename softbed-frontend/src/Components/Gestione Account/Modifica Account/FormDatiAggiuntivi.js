import React, {useEffect, useState} from "react";
import reindirizza from "../../../Actions/reindirizzamento";
import mostraDialogErrore from "../../../Actions/errore";
import data from "../../../regioni_province_comuni.js";
import $ from "jquery";
import { convertiData} from "../../../Actions/gestioneDate";
import axios from "axios";
import SidebarUtente from "../SidebarUtente";
import {useHistory, useLocation} from "react-router-dom";

const crypto = require('crypto');


function FormDatiAggiuntivi(){
    const [utente,setUtente]=useState({});
    const history = useHistory();
    const location = useLocation();

    //recupero i dati dell'utente
    useEffect(() => {
        let sessionUtente = JSON.parse(window.sessionStorage.getItem("utente"));
        if(!sessionUtente) {
            reindirizza(history, {
                pathname: '/accedi',
                state: {
                    provenienza: 'Form Dati Aggiuntivi',
                    urlProvenienza: location.pathname
                }

            }, 3000, "Qualcosa è andato storto. Effettua nuovamente l'accesso");
        }else if(sessionUtente.refIndirizzo === null && sessionUtente.refComuneNascita === null){
            let tmp = sessionUtente;
            tmp.dataNascita = tmp.dataNascita.split("T")[0];
            setUtente(tmp);
        }else {
            axios
                .post("/utente/fetch", sessionUtente)
                .then(res => {
                    res.data.dataNascita = res.data.dataNascita.split("T")[0];
                    setUtente(res.data);
                }).catch(err =>{
                    if(err.response.status === 401){
                        reindirizza(history, {
                            pathname: '/accedi',
                            state: {
                                provenienza: "Form Dati Aggiuntivi 2",
                                urlProvenienza: location.pathname
                            }

                        }, 3000, "Devi effettuare nuovamente l'accesso per accedere ai tuoi dati");
                    }else{
                        mostraDialogErrore();
                    }
            });
        }
    }, []);

    useEffect(()=>{
        document.getElementById("regioneResidenza").value=utente.regioneResidenza;
        document.getElementById("regioneNascita").value=utente.regioneNascita;
    },[utente]);

    function handleGestore(event){ //Affinchè un utente sia un gestore tutti i campi del form devono essere compilati
        if(event.target.checked) {
            $("input").attr('required', true);
            $("select").attr('required', true);
        }
        else{
            $("input").removeAttr('required');
            $("select").removeAttr('required');
        }
    }

    //modifico i dati dell'utente
    function modificaDatiAggiuntivi(event) {
        event.preventDefault();
        let form=document.getElementById("form");
        form.classList.add("was-validated");
        if($('#regioneResidenza') ==''){
            $(".necessarioResidenza").removeAttr('required');
            $("#address").attr('disabled', true);
        }
        if(form.checkValidity()) {
            let tmp = utente;
            tmp["dataNascita"]=new Date(utente.dataNascita).toISOString().slice(0,10);
            try {
                axios.post('/utente/modificaDatiAggiuntivi', tmp)
                    .then(res => { // then print response status
                        window.sessionStorage.setItem("utente", JSON.stringify(res.data));
                        setUtente(res.data);
                        if ($("#gestore")[0].checked){
                            window.location.href = "/registrazioneStruttura";
                        }}
                    ).catch(err=> console.log(err));
            } catch (e) {
                console.log(e);
            }
        }
    }
    let province = null;

    function regioniEventHandler(event){
        if(event.target.value != '' && event.target.id=== "regioneResidenza"){
            $(".necessarioResidenza").attr('required', true);
            $("#address").removeAttr('disabled');
        }
        else{
            $(".necessarioResidenza").removeAttr('required', true);
        }
        // rimozione dei precedenti elementi del menu provinca e comune
        if(event.target.id=== "regioneNascita"){
            document.getElementById("provinciaNascita").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneNascita").innerHTML='<option value="" selected></option>';
        }
        else{
            document.getElementById("provinciaResidenza").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneResidenza").innerHTML='<option value="" selected></option>'
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
            document.getElementById("addressnum").removeAttribute('disabled');
            document.getElementById("cap").removeAttribute('disabled');
        } else {
            document.getElementById("addressnum").setAttribute('disabled','');
            document.getElementById("cap").setAttribute('disabled','');
            document.getElementById("cap").value="";
            document.getElementById("addressnum").value="";
        }
    }

    function tabEventHandler(event){
        if (event.keyCode == 9) { // pressione TAB
            if ($(this).val() != '') {
                document.getElementById("addressnum").removeAttribute('disabled');
                document.getElementById("cap").removeAttribute('disabled');
            } else {
                document.getElementById("addressnum").setAttribute('disabled','');
                document.getElementById("cap").setAttribute('disabled','');
                document.getElementById("cap").value="";
                document.getElementById("addressnum").value="";
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

    function handleChange(event){
        const{name,value}=event.target;
        let tmp=utente;
        if(event.target.type === "checkbox"){
            if(event.target.checked === true){
                tmp[name]=1;
            }
            if(event.target.checked ===false){
                tmp[name]=0;
            }
        }else{
            tmp[name]=value;
        }
        setUtente(tmp);
    }

    return(
        <div className="d-block">
            <div className="row mx-auto">
                <SidebarUtente/>
                <div className="container my-3 pr-5 col-12 col-md-9">
                <form id="form" className="container p-3" noValidate onSubmit={modificaDatiAggiuntivi} onChange={handleChange}>
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
                           pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" value={utente.codiceFiscale} required={utente.gestore ===1}/>
                    <div className="invalid-feedback">
                        Codice fiscale errato
                    </div>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="birthdate">Data di Nascita</label>
                    <input id="birthdate" name="dataNascita" type="date" className="form-control"  defaultValue={utente.dataNascita} min={convertiData(new Date(), 0,0,-100)} max={convertiData(new Date(), 0,0,-18)}/>
                    <div className="invalid-feedback r">Data di nascita non valida</div>
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
                    <select id="regioneResidenza" className="custom-select necessarioResidenza" name="regioneResidenza" defaultValue="" onChange={regioniEventHandler}>
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
                    <select id="provinciaResidenza" name="provinciaResidenza" className="custom-select necessarioResidenza" defaultValue="" onChange={ provinceEventHandler}>
                        <option value=""></option>
                    </select>
                </div>
                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                    </div>
                    <select id="comuneResidenza" name="refComuneResidenza" defaultValue="" className="custom-select necessarioResidenza">
                        <option value=""></option>
                    </select>
                </div>

                <div className="form-group col-12 col-md-4">
                    <label htmlFor="address">Via/Piazza</label>
                    <input id="address" disabled name="via" className=" form-control necessarioResidenza" type="text" pattern="^[a-zA-Z]+((\s)?[a-zA-Z]?['àèéìòù]?)*$" onBlur={addressEventHandler} onKeyDown={tabEventHandler} onChange={addressEventHandler}  defaultValue={utente.via}/>
                </div>

                <div className="form-group col-4 col-md-2">
                    <label htmlFor="addressnum">N.</label>
                    <input id="addressnum" name="numeroCivico" type="number" className="form-control necessarioResidenza" min="1" max="9999"  defaultValue={utente.numeroCivico} disabled/>
                    <div className="invalid-feedback r">
                        1 - 9999
                    </div>
                </div>

                <div className="form-group col-8 col-md-2">
                    <label htmlFor="cap">CAP</label>
                    <input id="cap" name="cap" type="tel" className="form-control form-check necessarioResidenza" pattern="^\d{5}$" placeholder="#####"
                           title="Inserire 5 cifre da 00100 a 98168" size="5" onSubmit={controlloCAP} defaultValue={utente.cap} disabled />
                </div>
                <p id="feedback" className=" text-danger collapse" >Inserire il CAP corretto 00010 - 98168</p>

                <div className="form-group col-12 col-md-4">
                    <label htmlFor="telefono">Telefono</label>
                    <input id="tel" name="telefono" type="tel" className="form-control" pattern="^(((\+|00)[1-9]{2}))?([0-9]{10})$"
                           title="Inserire il numero di telefono nel formato (+|00)<pref. int.><pref. loc.><numero> oppure 0<pref. loc.><numero>" defaultValue={utente.telefono}/>
                    <div className="invalid-feedback">
                        Numero non valido
                    </div>
                </div>
            </div>

            <h6 className={utente.gestore ? "collapse" : "mt-4 text-uppercase" }>DIVENTA UN GESTORE</h6>
            <div className={utente.gestore ? "collapse" : "form-group mt-3"}>
                <div className="form-check form-check-inline" style={{ top: -8 +'px'}}>
                    <input className="form-check-input" type="checkbox" name="gestore" id="gestore" value={1} onClick={handleGestore}/>
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
