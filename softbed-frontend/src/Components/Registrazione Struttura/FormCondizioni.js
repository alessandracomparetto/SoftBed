import React, {useEffect} from "react";
import $ from "jquery";
import ButtonForm from "../ButtonForm";

function FormCondizioni(props){

    useEffect(()=>{
        console.log("ok");
    });

    function vaiAvanti(event) {
         event.preventDefault();
        document.getElementById("form").classList.add("was-validated");
        if(document.getElementById("pagamentoLoco").checked || document.getElementById("pagamentoOnline").checked){
            document.getElementById("feedback").classList.add("collapse");
            if (document.getElementById("form").checkValidity()) {
                props.go();
            }
        }
        else{
            document.getElementById("feedback").classList.remove("collapse");
            event.preventDefault();
        }
    }


    function  vaiIndietro() {
        props.goBack();
    }
  /*  function penaleCancellazioneHandler(event) {
        if (event.target.checked) {
            $('#preavvisoDisdetta').removeAttr('disabled').attr('required', 'required');
            $('#prezzoCancellazione').removeAttr('disabled').attr('required', 'required')
            $('#preavvisoTesto').removeClass('text-muted');
        }
    }
    function cancellazioneGratuitaHandler(event){
        if(event.target.checked){
            $('#preavvisoDisdetta').attr('disabled', 'disabled').removeAttr('required');
            $('#prezzoCancellazione').attr('disabled', 'disabled').removeAttr('required');
            $('#preavvisoTesto').addClass('text-muted');
        }
    }
    */ function verificaMinDurata(e){
        /* se la durata minima è maggiore della massima, imposta la massima uguale alla minima*/
        if(document.getElementById("maxSoggiorno").value!="" && (e.target.value)>document.getElementById("maxSoggiorno").value){
            document.getElementById("maxSoggiorno").value=e.target.value;
        }
    }
    function verificaMaxDurata(e){
        /* se la durata massima è minore della minima, imposta la minima uguale alla massima*/
        if(document.getElementById("minSoggiorno").value!="" && (e.target.value)<document.getElementById("minSoggiorno").value){
            document.getElementById("minSoggiorno").value=e.target.value;
        }
    }
    function verificaInizioCheckIn(e){
        if(document.getElementById("oraFineCheckIn").value!="" && (e.target.value)>document.getElementById("oraFineCheckIn").value){
            document.getElementById("oraFineCheckIn").value=e.target.value;
        }
    }
    function verificaFineCheckIn(e){
        if(document.getElementById("oraInizioCheckIn").value!="" && (e.target.value)<document.getElementById("oraInizioCheckIn").value){
            document.getElementById("oraInizioCheckIn").value=e.target.value;
        }
    }
    function verificaInizioCheckOut(e){
        if(document.getElementById("oraFineCheckOut").value!="" && (e.target.value)>document.getElementById("oraFineCheckOut").value){
            document.getElementById("oraFineCheckOut").value=e.target.value;
        }
    }
    function verificaFineCheckOut(e){
        if(document.getElementById("oraInizioCheckOut").value!="" && (e.target.value)<document.getElementById("oraInizioCheckOut").value){
            document.getElementById("oraInizioCheckOut").value=e.target.value;
        }
    }
    function verificaCheckBox(event){
        if(document.getElementById("pagamentoLoco").checked || document.getElementById("pagamentoOnline").checked){
            document.getElementById("feedback").classList.add("collapse");
        }
        else{
            document.getElementById("feedback").classList.remove("collapse");
            event.preventDefault();
        }
    }
    if(props.currentStep != 5){
        return null;
    }
    return(
        <div className="container col-sm-10">
            <div className="progress mt-2">
                <div className="progress-bar" style={{width: 80 + '%'}}>80%</div>
            </div>
            <form id="form" className="mt-3 needs-validation" noValidate onSubmit={verificaCheckBox} onChange={props.handleChange}>
                <div className="border p-3 text-center">
                    <h6 className="mt-3 border-bottom border-primary text-left">Durata del soggiorno</h6>
                    <div className="mb-3 form-check-inline mr-3">
                        <div className="input-group">
                            <label htmlFor="minSoggiorno" className="mt-3 mr-4 border-bottom border-primary">Minima</label>
                            <input name="minSoggiorno" id="minSoggiorno" type="number" className="form-control my-auto" min="1" max="15" size="2" maxLength="2" defaultValue={props.dati.minSoggiorno} onChange={verificaMinDurata}  required />
                            <div className="input-group-prepend">
                                <span className="input-group-text my-auto">giorni</span>
                            </div>
                            <span className="invalid-feedback small m-0 p-0">1 - 15</span>
                        </div>
                    </div>
                    <div className="mb-3 form-check-inline text-center">
                        <div className="input-group">
                            <label htmlFor="maxSoggiorno" className="mt-3 mr-3 border-bottom border-primary">Massima </label>
                            <input name="maxSoggiorno" id="maxSoggiorno" type="number" className="form-control my-auto" min="1" max="28" size="2" maxLength="2" defaultValue={props.dati.maxSoggiorno}  onChange={verificaMaxDurata} required  />
                            <div className="input-group-prepend">
                                <span className="input-group-text my-auto">giorni</span>
                            </div>
                            <span className="invalid-feedback small m-0 p-0">1 - 28</span>
                        </div>
                    </div>
                </div>
                <div className="border p-3 text-center">
                    <h6 className="mt-3 border-bottom border-primary text-left">Anticipo di prenotazione</h6>
                    <div className="form-check-inline">
                        <label htmlFor="minPrenotazione" className="mt-3 mr-4 border-bottom border-primary">Minimo </label>
                        <select id="minPrenotazione" className="custom-select mr-2" name="minPrenotazione" defaultValue={props.dati.minPrenotazione} style={{minWidth:160+'px'}} required>
                            <option value="" selected></option>
                            <option value="2">2 giorni</option>
                            <option value="3">3 giorni</option>
                            <option value="5">5 giorni</option>
                            <option value="7">1 settimana</option>
                            <option value="10">10 giorni</option>
                            <option value="14">2 settimane</option>
                        </select>
                    </div>
                    <div className="form-check-inline pl-md-0">
                        <label htmlFor="maxPrenotazione" className="mt-3 mr-3 border-bottom border-primary" >Massimo</label>
                        <select id="maxPrenotazione" className="custom-select" name="maxPrenotazione" defaultValue={props.dati.maxPrenotazione}  style={{minWidth:160+'px'}} required>
                            <option value="" selected></option>
                            <option value="14">2 settimane</option>
                            <option value="21">3 settimane</option>
                            <option value="30">1 mese</option>
                            <option value="60" >2 mesi</option>
                            <option value="90">3 mesi</option>
                            <option value="180">6 mesi</option>
                            <option value="365">1 anno</option>
                        </select>
                    </div>
                </div>
                <div className="border p-3 text-center">
                    <h6 className="mt-3 border-bottom border-primary text-left">Fascia oraria check-in e check-out</h6>
                    <div className="d-flex justify-content-around mb-3">
                        <div className="md-form md-outline ">
                            <label htmlFor="oraInizioCheckIn" className="border-bottom border-primary " >Inizio ora check-in</label>
                            <input type="time" id="oraInizioCheckIn" name="oraInizioCheckIn"className="form-control " placeholder="Select time" defaultValue={props.dati.oraInizioCheckIn}  min="06:00" max="15:00" onChange={verificaInizioCheckIn} required/>
                            <div className="invalid-feedback">06:00-15:00</div>
                        </div>

                        <div className="md-form md-outline">
                            <label htmlFor="oraFineCheckIn" className="border-bottom border-primary">Fine ora check-in</label>
                            <input type="time" id="oraFineCheckIn"  name="oraFineCheckIn"className="form-control " defaultValue={props.dati.oraFineCheckIn} min="09:00" max="20:00" placeholder="Select time" onChange={verificaFineCheckIn} required/>
                            <div className="invalid-feedback">09:00-20:00</div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-around mb-3 ">
                        <div className="md-form md-outline pl-1">
                            <label htmlFor="oraInizioCheckOut" className="border-bottom border-primary">Inizio ora check-out</label>
                            <input type="time" id="oraInizioCheckOut" name="oraInizioCheckOut" className="form-control" min="09:00" max="13:00" defaultValue={props.dati.oraInizioCheckOut} placeholder="Select time" onChange={verificaInizioCheckOut} required/>
                            <div className="invalid-feedback">09:00-13:00</div>
                        </div>

                        <div className="md-form md-outline pl-1">
                            <label htmlFor="oraFineCheckOut" className="border-bottom border-primary">Fine ora check-out</label>
                            <input type="time" id="oraFineCheckOut"  name="oraFineCheckOut" className="form-control" min="10:00" max="18:00" defaultValue={props.dati.oraFineCheckOut} placeholder="Select time" onChange={verificaFineCheckOut} required/>
                            <div className="invalid-feedback">10:00-18:00</div>
                        </div>

                    </div>
                </div>
                <div className="border p-3">
                    <h6 className="mt-3 border-bottom border-primary ">Modalità di pagamento</h6>
                    <div className= "form-row-group d-flex justify-content-around">
                        <div className="form-check-inline ">
                            <input type="checkbox" id="pagamentoOnline" name="pagamentoOnline" value="online" defaultChecked={props.dati.pagamentoOnline==="online"} required/>
                            <label htmlFor="online" className=" form-check-label pl-2" >Pagamento online</label>
                        </div>
                        <div className="form-check-inline ">
                            <input type="checkbox" id="pagamentoLoco" name="pagamentoLoco"  value="loco" defaultChecked={props.dati.pagamentoLoco==="loco"} required/>
                            <label htmlFor="loco" className=" form-check-label pl-2" >Pagamento in loco</label>
                        </div>
                    </div>
                    <p id="feedback" className=" text-danger collapse small" >Selezionare almeno una delle due checkbox</p>
                    <p className="mt-3 border-bottom border-primary">Politica di cancellazione</p>
                    <div className="form-check">
                        <div className="radio">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" id="cancellazioneGratuita" value="gratuita" name="politicaCancellazione" defaultChecked={props.dati.politicaCancellazione==="gratuita"} required/>
                                Cancellazione gratuita</label>
                        </div>
                        <div className="form-row">
                            <div className="radio">
                                <label htmlFor="penaleCancellazione" className="ml-1 mr-3">
                                    <input type="radio" className="form-check-input" id="penaleCancellazione" value="pagamento" name="politicaCancellazione" defaultChecked={props.dati.politicaCancellazione==="pagamento"} required/>
                                    Penale di cancellazione</label>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">€</span>
                                    </div>
                                    <input name="prezzoCancellazione" id="prezzoCancellazione" type="number" className="form-control currency mr-3" min="1" step="0.5" max="1000"  defaultValue={props.dati.prezzoCancellazione} required={((props.dati.politicaCancellazione==="pagamento")?"":"none")} style={{maxWidth: 100 + 'px'}} disabled="false"/>
                                    <div className="invalid-feedback">1€-1000€</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <label htmlFor="preavvisoDisdetta" className="pr-2 text-muted" id="preavvisoTesto" >Preavviso minimo disdetta</label>
                                    <select id="preavvisoDisdetta" className="custom-select " name="preavvisoDisdetta"  defaultValue={props.dati.preavvisoDisdetta} required={((props.dati.politicaCancellazione==="pagamento")?"":"none")} disabled={((props.dati.politicaCancellazione==="gratuita")?"true":"false")}>
                                        <option value=""></option>
                                        <option value="14">2 settimane</option>
                                        <option value="21">3 settimane</option>
                                        <option value="30">1 mese</option>
                                        <option value="60" >2 mesi</option>
                                        <option value="90">3 mesi</option>
                                        <option value="180">6 mesi</option>
                                        <option value="365">1 anno</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border pt-3">
                    <h5  id="turismo">Si compilano i campi in base alle normative <br></br> dell'ufficio del Turismo in cui si trova la struttura </h5>
                    <div className="form-row">
                        <div className="input-group col-12 col-md-6 d-flex justify-content-center mb-2">
                            <label htmlFor="prezzoBambini" className="pr-3">Prezzo base bambini</label>
                            <div className="input-group-prepend">
                                <span className="input-group-text">€</span>
                            </div>
                            <input name="prezzoBambini" id="prezzoBambini" type="number" className="form-control currency " defaultValue={props.dati.prezzoBambini} min="0" step="0.5" max="10" required style={{maxWidth: 100 + 'px'}} />
                            <div className="invalid-feedback text-center">1€-10€</div>
                        </div>
                        <div className="input-group col-12 col-md-6 d-flex justify-content-center mb-2">
                            <label htmlFor="prezzoAdulti" className="pr-4 mr-2">Prezzo base adulti</label>
                            <div className="input-group-prepend">
                                <span className="input-group-text">€</span>
                            </div>
                            <input name="prezzoAdulti" id="prezzoAdulti" type="number" className="form-control currency  " min="0" step="0.5" max="10" required style={{maxWidth: 100 + 'px'}} defaultValue={props.dati.prezzoAdulti}/>
                            <div className="invalid-feedback text-center">1€-10€</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="input-group d-flex justify-content-center">
                            <label htmlFor="nGiorniEsclusione " className="pr-1 pr-lg-3 pt-2">Esclusione per soggiorni superiori a</label>
                            <div className="input-group-prepend">
                                <span className="input-group-text">giorni</span>
                            </div>
                            <input name="nGiorniEsclusione" id="nGiorniEsclusione" type="number"  className="form-control" min="2" maxLength="2" defaultValue={props.dati.nGiorniEsclusione} required style={{maxWidth: 80 + 'px'}}/>
                        </div>
                    </div>

                    <div className="container d-flex justify-content-around pt-2 pb-3">
                        <div className="form-row">
                            <div  className=" col-sm-12 col-md-5 pt-3">
                                <div className="input-group ">
                                    <label htmlFor="percentualeCondizioni" className=" pr-1 pr-md-3">Riduzione del</label>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">%</span>
                                    </div>
                                    <input name="percentualeCondizioni" id="percentualeCondizioni" type="number" className="form-control currency  " min="0" step="0.1" max="100" defaultValue={props.dati.percentualeCondizioni} required style={{maxWidth: 100 + 'px'}} />
                                </div>
                            </div>

                            <div  className=" col-sm-12 col-md-8 col-lg-7 pt-3" >
                                <div className="input-group ">
                                    <label htmlFor="nPersone" className="pr-2">per prenotazioni superiori a n° persone</label>
                                    <input name="nPersone" id="nPersone" type="number" className="form-control currency  " min="1" step="1" max="100" required style={{maxWidth: 100 + 'px'}} defaultValue={props.dati.nPersone} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <button id="indietro" className="btn btn-secondary mt-3 float-left btn-lg w-200px" onClick={vaiIndietro}>Indietro</button>
            <button id="finish" type="submit" className="btn btn-primary mt-3  float-right btn-lg w-200px" onClick={vaiAvanti}>Continua</button>
        </div>
    )}
export default FormCondizioni;