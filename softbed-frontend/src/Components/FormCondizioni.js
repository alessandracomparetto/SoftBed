import React from "react";
import $ from "jquery";
import ButtonForm from "./ButtonForm";

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
        if((e.target.value)<document.getElementById("oraFineCheckIn").value){
            document.getElementById("oraInizioCheckIn").value=e.target.value;
        }
    }
    function verificaInizioCheckOut(e){
        if((e.target.value)>document.getElementById("oraFineCheckOut").value){
            document.getElementById("oraFineCheckOut").value=e.target.value;
        }
    }
    function verificaFineCheckOut(e){
        if((e.target.value)>document.getElementById("oraFineCheckOut").value){
            document.getElementById("oraFineCheckIn").value=e.target.value;
        }
    }
    function verificaCheckBox(event){
        event.preventDefault();
        console.log(document.getElementById("pagamentoLoco").value);
        console.log($("pagamentoLoco").checked);


    }
    return(
        <div className="container col-sm-10 ">
            <div className="progress">
                <div className="progress-bar" style={{width: 80 + '%'}}>80%</div>
            </div>
            <form className="mt-3" onSubmit={verificaCheckBox}>
                <div className="container border p-3">
                    <h6 className="mt-3 border-bottom border-primary">Durata del soggiorno(giorni)</h6>
                    <div className=" text-center mb-3">
                        <div className="form-check-inline col-6 col-md-4">
                            <label htmlFor="minSoggiorno" className="mt-3 mr-4 pr-1 border-bottom border-primary"> Minima </label>
                            <input name="minSoggiorno" id="minSoggiorno" type="number" className="form-control " min="1" max="15" size="2" maxLength="2"  defaultValue={2} onChange={verificaMinDurata}  />
                            <div className="invalid-feedback">
                                1 - 15
                            </div>
                        </div>
                        <div className="form-check-inline col-6 col-md-4">
                            <label htmlFor="maxSoggiorno" className="mt-3 mr-3 border-bottom border-primary">Massima </label>
                            <input name="maxSoggiorno" id="maxSoggiorno" type="number" className="form-control" min="1" max="28" size="2" maxLength="2" defaultValue={7} onChange={verificaMaxDurata}  />
                            <div className="invalid-feedback">
                                1 - 28
                            </div>
                        </div>
                    </div>

                    <h6 className="mt-3 border-bottom border-primary">Anticipo di prenotazione</h6>
                    <div className=" text-center mb-3">
                        <div className="form-check-inline col-6 col-md-4">
                            <label htmlFor="minPrenotazione" className="mt-3 mr-4 pr-1 border-bottom border-primary">Minima</label>
                            <select id="minPrenotazione" className="custom-select" name="minPrenotazione" >
                                <option value="1">1 giorni</option>
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
                            <input type="time" id="oraInizioCheckIn" className="form-control col-9" placeholder="Select time" defaultValue="11:00" min="06:00" max="15:00" onChange={verificaInizioCheckIn}/>
                        </div>
                        <div className="invalid-feedback">
                            06:00-15:00
                        </div>

                        <div className="md-form md-outline">
                            <label htmlFor="oraFineCheckIn" className="border-bottom border-primary">Fine ora check-in</label>
                            <input type="time" id="oraFineCheckIn" className="form-control col-9" defaultValue="19:00" min="09:00" max="20:00" placeholder="Select time" onChange={verificaFineCheckIn}/>
                        </div>
                        <div className="invalid-feedback">
                            09:00-20:00
                        </div>
                    </div>

                    <div className="d-flex justify-content-around mb-3 ">
                        <div className="md-form md-outline pl-1">
                            <label htmlFor="oraInizioCheckOut" className="border-bottom border-primary">Inizio ora check-out</label>
                            <input type="time" id="oraInizioCheckOut" className="form-control col-9" min="09:00" max="13:00"defaultValue="09:00" placeholder="Select time" onChange={verificaInizioCheckOut}/>
                        </div>
                        <div className="invalid-feedback">
                            09:00-13:00
                        </div>
                        <div className="md-form md-outline pl-1">
                            <label htmlFor="oraFineCheckOut" className="border-bottom border-primary">Fine ora check-out</label>
                            <input type="time" id="oraFineCheckOut" className="form-control col-9" min="10:00" max="18:00"defaultValue="11:00" placeholder="Select time" onChange={verificaFineCheckOut}/>
                        </div>
                        <div className="invalid-feedback">
                            10:00-18:00
                        </div>
                    </div>
                </div>
                <div className="container">
                    {/*TODO controllo che abbia scelto almeno unno delle due */}
                    <h6 className="mt-3 border-bottom border-primary">Modalità di pagamento</h6>
                        <div className= "form-row-group d-flex justify-content-around">
                            <div className="form-check-inline ">
                                <input type="checkbox" name="online"/>
                                <label htmlFor="online" className="form-check-label pl-2"  required name="pagamentoOnline" value="online" required>Pagamento online</label>
                            </div>
                            <div className="form-check-inline ">
                                <input type="checkbox" name="loco"/>
                                <label htmlFor="loco" className="form-check-label pl-2"  required name="pagamentoLoco" value="loco" required >Pagamento in loco</label>
                            </div>
                        </div>

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
                        {/*TODO controllare che la massimo prenitazione sia minore della minima disdetta*/}
                    </div>
                </div>
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
                    <div className=" d-flex justify-content-center  form-row col-12 pt-3">
                        <label htmlFor="nGiorniEsclusione " className="pr-3 pt-2">Esclusioni per soggiorni superiori a</label>
                        <input name="nGiorniEsclusione" id="nGiorniEsclusione" type="number"  className="form-control" min="2"
                               maxLength="2" required style={{maxWidth: 80 + 'px'}}/>
                        <div className="input-group-prepend">
                            <span className="input-group-text">giorni</span>
                        </div>
                    </div>
                <div className="container d-flex justify-content-around pt-2">
                    <div className="form-row">
                        <div  className=" col-sm-12 col-md-5 pt-3">
                            <div className="input-group ">
                                <label htmlFor="prezzoBambini" className="pr-3">Riduzione del</label>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">%</span>
                                </div>
                                <input name="prezzoBambini" id="prezzoBambini" type="number" className="form-control currency  " min="0" step="0.1" max="100" required style={{maxWidth: 100 + 'px'}} />
                            </div>
                        </div>
                        <div  className=" col-sm-12 col-md-7 pt-3" >
                            <div className="input-group ">
                                <label htmlFor="nPersone" className="pr-1">per prenotazioni superiori a n° persone</label>
                                <input name="nPersone" id="nPersone" type="number" className="form-control currency  " min="1" step="1" max="100" required style={{maxWidth: 100 + 'px'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonForm/>
            </form>
        </div>
    )}
    export default FormCondizioni