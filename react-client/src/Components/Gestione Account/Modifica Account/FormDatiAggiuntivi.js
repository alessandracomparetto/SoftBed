import React, {useEffect, useState} from "react";
import reindirizza from "../../../Actions/reindirizzamento";
import mostraDialogErrore from "../../../Actions/errore";
import data from "../../../regioni_province_comuni.js";
import $ from "jquery";
import { convertiData} from "../../../Actions/gestioneDate";
import axios from "axios";
import SidebarUtente from "../SidebarUtente";
import {useHistory, useLocation} from "react-router-dom";


function FormDatiAggiuntivi(){
    const [utente,setUtente] = useState({});
    const history = useHistory();
    const location = useLocation();

    //recupero i dati dell'utente
    useEffect(() => {
        let sessioneUtente = JSON.parse(window.sessionStorage.getItem("utente"));
        if (!sessioneUtente) {
            reindirizza(history, {
                pathname: '/accedi',
                state: {
                    provenienza: 'Form Dati Aggiuntivi',
                    urlProvenienza: location.pathname
                }

            }, 3000, "Qualcosa è andato storto. Effettua nuovamente l'accesso");
        } else if (sessioneUtente.refindirizzo === null && sessioneUtente.refcomunenascita === null){
            let tmp = sessioneUtente;
            tmp.datanascita = convertiData(new Date(tmp.datanascita))
            setUtente(tmp);
        } else {
            axios
                .post("/user/fetch", sessioneUtente)
                .then(res => {
                    res.data.datanascita = convertiData(new Date(res.data.datanascita))
                    setUtente(res.data);
                }).catch(err => {
                    console.error(err)
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
        document.getElementById("regionenascita").value = utente.regionenascita;
        document.getElementById("regioneresidenza").value = utente.regioneresidenza;

        regioniEventHandler()

        document.getElementById("provincianascita").value = utente.provincianascita;
        document.getElementById("provinciaresidenza").value = utente.provinciaresidenza;

        provinceEventHandler()

        document.getElementById("comunenascita").value = utente.comunenascita;
        document.getElementById("comuneresidenza").value = utente.comuneresidenza;

    },[utente]);

    function handleGestore(event) { //Affinchè un utente sia un gestore tutti i campi del form devono essere compilati
        if(event.target.checked) {
            $("input").attr('required', true);
            $("select").attr('required', true);
        }
        else{
            $("input").removeAttr('required');
            $("select").removeAttr('required');
        }
    }

    function modificaDatiAggiuntivi(event) {
        event.preventDefault();
        let form = document.getElementById("form");
        form.classList.add("was-validated");

        if ($('#regioneresidenza') === '') {
            $(".necessarioResidenza").removeAttr('required');
            $("#address").attr('disabled', true);
        }

        if (form.checkValidity()) {
            let tmp = utente;
            tmp["datanascita"] = new Date(utente.datanascita).toISOString().slice(0,10);

            axios.post('/user/modificaDatiAggiuntivi', tmp)
                .then(() => {

                })
                .catch(err => {
                    console.error(err);
                    mostraDialogErrore();
                });
        }
    }

    let provinceNascita = [];
    let provinceResidenza = [];

    function regioniEventHandler(event = null) {
        const flagNascita = !event || (event && event.target.id === "regionenascita")
        const regionenascita = document.getElementById("regionenascita").value
        const provincianascita = document.getElementById("provincianascita")
        const comunenascita = document.getElementById("comunenascita")

        const flagResidenza = !event || (event && event.target.id === "regioneresidenza")
        const regioneresidenza = document.getElementById("regioneresidenza").value
        const provinciaresidenza = document.getElementById("provinciaresidenza")
        const comuneresidenza = document.getElementById("comuneresidenza")

        if (regioneresidenza) {
            $(".necessarioResidenza").attr('required', true);
            $("#address").removeAttr('disabled')
        } else {
            $("#address").attr('disabled', true)
            $(".necessarioResidenza").removeAttr('required', true);
        }

        if (flagNascita) {
            provincianascita.innerHTML='<option value="" selected></option>';
            comunenascita.innerHTML='<option value="" selected></option>';
        }

        if (flagResidenza) {
            provinciaresidenza.innerHTML='<option value="" selected></option>';
            comuneresidenza.innerHTML='<option value="" selected></option>';
        }

        if (regionenascita !== "" || regioneresidenza !== "") {
            let provinceNascitaFlag = !regionenascita
            let provinceResidenzaFlag =  !regioneresidenza

            for (let regione of data.regioni) {
                if (regione.nome === regionenascita) {
                    provinceNascita = regione.province
                    provinceNascitaFlag = true

                    for (let provincia of provinceNascita) {
                        let opt = document.createElement('option');
                        opt.value = provincia.nome;
                        opt.innerText = provincia.nome;

                        provincianascita.appendChild(opt)
                    }
                }

                if (regione.nome === regioneresidenza) {
                    provinceResidenza = regione.province
                    provinceResidenzaFlag = true

                    for (let provincia of provinceResidenza) {
                        let opt = document.createElement('option');
                        opt.value = provincia.nome;
                        opt.innerText = provincia.nome;

                        provinciaresidenza.appendChild(opt)
                    }
                }

                if (provinceNascitaFlag && provinceResidenzaFlag) {
                    break
                }
            }
        }
    }

    function provinceEventHandler(event = null) {
        const flagNascita = !event || (event && event.target.id === "provincianascita")
        const provincianascita = document.getElementById("provincianascita").value
        const comunenascita = document.getElementById("comunenascita")

        const flagResidenza = !event || (event && event.target.id === "provinciaresidenza")
        const provinciaresidenza = document.getElementById("provinciaresidenza").value
        const comuneresidenza = document.getElementById("comuneresidenza")

        if (flagNascita) {
            comunenascita.innerHTML='<option value="" selected></option>';
        }

        if (flagResidenza) {
            comuneresidenza.innerHTML='<option value="" selected></option>';
        }

        if (provincianascita !== "" || provinciaresidenza !== "") {

            for (let provincia of provinceNascita) {
                if (provincia.nome === provincianascita) {
                    let comuniNascita = provincia.comuni

                    for (let comune of comuniNascita) {
                        let opt = document.createElement('option');
                        opt.value = comune.nome;
                        opt.innerText = comune.nome;

                        comunenascita.appendChild(opt)
                    }

                    break;
                }
            }

            for (let provincia of provinceResidenza) {
                if (provincia.nome === provinciaresidenza) {
                    let comuniResidenza = provincia.comuni

                    for (let comune of comuniResidenza) {
                        let opt = document.createElement('option');
                        opt.value = comune.nome;
                        opt.innerText = comune.nome;

                        comuneresidenza.appendChild(opt)
                    }

                    break;
                }
            }
        }
    }

    function addressEventHandler(event = null) {
        const indirizzo = document.getElementById("address")
        const flag = (event && event.target.value) || (!event && indirizzo.value)

        if (flag) {
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
        if (event.keyCode === 9) { // pressione TAB
            if ($(this).val() !== '') {
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
                                <input id="cf" name="codicefiscale"  type="text" className="form-control"
                                       pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" defaultValue={utente.codicefiscale} required={utente.gestore === true}/>
                                <div className="invalid-feedback">
                                    Codice fiscale errato
                                </div>
                            </div>

                            <div className="form-group col-12 col-md-6 col-lg-3">
                                <label htmlFor="birthdate">Data di Nascita</label>
                                <input id="birthdate" name="datanascita" type="date" className="form-control"  defaultValue={utente.datanascita} min={convertiData(new Date(), 0,0,-100)} max={convertiData(new Date(), 0,0,-18)}/>
                                <div className="invalid-feedback r">Data di nascita non valida</div>
                            </div>

                            <div className="col-12 mb-2">Nato a</div>
                            <div className="input-group mb-3 col-12 col-lg-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                                </div>
                                <select id="regionenascita" className="custom-select" name="regionenascita" defaultValue="" onChange={regioniEventHandler} >
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
                                <select id="provincianascita" name="provincianascita" defaultValue="" className="custom-select" onChange={provinceEventHandler} >
                                    <option value="" ></option>
                                </select>
                            </div>
                            <div className="input-group mb-3 col-12 col-lg-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                                </div>
                                <select id="comunenascita" name="refcomunenascita" defaultValue={utente.refcomunenascita} className="custom-select">
                                    <option value="" ></option>
                                </select>
                            </div>

                            <div className="col-12 mb-2">Residente a</div>
                            <div className="input-group mb-3 col-12 col-lg-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                                </div>
                                <select id="regioneresidenza" className="custom-select necessarioResidenza" name="regioneresidenza" defaultValue="" onChange={regioniEventHandler}>
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
                                <select id="provinciaresidenza" name="provinciaresidenza" className="custom-select necessarioResidenza" defaultValue="" onChange={provinceEventHandler}>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div className="input-group mb-3 col-12 col-lg-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                                </div>
                                <select id="comuneresidenza" name="refcomuneresidenza" defaultValue="" className="custom-select necessarioResidenza">
                                    <option value=""></option>
                                </select>
                            </div>

                            <div className="form-group col-12 col-md-4">
                                <label htmlFor="address">Via/Piazza</label>
                                <input id="address" disabled name="via" className=" form-control necessarioResidenza" type="text" pattern="^[a-zA-Z]+((\s)?[a-zA-Z]?['àèéìòù]?)*$" onBlur={addressEventHandler} onKeyDown={tabEventHandler} onChange={addressEventHandler}  defaultValue={utente.via}/>
                            </div>

                            <div className="form-group col-4 col-md-2">
                                <label htmlFor="addressnum">N.</label>
                                <input id="addressnum" name="numerocivico" type="number" className="form-control necessarioResidenza" min="1" max="9999"  defaultValue={utente.numerocivico} disabled/>
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
                                <div className="invalid-feedback">Numero non valido</div>
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
