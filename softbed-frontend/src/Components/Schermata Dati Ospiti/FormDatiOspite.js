import React, {useState} from "react";
import data from "../../regioni_province_comuni";
import $ from "jquery";
import FormDocumenti from "./FormDocumenti";
import {convertiData} from "../../Actions/gestioneDate";


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
        idComune: "",
        nomeComune:"",
        nomeProvincia: "",
        nomeRegione: "",
        refIndirizzo: "",
        idIndirizzo: "",
        via: "",
        numero: "",
        cap: "",
        refComuneResidenza:"",
        idComuneResidenza:"",
        nomeComuneResidenza:"",
        nomeProvinciaResidenza: "",
        nomeRegioneResidenza: "",
        refPrenotazione:"",
        esente:"",
        dataArrivo:"",
        permanenza:""
    });


    //onSubmit
    function onSubmit(e) {
        e.preventDefault();
        var form = document.getElementById("form");
        form.classList.add('was-validated');
/*
        let cap=parseInt(e.target.value);
        if(cap>=10 && cap<=98168){
            document.getElementById("feedback").classList.add("collapse");
            document.getElementById("cap").classList.remove("border-danger");
        }
        else{
            e.preventDefault();
            document.getElementById("cap").classList.add("border-danger");
            document.getElementById("feedback").classList.add("invalid");

        }*/


        if(form.checkValidity()){
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
        }
    }

    function setNome(event){
        let tmp = ospite;
        tmp.nome=event.target.value;
        setOspite(tmp);
    }

    function setCognome(event){
        let tmp = ospite;
        tmp.cognome=event.target.value;
        setOspite(tmp);
    }

    function setCf(event){
        let tmp = ospite;
        tmp.codiceFiscale=event.target.value;
        setOspite(tmp);
    }

    function setDataNascita(event){
        let tmp = ospite;
        tmp.dataNascita=event.target.value;
        setOspite(tmp);
    }

    function setComuneNascita(event){
        let tmp = ospite;
        tmp.nomeComune=event.target.value;
        setOspite(tmp);
    }

    function setVia(event){
        let tmp = ospite;
        tmp.via=event.target.value;
        setOspite(tmp);
    }

    function setNumero(event){
        let tmp = ospite;
        tmp.numero=event.target.value;
        setOspite(tmp);
    }

    function setCap(event){
        let tmp = ospite;
        tmp.cap=event.target.value;
        setOspite(tmp);
    }

    function setComuneNascita(event){
        let tmp = ospite;
        tmp.nomeComune=event.target.value;
        setOspite(tmp);
    }

    function setComuneResidenza(event){
        let tmp = ospite;
        tmp.nomeComuneResidenza=event.target.value;
        setOspite(tmp);
    }

    function setDataArrivo(event){
        let tmp = ospite;
        tmp.dataArrivo=event.target.value;
        setOspite(tmp);
    }
    function setPermanenza(event){
        let tmp = ospite;
        tmp.permanenza=event.target.value;
        setOspite(tmp);
    }

    function setEsente(){
        let tmp = ospite;
        if ($("#isEsente").is(":checked"))
            tmp.esente=true;
        else
            tmp.esente=false;
        setOspite(tmp);
        console.log(tmp);
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

        let comuni=null;
        // rimozione dei precedenti elementi del menu Comune
        // rimozione dei precedenti elementi del menu provinca e comune
        if(event.target.id=== "provinciaNascita"){
            let tmp = ospite;
            tmp.nomeProvincia=event.target.value;
            setOspite(tmp);
            document.getElementById("comuneNascita").innerHTML='<option value="" selected></option>';
        }
        else{
            let tmp = ospite;
            tmp.nomeProvinciaResidenza=event.target.value;
            setOspite(tmp);
            document.getElementById("comuneResidenza").innerHTML='<option value="" selected></option>';
        }


        if (event.target.value != '') {
            for (let provincia of province) {
                if (provincia.code == event.target.value) {
                    for (let comune of provincia.comuni) {
                        let opt=document.createElement('option');
                        opt.value=comune.nome;
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
        <form id="form" className="container pt-3 w-75" noValidate onSubmit={onSubmit}>
            <h6 className="lead mt-3 text-uppercase ">Aggiungi un nuovo ospite</h6>
            <h6 className="mt-3 ">Inserisci i dati dell'ospite:</h6>
            <div className="form-row">
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" name="nome" type="text" className="form-control" onChange={setNome} required/>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="cognome">Cognome</label>
                    <input id="cognome" name="cognome" type="text" className="form-control" onChange={setCognome} required/>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="cf">Codice fiscale</label>
                    <input name="cf" id="cf" type="text" className="form-control"
                           pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" onChange={setCf} required/>
                    <div className="invalid-feedback">
                        Codice fiscale errato
                    </div>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="dataNascita">Data di Nascita</label>
                    <input name="dataNascita" id="dataNascita" type="date" className="form-control" onChange={setDataNascita} required/>
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
                    <select id="comuneNascita" name="comuneNascita" className="custom-select" onChange={setComuneNascita} required>
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
                    <select id="comuneResidenza" name="comuneResidenza" className="custom-select" onChange={setComuneResidenza} required>
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="form-group col-12 col-md-6">
                    <label htmlFor="via">Via/Piazza</label>
                    <input name="via" id="via" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control" onBlur={addressEventHandler} onKeyDown={tabEventHandler} onChange={setVia} required/>
                </div>

                <div className="form-group col-4 col-md-3">
                    <label htmlFor="numero">N.</label>
                    <input name="numero" id="numero" type="number" className="form-control" min="1" max="9999" disabled onChange={setNumero} required/>
                    <div className="invalid-feedback r">
                        1 - 9999
                    </div>
                </div>

                <div className="form-group col-8 col-md-3">
                    <label htmlFor="cap">CAP</label>
                    <input name="cap" id="cap" type="tel" className="form-control form-check " pattern="^\d{5}$" placeholder="#####"
                           title="Inserire 5 cifre da 00100 a 98168" size="5" disabled onChange={setCap} required/>
                </div>
                <p id="feedback" className=" text-danger collapse" >Inserire il CAP corretto 00010 - 98168</p>

                <div className="form-group col-6 col-md-5 col-lg-3">
                    <label htmlFor="arrivo">Data di arrivo</label>
                    <input name="arrivo" id="arrivo" type="date" className="form-control" defaultValue={maxDataA} min={minDataA} max={maxDataA} onChange={setDataArrivo} required/>
                </div>

                <div className="form-group col-6 col-md-3 col-lg-2">
                    <label htmlFor="permanenza">Permanenza</label>
                    <input name="permanenza" id="permanenza" type="number" className="form-control" min="1" max="28" maxLength="2" defaultValue="1" onChange={setPermanenza} required/>
                </div>


                <div className="form-check mt-4 ml-2">
                    <input name="esente" id="isEsente" type="radio" className="form-check-input" onChange={setEsente} required/>
                    <label className="form-check-label" htmlFor="esente">Esente da tasse</label><br/>
                    <input name="esente" id="notEsente" type="radio" className="form-check-input" onChange={setEsente}/>
                    <label className="form-check-label" htmlFor="esente">Non esente da tasse</label>
                </div>
            </div>

            <button name="ok" id="ok" type="submit" className="btn btn-warning mt-3 float-right btn-lg w-200px">Aggiungi ospite</button>

                <button name="ok" id="ok" type="button" className="btn btn-warning mt-3 float-left" onClick={toggleContenuto}>Aggiungi documento</button>
                <br/><br/>

                <div className={(mostraContenuto) ? "" : "collapse"}>
                    <FormDocumenti/>
                </div>

        </form>


    )
}

export default FormDatiOspite;