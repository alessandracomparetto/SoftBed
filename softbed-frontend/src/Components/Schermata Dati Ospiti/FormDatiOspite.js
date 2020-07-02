import React, {useState} from "react";
import data from "../../regioni_province_comuni";
import $ from "jquery";
import FormDocumenti from "./FormDocumenti";
import {convertiData} from "../../Actions/gestioneDate";
import axios from "axios";

//TODO RIPULIRE IL FORM DOCUMENTI AL SUBMIT
function FormDatiOspite(props){
    const [mostraContenuto, setMostraContenuto] = useState(false );
    const toggleContenuto = () => setMostraContenuto(true);

    // Gestione delle date
    const oggi = new Date(convertiData(new Date()));
    const minDataA = convertiData(oggi, -1);
    const maxDataA = convertiData(oggi);

    const[ospite, setOspite] = useState({
        nome: "",
        cognome: "",
        codiceFiscale: "",
        dataNascita: "",
        refComuneNascita: "",
        comuneNascita:"",
        provinciaNascita: "",
        refIndirizzo: "",
        via: "",
        numero: "",
        cap: "",
        refComuneResidenza:"",
        comuneResidenza:"",
        provinciaResidenza:"",
        refPrenotazione:"",
        tassa:"",
        dataArrivo:"",
        permanenza:""
    });


    //onSubmit
    function onSubmit(e) {
        e.preventDefault();
        var form = document.getElementById("form");
        form.classList.add('was-validated');


        if(form.checkValidity()){
            //TODO: CAMBIARE REF PRENOTAZIONE
            ospite.refPrenotazione=1;
            props.aggiungiOspite(ospite);

            form.classList.remove('was-validated');
            document.getElementById("nome").value="";
            document.getElementById("cognome").value="";
            document.getElementById("cf").value="";
            document.getElementById("dataNascita").value="";
            document.getElementById("regioneNascita").value="";
            document.getElementById("provinciaNascita").value="";
            document.getElementById("comuneNascita").value="";
            document.getElementById("regioneResidenza").value="";
            document.getElementById("provinciaResidenza").value="";
            document.getElementById("comuneResidenza").value="";
            document.getElementById("via").value="";
            document.getElementById("numero").value="";
            document.getElementById("cap").value="";
            document.getElementById("arrivo").value="";
            document.getElementById("permanenza").value="";
            setMostraContenuto(false);
        }
    }

    function handleChange(event){
        const{name,value}=event.target;
        let tmp=ospite;
        tmp[name]=value;
        setOspite(tmp);
    }

    function handleComuneNascita(event){
        const{name,value}=event.target;
        let tmp=ospite;
        tmp[name]=value;
        tmp["comuneNascita"] = event.target.options[event.target.selectedIndex].text;
        setOspite(tmp);
    }

    function handleComuneResidenza(event){
        const{name,value}=event.target;
        let tmp=ospite;
        tmp[name]=value;
        tmp["comuneResidenza"] = event.target.options[event.target.selectedIndex].text;
        setOspite(tmp);
    }

    function handleFoto(fileName) {
        let tmp = ospite;
        if(!tmp["documenti"]){
            tmp["documenti"]=[];
        }
        let temp = tmp["documenti"];
        temp.push(fileName);
        tmp["documenti"]=temp;
        setOspite(tmp);
    }



    function controlloCAP(e) {
        const form = $("#form");
        const cap = $("#cap");
        const capVal = cap.val();

        if (capVal >= 10 && capVal <= 98168) {
            if (form.hasClass("was-validated")) {
                cap.removeClass("border-danger");
                cap.removeClass("is-invalid");
            }
            let tmp=ospite;
            tmp.cap=e.target.value;
            setOspite(tmp);
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

    let province = null;

    function regioniEventHandler(event){
        // rimozione dei precedenti elementi del menu provinca e comune
        if(event.target.id=== "regioneNascita"){
            document.getElementById("provinciaNascita").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneNascita").innerHTML='<option value="" selected></option>';
        }
        else{
            document.getElementById("provinciaResidenza").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneResidenza").innerHTML='<option value="" selected></option>';
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
        if(event.target.id=== "provinciaNascita"){
            let tmp = ospite;
            tmp.provinciaNascita=event.target.options[event.target.selectedIndex].text;;
            setOspite(tmp);
            document.getElementById("comuneNascita").innerHTML='<option value="" selected></option>';
        }
        else{
            let tmp = ospite;
            tmp.provinciaResidenza=event.target.options[event.target.selectedIndex].text;;
            setOspite(tmp);
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
            $('.form-row input').not('#via').removeAttr('disabled');
            $('.form-row input').not('#via').attr('required', 'required');
        } else {
            $('.form-row input').not('#via').attr('disabled', 'disabled');
            $('.form-row input').not('#via').removeAttr('required');
        }
    }

    function tabEventHandler(event){
        if (event.keyCode == 9) { // pressione TAB
            if ($(this).val() != '') {
                $('.form-row input').not('#via').removeAttr('disabled');
                $('.form-row input').not('#via').attr('required', 'required');
            } else {
                $('.form-row input').not('#via').attr('disabled', 'disabled');
                $('.form-row input').not('#via').removeAttr('required');
            }
        }
    }



    return(
        <form id="form" className="container p-3 w-75" noValidate >
            <h6 className="lead mt-3 text-uppercase ">Aggiungi un nuovo ospite</h6>
            <h6 className="mt-3 ">Inserisci i dati dell'ospite:</h6>
            <div className="form-row">
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" name="nome" type="text" className="form-control" onChange={handleChange} required/>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="cognome">Cognome</label>
                    <input id="cognome" name="cognome" type="text" className="form-control" onChange={handleChange} required/>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="cf">Codice fiscale</label>
                    <input name="codiceFiscale" id="cf" type="text" className="form-control"
                           pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" onChange={handleChange} required/>
                    <div className="invalid-feedback">
                        Codice fiscale errato
                    </div>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="dataNascita">Data di Nascita</label>
                    <input name="dataNascita" id="dataNascita" type="date" className="form-control" onChange={handleChange} required/>
                </div>

                <div className="col-12 mb-2">Nato a</div>

                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                    </div>
                    <select id="regioneNascita" className="custom-select" name="region" onChange={regioniEventHandler} required>
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

                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Provincia&nbsp;</span>
                    </div>
                    <select id="provinciaNascita" name="provinciaNascita" className="custom-select" onChange={ provinceEventHandler} required>
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                    </div>
                    <select id="comuneNascita" name="refComuneNascita" className="custom-select" onChange={handleComuneNascita} required>
                        <option value="" selected></option>
                    </select>
                </div>


                <div className="col-12 mb-2">Residente a</div>
                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                    </div>
                    <select id="regioneResidenza" className="custom-select" name="region" onChange={regioniEventHandler} required>
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

                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Provincia&nbsp;</span>
                    </div>
                    <select id="provinciaResidenza" name="provinciaResidenza" className="custom-select" onChange={ provinceEventHandler} required>
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                    </div>
                    <select id="comuneResidenza" name="refComuneResidenza" className="custom-select" onChange={handleComuneResidenza} required>
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="form-group col-12 col-md-5">
                    <label htmlFor="via">Via/Piazza</label>
                    <input name="via" id="via" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control" onBlur={addressEventHandler} onKeyDown={tabEventHandler} onChange={handleChange} required/>
                </div>

                <div className="form-group col-4 col-md-3">
                    <label htmlFor="numero">N.</label>
                    <input name="numero" id="numero" type="number" className="form-control" min="1" max="9999" disabled onChange={handleChange} required/>
                    <div className="invalid-feedback r">
                        1 - 9999
                    </div>
                </div>

                <div className="form-group col-8 col-md-4">
                    <label htmlFor="cap">CAP</label>
                    <input name="cap" id="cap" type="tel" className="form-control form-check " pattern="^\d{5}$" placeholder="#####"
                           title="Inserire 5 cifre da 00100 a 98168" size="5" disabled onChange={controlloCAP} required/>
                </div>
                <p id="feedback" className=" text-danger collapse" >Inserire il CAP corretto 00010 - 98168</p>

                <div className="form-group col-6 col-md-5 col-lg-3">
                    <label htmlFor="arrivo">Data di arrivo</label>
                    <input name="dataArrivo" id="arrivo" type="date" className="form-control" min={minDataA} max={maxDataA} onChange={handleChange} required/>
                </div>

                <div className="form-group col-6 col-md-3 col-lg-2">
                    <label htmlFor="permanenza">Permanenza</label>
                    <input name="permanenza" id="permanenza" type="number" className="form-control" min="1" max="28" maxLength="2" onChange={handleChange} required/>
                </div>

                <div className="form-group col-12 col-md-4 col-lg-3">
                    <label htmlFor="tassa">Tassa di soggiorno</label>
                    <select id="tassa" name="tassa" className="custom-select" onChange={handleChange} required>
                        <option value="" disabled selected></option>
                        <option value="bambino">Bambino</option>
                        <option value="adulto">Adulto</option>
                        <option value="esente">Esente</option>
                    </select>
                </div>

            </div>

            <button name="ok" id="ok" type="submit" className={(mostraContenuto) ? "btn btn-warning mt-3 float-right" : "collapse btn btn-warning mt-3 float-right btn-lg w-200px" } onClick={onSubmit}>Aggiungi ospite</button>

                <button name="ok" id="ok" type="button" className="btn btn-warning mt-3 float-left" onClick={toggleContenuto}>Aggiungi documento</button>
                <br/><br/>

                <div className={(mostraContenuto) ? "" : "collapse"}>
                    <FormDocumenti handleFoto={handleFoto}/>
                </div>

        </form>


    )
}

export default FormDatiOspite;