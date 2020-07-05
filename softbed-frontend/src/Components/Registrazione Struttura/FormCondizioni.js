import React, {useEffect} from "react";
import {abilitazione} from "../../Actions/abilitazione"

function FormCondizioni(props) {

    useEffect(()=>{
        document.getElementById("anticipoPrenotazioneMin").value=props.dati.anticipoPrenotazioneMin;
        document.getElementById("anticipoPrenotazioneMax").value=props.dati.anticipoPrenotazioneMax;
        document.getElementById("preavvisoDisdetta").value=props.dati.preavvisoDisdetta;
    });

    function verificaMinDurata() {
        let max = document.getElementById("maxSoggiorno");
        let min = document.getElementById("minSoggiorno");
        /* se la durata minima è maggiore della massima, imposta la massima uguale alla minima*/
        if (parseInt(max.value) !== "" && (parseInt(min.value) > parseInt(max.value))){
            max.value = min.value;
            props.correzione("maxSoggiorno", min.value);
        }
    }

    function verificaMaxDurata(e) {
        let max = document.getElementById("maxSoggiorno");
        let min = document.getElementById("minSoggiorno");
        /* se la durata massima è minore della minima, imposta la minima uguale alla massima*/
        if (parseInt(min.value) !== "" && (parseInt(max.value) < parseInt(min.value))){
            min.value = max.value;
            props.correzione("minSoggiorno", max.value);
        }
    }

    function verificaInizioCheckIn(e) {
        if (document.getElementById("oraFineCheckIn").value !== "" && (e.target.value) > document.getElementById("oraFineCheckIn").value) {
            document.getElementById("oraFineCheckIn").value = e.target.value;
            props.correzione("oraFineCheckIn", e.target.value);
        }
    }

    function verificaFineCheckIn(e) {
        if (document.getElementById("oraInizioCheckIn").value !== "" && (e.target.value) < document.getElementById("oraInizioCheckIn").value) {
            document.getElementById("oraInizioCheckIn").value = e.target.value;
            props.correzione("oraInizioCheckIn", e.target.value);
        }
    }

    function verificaInizioCheckOut(e) {
        if (document.getElementById("oraFineCheckOut").value !== "" && (e.target.value) > document.getElementById("oraFineCheckOut").value) {
            document.getElementById("oraFineCheckOut").value = e.target.value;
            props.correzione("oraFineCheckOut", e.target.value);
        }
    }

    function verificaFineCheckOut(e) {
        if (document.getElementById("oraInizioCheckOut").value !== "" && (e.target.value) < document.getElementById("oraInizioCheckOut").value) {
            document.getElementById("oraInizioCheckOut").value = e.target.value;
            props.correzione("oraInizioCheckOut", e.target.value);
        }
    }

    function abilita(){
        if(abilitazione() === 0){
            props.correzione("penaleCancellazione", null);
            props.correzione("preavvisoDisdetta", null);
        }
    }

    return(
        <div>
            <div className="border p-3 text-center">
                <h6 className="mt-3 border-bottom border-primary text-left">Durata del soggiorno</h6>
                <div className="mb-3 form-check-inline mr-3">
                    <div className="input-group">
                        <label htmlFor="minSoggiorno" className="mt-3 mr-4 border-bottom border-primary">Minima</label>
                        <input name="minSoggiorno" id="minSoggiorno" type="number" className="form-control my-auto"
                               min={1} max={15} defaultValue={props.dati.minSoggiorno}
                               onChange={verificaMinDurata} required/>
                        <div className="input-group-prepend">
                            <span className="input-group-text my-auto">giorni</span>
                        </div>
                        <span className="invalid-feedback small m-0 p-0">1 - 15</span>
                    </div>
                </div>
                <div className="mb-3 form-check-inline text-center">
                    <div className="input-group">
                        <label htmlFor="maxSoggiorno"
                               className="mt-3 mr-3 border-bottom border-primary">Massima </label>
                        <input name="maxSoggiorno" id="maxSoggiorno" type="number" className="form-control my-auto"
                               min={1} max={28} defaultValue={props.dati.maxSoggiorno}
                               onChange={verificaMaxDurata} required/>
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
                    <label htmlFor="anticipoPrenotazioneMin"
                           className="mt-3 mr-4 border-bottom border-primary">Minimo </label>
                    <select id="anticipoPrenotazioneMin" className="custom-select mr-2" name="anticipoPrenotazioneMin"
                            defaultValue={props.dati.anticipoPrenotazioneMin} style={{minWidth: 160 + 'px'}} required>
                        <option value=""/>
                        <option value={2}>2 giorni</option>
                        <option value={3}>3 giorni</option>
                        <option value={5}>5 giorni</option>
                        <option value={7}>1 settimana</option>
                        <option value={10}>10 giorni</option>
                        <option value={14}>2 settimane</option>
                    </select>
                </div>
                <div className="form-check-inline pl-md-0">
                    <label htmlFor="anticipoPrenotazioneMax"
                           className="mt-3 mr-3 border-bottom border-primary">Massimo</label>
                    <select id="anticipoPrenotazioneMax" className="custom-select" name="anticipoPrenotazioneMax"
                            defaultValue={props.dati.anticipoPrenotazioneMax} style={{minWidth: 160 + 'px'}} required>
                        <option value=""/>
                        <option value={14}>2 settimane</option>
                        <option value={21}>3 settimane</option>
                        <option value={30}>1 mese</option>
                        <option value={60}>2 mesi</option>
                        <option value={90}>3 mesi</option>
                        <option value={180}>6 mesi</option>
                        <option value={365}>1 anno</option>
                    </select>
                </div>
            </div>
            <div className="border p-3 text-center">
                <h6 className="mt-3 border-bottom border-primary text-left">Fascia oraria check-in e check-out</h6>
                <div className="d-flex justify-content-around mb-3">
                    <div className="md-form md-outline ">
                        <label htmlFor="oraInizioCheckIn" className="border-bottom border-primary ">Inizio ora
                            check-in</label>
                        <input type="time" id="oraInizioCheckIn" name="oraInizioCheckIn" className="form-control "
                               placeholder="Select time" defaultValue={props.dati.oraInizioCheckIn} onChange={verificaInizioCheckIn} required/>
                    </div>

                    <div className="md-form md-outline">
                        <label htmlFor="oraFineCheckIn" className="border-bottom border-primary">Fine ora
                            check-in</label>
                        <input type="time" id="oraFineCheckIn" name="oraFineCheckIn" className="form-control "
                               defaultValue={props.dati.oraFineCheckIn}
                               placeholder="Select time" onChange={verificaFineCheckIn} required/>
                    </div>
                </div>

                <div className="d-flex justify-content-around mb-3 ">
                    <div className="md-form md-outline pl-1">
                        <label htmlFor="oraInizioCheckOut" className="border-bottom border-primary">Inizio ora
                            check-out</label>
                        <input type="time" id="oraInizioCheckOut" name="oraInizioCheckOut" className="form-control"
                               defaultValue={props.dati.oraInizioCheckOut}
                               placeholder="Select time" onChange={verificaInizioCheckOut} required/>
                    </div>

                    <div className="md-form md-outline pl-1">
                        <label htmlFor="oraFineCheckOut" className="border-bottom border-primary">Fine ora
                            check-out</label>
                        <input type="time" id="oraFineCheckOut" name="oraFineCheckOut" className="form-control"
                                defaultValue={props.dati.oraFineCheckOut}
                               placeholder="Select time" onChange={verificaFineCheckOut} required/>
                    </div>
                </div>
            </div>
            <div className="border p-3" onClick={props.handleChange}>
                <h6 className="mt-3 border-bottom border-primary ">Modalità di pagamento</h6>
                <div className="form-row-group d-flex justify-content-around">
                    <div className="form-check-inline ">
                        <input type="checkbox" id="pagamentoOnline" name="pagamentoOnline" value={1}
                               defaultChecked={props.dati.pagamentoOnline}/>
                        <label htmlFor="pagamentoOnline" className=" form-check-label pl-2">Pagamento online</label>
                    </div>
                    <div className="form-check-inline ">
                        <input type="checkbox" id="pagamentoLoco" name="pagamentoLoco" value={1}
                               defaultChecked={props.dati.pagamentoLoco}/>
                        <label htmlFor="pagamentoLoco" className=" form-check-label pl-2">Pagamento in loco</label>
                    </div>
                </div>
                <p id="feedbackPagamento" className=" text-danger collapse small">Selezionare almeno una delle due checkbox</p>
                <p className="mt-3 border-bottom border-primary">Politica di cancellazione</p>
                <div className="form-check"  onChange={abilita}>
                    <div className="radio">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" id="cancellazioneGratuita" value="gratuita" name="politicaCancellazione" defaultChecked={props.dati.politicaCancellazione && props.dati.politicaCancellazione === 'gratuita'} required/>
                            Cancellazione gratuita</label>
                    </div>
                    <div className="form-row">
                        <div className="radio">
                            <label htmlFor="pagamento" className="ml-1 mr-3">
                                <input type="radio" className="form-check-input" id="pagamento" value="pagamento" name="politicaCancellazione" defaultChecked={props.dati.politicaCancellazione && props.dati.politicaCancellazione === 'pagamento'} required/>
                                Penale di cancellazione</label>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">€</span>
                                </div>
                                <input name="penaleCancellazione" id="penaleCancellazione" type="number"
                                       className="form-control currency mr-3" min={1} step={0.5} max={1000}
                                       defaultValue={props.dati.penaleCancellazione}
                                       required={(props.dati.politicaCancellazione === "pagamento")}
                                       style={{maxWidth: 100 + 'px'}} disabled={(props.dati.politicaCancellazione === "pagamento") ? false: true}/>
                                <div className="invalid-feedback">1€-1000€</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="preavvisoDisdetta" className={'pr-2'+((props.dati.politicaCancellazione === "pagamento")? "":" text-muted")} id="preavvisoTesto">Preavviso
                                    minimo disdetta</label>
                                <select id="preavvisoDisdetta" className="custom-select " name="preavvisoDisdetta"
                                        defaultValue={props.dati.preavvisoDisdetta}
                                        required={props.dati.politicaCancellazione === "pagamento"}
                                        disabled={((props.dati.politicaCancellazione === "gratuita") ? true : false)}>
                                    <option value=""/>
                                    <option value={7}>1 settimana</option>
                                    <option value={10}>10 giorni</option>
                                    <option value={14}>2 settimane</option>
                                    <option value={21}>3 settimane</option>
                                    <option value={30}>1 mese</option>
                                    <option value={60}>2 mesi</option>
                                    <option value={90}>3 mesi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border pt-3">
                <h5 id="turismo">Si compilano i campi in base alle normative <br/> dell'ufficio del Turismo in cui si
                    trova la struttura </h5>
                <div className="form-row">
                    <div className="input-group  d-flex justify-content-center mb-2">
                        <label htmlFor="prezzoBambini" className="pr-3">Prezzo base bambini</label>
                        <div className="input-group-prepend">
                            <span className="input-group-text">€</span>
                        </div>
                        <input name="prezzoBambini" id="prezzoBambini" type="number" className="form-control currency "
                               defaultValue={props.dati.prezzoBambini} min={0} step={0.5} max={10} required
                               style={{maxWidth: 100 + 'px'}}/>
                        <div className="invalid-feedback text-center">1€-10€</div>
                    </div>
                    <div className="input-group  d-flex justify-content-center mb-2">
                        <label htmlFor="prezzoAdulti" className="pr-4 mr-2">Prezzo base adulti</label>
                        <div className="input-group-prepend">
                            <span className="input-group-text">€</span>
                        </div>
                        <input name="prezzoAdulti" id="prezzoAdulti" type="number" className="form-control currency  "
                               min={0} step={0.5} max={10} required style={{maxWidth: 100 + 'px'}}
                               defaultValue={props.dati.prezzoAdulti}/>
                        <div className="invalid-feedback text-center">1€-10€</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormCondizioni;