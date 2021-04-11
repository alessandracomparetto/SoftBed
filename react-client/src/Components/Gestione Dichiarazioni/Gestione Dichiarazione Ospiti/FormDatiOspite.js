import React, {useState} from "react";
import data from "../../../regioni_province_comuni";
import $ from "jquery";
import FormDocumenti from "./FormDocumenti";
import {convertiData} from "../../../Actions/gestioneDate";


function FormDatiOspite(props){
    const [mostraContenuto, setMostraContenuto] = useState(false );
    const toggleContenuto = () => setMostraContenuto(true);
    const [flag, setFlag] = useState(0 );
    const [documenti, setDocumenti] = useState([]);

    // Gestione delle date
    const oggi = new Date(convertiData(new Date()));
    const minDataA = convertiData(oggi, -1);
    const maxDataA = convertiData(oggi);



    //onSubmit
    function aggiungiOspite(e) {
        e.preventDefault();
        var form = document.getElementById("form");
        form.classList.add('was-validated');


        if(form.checkValidity()){
            let nome = document.getElementById("nome").value;
            let cognome =document.getElementById("cognome").value;
            let codicefiscale =document.getElementById("cf").value;
            let datanascita = document.getElementById("datanascita").value;
            let regionenascita = document.getElementById("regionenascita").value;
            let provincianascita = document.getElementById("provincianascita");
            let comunenascita = document.getElementById("comunenascita");
            let regioneresidenza = document.getElementById("regioneresidenza").value;
            let provinciaresidenza = document.getElementById("provinciaresidenza");
            let comuneresidenza = document.getElementById("comuneresidenza");
            let via = document.getElementById("via").value;
            let numerocivico = document.getElementById("numero").value;
            let cap = document.getElementById("cap").value;
            let dataarrivo = document.getElementById("dataarrivo").value;
            let permanenza = document.getElementById("permanenza").value;
            let tassa = document.getElementById("tassa");

            let dato ={nome:nome, cognome:cognome, codicefiscale:codicefiscale, datanascita:datanascita, regionenascita:regionenascita,
            provincianascita:provincianascita.options[provincianascita.selectedIndex].text, comunenascita:comunenascita.options[comunenascita.selectedIndex].text,
            regioneresidenza: regioneresidenza, provinciaresidenza:provinciaresidenza.options[provinciaresidenza.selectedIndex].text,
            comuneresidenza: comuneresidenza.options[comuneresidenza.selectedIndex].text, via:via, numerocivico:numerocivico, cap:cap, dataarrivo:dataarrivo,
            permanenza:permanenza, tassa:tassa.options[tassa.selectedIndex].text, refcomuneresidenza: comuneresidenza.value,
            refcomunenascita: comunenascita.value, documenti: documenti};

            let tmp = [...props.listaOspiti];
            tmp.push(dato);
            props.setOspiti(tmp);

            form.classList.remove('was-validated');
            document.getElementById("nome").value="";
            document.getElementById("cognome").value="";
            document.getElementById("cf").value="";
            document.getElementById("datanascita").value="";
            document.getElementById("regionenascita").value="";
            document.getElementById("provincianascita").value="";
            document.getElementById("comunenascita").value="";
            document.getElementById("regioneresidenza").value="";
            document.getElementById("provinciaresidenza").value="";
            document.getElementById("comuneresidenza").value="";
            document.getElementById("via").value="";
            document.getElementById("numero").value="";
            document.getElementById("cap").value="";
            document.getElementById("dataarrivo").value="";
            document.getElementById("permanenza").value="";
            document.getElementById("tassa").value="";
            if(flag===0){
                setFlag(1);
            }else{
                setFlag(0);
            }

            setMostraContenuto(false);
        }
    }



    function handleFoto(fileName) {
        let temp = documenti;
        temp.push(fileName);
        setDocumenti(temp);
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
        if(event.target.id=== "regionenascita"){
            document.getElementById("provincianascita").innerHTML='<option value="" selected></option>';
            document.getElementById("comunenascita").innerHTML='<option value="" selected></option>';
        }
        else{
            document.getElementById("provinciaresidenza").innerHTML='<option value="" selected></option>';
            document.getElementById("comuneresidenza").innerHTML='<option value="" selected></option>';
        }

        if (event.target.value !== '') {
            for (let regione of data.regioni) {
                if (regione.nome === event.target.value) {
                    province = regione.province;
                    break;
                }
            }
            for (let provincia of province) {
                let opt = document.createElement('option');
                opt.value = provincia.code;
                opt.innerText = provincia.nome;
                if(event.target.id === "regionenascita"){
                    document.getElementById("provincianascita").appendChild(opt);
                }
                else{
                    document.getElementById("provinciaresidenza").appendChild(opt);
                }
            }
        }
    }
    function provinceEventHandler(event){
        // rimozione dei precedenti elementi del menu Comune
        // rimozione dei precedenti elementi del menu provinca e comune
        if(event.target.id=== "provincianascita"){
            document.getElementById("comunenascita").innerHTML='<option value="" selected></option>';
        }
        else{
            document.getElementById("comuneresidenza").innerHTML='<option value="" selected></option>';
        }


        if (event.target.value !== '') {
            for (let provincia of province) {
                if (provincia.code === event.target.value) {
                    for (let comune of provincia.comuni) {
                        let opt=document.createElement('option');
                        opt.value=comune.code;
                        opt.innerText = comune.nome;
                        if(event.target.id === "provincianascita"){
                            document.getElementById("comunenascita").appendChild(opt);
                        }
                        else{
                            document.getElementById("comuneresidenza").appendChild(opt);
                        }
                    }
                    break; // non dobbiamo cercare oltre
                }
            }
        }
    }

    const formRowInput = $('.form-row input').not('#via')

    function addressEventHandler(event) {

        if (event.target.value !== '') {
            formRowInput.removeAttr('disabled');
            formRowInput.attr('required', 'required');
        } else {
            formRowInput.attr('disabled', 'disabled');
            formRowInput.removeAttr('required');
        }
    }

    function tabEventHandler(event){
        if (event.keyCode === 9) { // pressione TAB
            if ($(this).val() !== '') {
                formRowInput.removeAttr('disabled');
                formRowInput.attr('required', 'required');
            } else {
                formRowInput.attr('disabled', 'disabled');
                formRowInput.removeAttr('required');
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
                    <input id="nome" name="nome" type="text" className="form-control" required/>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="cognome">Cognome</label>
                    <input id="cognome" name="cognome" type="text" className="form-control" required/>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="cf">Codice fiscale</label>
                    <input name="codicefiscale" id="cf" type="text" className="form-control"
                           pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" required/>
                    <div className="invalid-feedback">
                        Codice fiscale errato
                    </div>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="datanascita">Data di Nascita</label>
                    <input name="datanascita" id="datanascita" type="date" className="form-control" required/>
                </div>

                <div className="col-12 mb-2">Nato a</div>

                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                    </div>
                    <select id="regionenascita" className="custom-select" name="region" onChange={regioniEventHandler} required>
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
                    <select id="provincianascita" name="provincianascita" className="custom-select" onChange={ provinceEventHandler} required>
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                    </div>
                    <select id="comunenascita" name="refcomunenascita" className="custom-select" required>
                        <option value="" selected></option>
                    </select>
                </div>


                <div className="col-12 mb-2">Residente a</div>
                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                    </div>
                    <select id="regioneresidenza" className="custom-select" name="region" onChange={regioniEventHandler} required>
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
                    <select id="provinciaresidenza" name="provinciaresidenza" className="custom-select" onChange={ provinceEventHandler} required>
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="input-group mb-3 col-12 col-lg-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                    </div>
                    <select id="comuneresidenza" name="comuneresidenza" className="custom-select" required>
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="form-group col-12 col-md-5">
                    <label htmlFor="via">Via/Piazza</label>
                    <input name="via" id="via" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control" onBlur={addressEventHandler} onKeyDown={tabEventHandler} required/>
                </div>

                <div className="form-group col-4 col-md-3">
                    <label htmlFor="numero">N.</label>
                    <input name="numero" id="numero" type="number" className="form-control" min="1" max="9999" disabled required/>
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
                    <input name="dataarrivo" id="dataarrivo" type="date" className="form-control" min={minDataA} max={maxDataA} required/>
                </div>

                <div className="form-group col-6 col-md-3 col-lg-2">
                    <label htmlFor="permanenza">Permanenza</label>
                    <input name="permanenza" id="permanenza" type="number" className="form-control" min="1" max="28" maxLength="2" required/>
                </div>

                <div className="form-group col-12 col-md-4 col-lg-3">
                    <label htmlFor="tassa">Tassa di soggiorno</label>
                    <select id="tassa" name="tassa" className="custom-select" required>
                        <option value="" disabled selected></option>
                        <option value="bambino">Bambino</option>
                        <option value="adulto">Adulto</option>
                        <option value="esente">Esente</option>
                    </select>
                </div>

            </div>

            <button name="ok" id="ok" className={(mostraContenuto) ? "btn btn-warning mt-3 float-right" : "collapse btn btn-warning mt-3 float-right" } onClick={aggiungiOspite}>Aggiungi ospite</button>

                <button name="ok" id="ok" type="button" className="btn btn-warning mt-3 float-left" onClick={toggleContenuto}>Aggiungi documento</button>
                <br/><br/>

                <div className={(mostraContenuto) ? "" : "collapse"}>
                    <FormDocumenti flag={flag} handleFoto={handleFoto}/>
                </div>

        </form>


    )
}

export default FormDatiOspite;