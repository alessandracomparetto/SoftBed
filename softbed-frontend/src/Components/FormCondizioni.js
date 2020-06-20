import React from "react";
import $ from "jquery";
import ButtonForm from "./ButtonForm";
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
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
function FormCondizioni(){
    function penaleCancellazioneHandler(event) {
        if (event.target.checked) {
            $('#preavvisoDisdetta').removeAttr('disabled');
            $('#preavvisoDisdetta').attr('required', 'required');
            $('#prezzoCancellazione').removeAttr('disabled');
            $('#prezzoCancellazione').attr('required', 'required')
        }
    }
    function cancellazioneGratuitaHandler(event){
        if(event.target.checked){
            $('#preavvisoDisdetta').attr('disabled', 'disabled');
            $('#preavvisoDisdetta').removeAttr('required');
            $('#prezzoCancellazione').attr('disabled', 'disabled');
            $('#prezzoCancellazione').removeAttr('required');
        }
    }
    /* se la durata minima è maggiore della massima, imposta la massima uguale alla minima*/
    function verificaMinDurata(e){
        if((e.target.value)>document.getElementById("maxSoggiorno").value){
        document.getElementById("maxSoggiorno").value=e.target.value;
        }
    }
    function verificaMaxDurata(e){
        /* se la durata massima è minore della minima, imposta la minima uguale alla massima*/
        if((e.target.value)<document.getElementById("minSoggiorno").value){
            document.getElementById("minSoggiorno").value=e.target.value;
        }
    }
    function verificaInizioCheckIn(e){
        if((e.target.value)>document.getElementById("oraFineCheckIn").value){
            document.getElementById("oraFineCheckIn").value=e.target.value;
        }
    }
    function verificaFineCheckIn(e){
        if((e.target.value)<document.getElementById("oraInizioCheckIn").value){
            document.getElementById("oraInizioCheckIn").value=e.target.value;
        }
    }
    function verificaInizioCheckOut(e){
        if((e.target.value)>document.getElementById("oraFineCheckOut").value){
            document.getElementById("oraFineCheckOut").value=e.target.value;
        }
    }
    function verificaFineCheckOut(e){
        if((e.target.value)>document.getElementById("oraInizioCheckOut").value){
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
    return(
        <div className="container col-sm-10 ">
            <div className="progress">
                <div className="progress-bar" style={{width: 80 + '%'}}>80%</div>
            </div>
            <form className="mt-3 needs-validation" noValidate  onSubmit={verificaCheckBox}>
                <div className="container border p-3">
                    <h6 className="mt-3 border-bottom border-primary">Durata del soggiorno</h6>
                    <div className=" text-center mb-3">
                        <div className="form-check-inline col-6 col-md-4">
                            <label htmlFor="minSoggiorno" className="mt-3 mr-4 pr-1 border-bottom border-primary"> Minima </label>
                            <input name="minSoggiorno" id="minSoggiorno" type="number" className="form-control" min="1" max="15" size="2" maxLength="2"  defaultValue={2} onChange={verificaMinDurata}  />
                            <div className="input-group-prepend">
                                <span className="input-group-text">giorni</span>
                            </div>
                            <div className="invalid-feedback">
                                1 - 15
                            </div>
                        </div>
                        <div className="form-check-inline col-6 col-md-4">
                            <label htmlFor="maxSoggiorno" className="mt-3 mr-3 border-bottom border-primary">Massima </label>
                            <input name="maxSoggiorno" id="maxSoggiorno" type="number" className="form-control" min="1" max="28" size="2" maxLength="2" defaultValue={7} onChange={verificaMaxDurata}  />
                            <div className="input-group-prepend">
                                <span className="input-group-text">giorni</span>
                            </div>
                            <div className="invalid-feedback">
                                1 - 28
                            </div>
                        </div>
                    </div>

                    <h6 className="mt-3 border-bottom border-primary">Anticipo di prenotazione</h6>
                    <div className=" text-center mb-3">
                        <div className="form-check-inline col-6 col-md-4">
                            <label htmlFor="minPrenotazione" className="mt-3 mr-4 pr-1 border-bottom border-primary">Minimo</label>
                            <select id="minPrenotazione" className="custom-select" name="minPrenotazione" >
                                <option value="2">2 giorni</option>
                                <option value="3" selected>3 giorni</option>
                                <option value="5">5 giorni</option>
                                <option value="7">1 settimana</option>
                                <option value="10">10 giorni</option>
                                <option value="14">2 settimane</option>
                            </select>
                        </div>
                        <div className="form-check-inline pl-md-0 col-6 col-md-4">
                            <label htmlFor="maxPrenotazione" className="mt-3 mr-3 mr-md-2 border-bottom border-primary" >Massima</label>
                            <select id="maxPrenotazione" className="custom-select" name="maxPrenotazione" >
                                <option value="14">2 settimane</option>
                                <option value="21">3 settimane</option>
                                <option value="30" selected>1 mese</option>
                                <option value="60" >2 mesi</option>
                                <option value="90" selected>3 mesi</option>
                                <option value="180">6 mesi</option>
                                <option value="365">1 anno</option>
                            </select>
                        </div>
                    </div>
                    <h6 className="mt-3 border-bottom border-primary">Fascia oraria check-in e check-out</h6>
                    <div className="d-flex justify-content-around mb-3">
                        <div className="md-form md-outline ">
                            <label htmlFor="oraInizioCheckIn" className="border-bottom border-primary " >Inizio ora check-in</label>
                            <input type="time" id="oraInizioCheckIn" className="form-control " placeholder="Select time" defaultValue="11:00" min="06:00" max="15:00" onChange={verificaInizioCheckIn}/>
                        </div>
                        <div className="invalid-feedback">
                            06:00-15:00
                        </div>

                        <div className="md-form md-outline">
                            <label htmlFor="oraFineCheckIn" className="border-bottom border-primary">Fine ora check-in</label>
                            <input type="time" id="oraFineCheckIn" className="form-control " defaultValue="19:00" min="09:00" max="20:00" placeholder="Select time" onChange={verificaFineCheckIn}/>
                        </div>
                        <div className="invalid-feedback">
                            09:00-20:00
                        </div>
                    </div>

                    <div className="d-flex justify-content-around mb-3 ">
                        <div className="md-form md-outline pl-1">
                            <label htmlFor="oraInizioCheckOut" className="border-bottom border-primary">Inizio ora check-out</label>
                            <input type="time" id="oraInizioCheckOut" className="form-control" min="09:00" max="13:00"defaultValue="09:00" placeholder="Select time" onChange={verificaInizioCheckOut}/>
                        </div>
                        <div className="invalid-feedback">
                            09:00-13:00
                        </div>
                        <div className="md-form md-outline pl-1">
                            <label htmlFor="oraFineCheckOut" className="border-bottom border-primary">Fine ora check-out</label>
                            <input type="time" id="oraFineCheckOut" className="form-control" min="10:00" max="18:00"defaultValue="11:00" placeholder="Select time" onChange={verificaFineCheckOut}/>
                        </div>
                        <div className="invalid-feedback">
                            10:00-18:00
                        </div>
                    </div>
                </div>
                <div className=" border container pt-3">
                    <h6 className="mt-3 border-bottom border-primary">Modalità di pagamento</h6>
                        <div className= "form-row-group d-flex justify-content-around">
                            <div className="form-check-inline ">
                                <input type="checkbox" id="pagamentoOnline" name="pagamentoOnline" value="online"/>
                                <label htmlFor="online" className="form-check-label pl-2" >Pagamento online</label>
                            </div>
                            <div className="form-check-inline ">
                                <input type="checkbox" id="pagamentoLoco" name="pagamentoLoco"  value="loco" />
                                <label htmlFor="loco" className="form-check-label pl-2" >Pagamento in loco</label>
                            </div>
                        </div>
                    <p id="feedback" className=" text-danger collapse" >Selezionare almeno una delle due checkbox</p>

                    <p className="mt-3 border-bottom border-primary">Politica di cancellazione</p>
                    <div className="form-check">
                        <label className="form-check-label ">
                            <input type="radio" className="form-check-input" id="cancellazioneGratuita" value="gratuita" name="politicaCancellazione" onClick={cancellazioneGratuitaHandler}/>Cancellazione gratuita
                        </label>
                    </div>
                    <div className="form-row ">
                        <div className="form-group col-sm-6 col-lg-3 pl-4 mt-2">
                            <input type="radio" className="form-check-input" id="penaleCancellazione" value="pagamento" name="politicaCancellazione" onClick={penaleCancellazioneHandler}/>
                            <label htmlFor="penaleCancellazione">Penale di cancellazione</label>
                        </div>

                        <div className="form-group col-sm-5 col-md-5 col-lg-3 ">
                            <div className="input-group ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">€</span>
                                </div>
                                <input name="prezzoCancellazione" id="prezzoCancellazione" type="number" className="form-control currency  " min="1" step="0.5" max="1000" required style={{maxWidth: 100 + 'px'}} disabled/>
                            </div>
                            <div className="invalid-feedback">
                                1€-1000€
                            </div>
                        </div>
                        <div className="form-group col-sm-12 col-lg-6">
                            <label htmlFor="preavvisoDisdetta" className=" pr-4" >Preavviso minimo disdetta</label>
                            <div className="form-check-inline ">
                                <select id="preavvisoDisdetta" className="custom-select" name="preavvisoDisdetta" required disabled>
                                    <option value="14">2 settimane</option>
                                    <option value="21">3 settimane</option>
                                    <option value="30" selected>1 mese</option>
                                    <option value="60" >2 mesi</option>
                                    <option value="90" selected>3 mesi</option>
                                    <option value="180">6 mesi</option>
                                    <option value="365">1 anno</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="container border pt-3">
                    <h5  id="turismo">Si compilano i campi in base alle normative <br></br> dell'ufficio del Turismo in cui si trova la struttura </h5>
                    <div className="container d-flex  justify-content-around pt-4">
                        <div className="form-row">
                            <div  className=" col-sm-12 col-md-6 pt-3">
                                <div className="input-group ">
                                    <label htmlFor="prezzoBambini" className="pr-3">Prezzo base bambini</label>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">€</span>
                                    </div>
                                    <input name="prezzoBambini" id="prezzoBambini" type="number" className="form-control currency  " min="0" step="0.5" max="10" required style={{maxWidth: 100 + 'px'}} />
                                </div>
                                <div className="invalid-feedback">
                                    1€-10€
                                </div>
                            </div>
                            <div  className=" col-sm-12 col-md-6 pt-3" >
                                <div className="input-group ">
                                    <label htmlFor="prezzoAdulti" className="pr-4 mr-2">Prezzo base adulti</label>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">€</span>
                                    </div>
                                    <input name="prezzoAdulti" id="prezzoAdulti" type="number" className="form-control currency  " min="0" step="0.5" max="10" required style={{maxWidth: 100 + 'px'}} />
                                </div>
                                <div className="invalid-feedback">
                                    1€-10€
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form-row col-12 pt-3">
                        <label htmlFor="nGiorniEsclusione " className="pr-1 pr-lg-3 pt-2">Esclusione per soggiorni superiori a</label>
                        <div className="input-group-prepend">
                            <span className="input-group-text">giorni</span>
                        </div>
                        <input name="nGiorniEsclusione" id="nGiorniEsclusione" type="number"  className="form-control" min="2"
                               maxLength="2" required style={{maxWidth: 80 + 'px'}}/>

                    </div>
                    <div className="container d-flex justify-content-around pt-2 pb-3">
                        <div className="form-row">
                            <div  className=" col-sm-12 col-md-5 pt-3">
                                <div className="input-group ">
                                    <label htmlFor="prezzoBambini" className=" pr-1 pr-md-3">Riduzione del</label>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">%</span>
                                    </div>
                                    <input name="prezzoBambini" id="prezzoBambini" type="number" className="form-control currency  " min="0" step="0.1" max="100" required style={{maxWidth: 100 + 'px'}} />
                                </div>
                            </div>
                            <div  className=" col-sm-12 col-md-8 col-lg-7 pt-3" >
                                <div className="input-group ">
                                    <label htmlFor="nPersone" className="pr-2">per prenotazioni superiori a n° persone</label>
                                    <input name="nPersone" id="nPersone" type="number" className="form-control currency  " min="1" step="1" max="100" required style={{maxWidth: 100 + 'px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonForm/>
            </form>
        </div>
    )}
    export default FormCondizioni