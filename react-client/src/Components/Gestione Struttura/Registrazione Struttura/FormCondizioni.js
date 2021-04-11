import React, {useEffect} from "react";
import {abilitazione} from "../../../Actions/abilitazione"

function FormCondizioni(props) {

    useEffect(()=>{
        document.getElementById("anticipoprenotazionemin").value=props.dati.anticipoprenotazionemin;
        document.getElementById("anticipoprenotazionemax").value=props.dati.anticipoprenotazionemax;
        document.getElementById("preavvisodisdetta").value=props.dati.preavvisodisdetta;
    });

    function verificaMinDurata() {
        let max = document.getElementById("maxsoggiorno");
        let min = document.getElementById("minsoggiorno");
        /* se la durata minima è maggiore della massima, imposta la massima uguale alla minima */
        if (max.value && (parseInt(min.value) > parseInt(max.value))){
            max.value = min.value;
            props.correzione("maxsoggiorno", min.value);
        }
    }

    function verificaMaxDurata(e) {
        let max = document.getElementById("maxsoggiorno");
        let min = document.getElementById("minsoggiorno");
        /* se la durata massima è minore della minima, imposta la minima uguale alla massima*/
        if (min.value && (parseInt(max.value) < parseInt(min.value))){
            min.value = max.value;
            props.correzione("minsoggiorno", max.value);
        }
    }

    function verificaInizioCheckIn(e) {
        if (document.getElementById("orafinecheckin").value !== "" && (e.target.value) > document.getElementById("orafinecheckin").value) {
            document.getElementById("orafinecheckin").value = e.target.value;
            props.correzione("orafinecheckin", e.target.value);
        }
    }

    function verificaFineCheckIn(e) {
        if (document.getElementById("orainiziocheckin").value !== "" && (e.target.value) < document.getElementById("orainiziocheckin").value) {
            document.getElementById("orainiziocheckin").value = e.target.value;
            props.correzione("orainiziocheckin", e.target.value);
        }
    }

    function verificaInizioCheckOut(e) {
        if (document.getElementById("orafinecheckout").value !== "" && (e.target.value) > document.getElementById("orafinecheckout").value) {
            document.getElementById("orafinecheckout").value = e.target.value;
            props.correzione("orafinecheckout", e.target.value);
        }
    }

    function verificaFineCheckOut(e) {
        if (document.getElementById("orainiziocheckout").value !== "" && (e.target.value) < document.getElementById("orainiziocheckout").value) {
            document.getElementById("orainiziocheckout").value = e.target.value;
            props.correzione("orainiziocheckout", e.target.value);
        }
    }

    function abilita(){ //alla selezione del radio button permette di abilitare i campi penalecancellazione e preavviso disdetta
        if(abilitazione() === 0){
            props.correzione("penalecancellazione", null);
            props.correzione("preavvisodisdetta", null);
        }
    }

    return(
        <div>
            <div className="border p-3 text-center">
                <h6 className="mt-3 border-bottom border-primary text-left">Durata del soggiorno</h6>
                <div className="mb-3 form-check-inline mr-3">
                    <div className="input-group">
                        <label htmlFor="minsoggiorno" className="mt-3 mr-4 border-bottom border-primary">Minima</label>
                        <input name="minsoggiorno" id="minsoggiorno" type="number" className="form-control my-auto"
                               min={1} max={15} defaultValue={props.dati.minsoggiorno}
                               onChange={verificaMinDurata} required/>
                        <div className="input-group-prepend">
                            <span className="input-group-text my-auto">giorni</span>
                        </div>
                        <span className="invalid-feedback small m-0 p-0">1 - 15</span>
                    </div>
                </div>
                <div className="mb-3 form-check-inline text-center">
                    <div className="input-group">
                        <label htmlFor="maxsoggiorno"
                               className="mt-3 mr-3 border-bottom border-primary">Massima </label>
                        <input name="maxsoggiorno" id="maxsoggiorno" type="number" className="form-control my-auto"
                               min={1} max={28} defaultValue={props.dati.maxsoggiorno}
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
                    <label htmlFor="anticipoprenotazionemin"
                           className="mt-3 mr-4 border-bottom border-primary">Minimo </label>
                    <select id="anticipoprenotazionemin" className="custom-select mr-2" name="anticipoprenotazionemin"
                            defaultValue={props.dati.anticipoprenotazionemin} style={{minWidth: 160 + 'px'}} required>
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
                    <label htmlFor="anticipoprenotazionemax"
                           className="mt-3 mr-3 border-bottom border-primary">Massimo</label>
                    <select id="anticipoprenotazionemax" className="custom-select" name="anticipoprenotazionemax"
                            defaultValue={props.dati.anticipoprenotazionemax} style={{minWidth: 160 + 'px'}} required>
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
                        <label htmlFor="orainiziocheckin" className="border-bottom border-primary ">Inizio ora
                            check-in</label>
                        <input type="time" id="orainiziocheckin" name="orainiziocheckin" className="form-control "
                               placeholder="Select time" defaultValue={props.dati.orainiziocheckin} onChange={verificaInizioCheckIn} required/>
                    </div>

                    <div className="md-form md-outline">
                        <label htmlFor="orafinecheckin" className="border-bottom border-primary">Fine ora
                            check-in</label>
                        <input type="time" id="orafinecheckin" name="orafinecheckin" className="form-control "
                               defaultValue={props.dati.orafinecheckin}
                               placeholder="Select time" onChange={verificaFineCheckIn} required/>
                    </div>
                </div>

                <div className="d-flex justify-content-around mb-3 ">
                    <div className="md-form md-outline pl-1">
                        <label htmlFor="orainiziocheckout" className="border-bottom border-primary">Inizio ora
                            check-out</label>
                        <input type="time" id="orainiziocheckout" name="orainiziocheckout" className="form-control"
                               defaultValue={props.dati.orainiziocheckout}
                               placeholder="Select time" onChange={verificaInizioCheckOut} required/>
                    </div>

                    <div className="md-form md-outline pl-1">
                        <label htmlFor="orafinecheckout" className="border-bottom border-primary">Fine ora
                            check-out</label>
                        <input type="time" id="orafinecheckout" name="orafinecheckout" className="form-control"
                                defaultValue={props.dati.orafinecheckout}
                               placeholder="Select time" onChange={verificaFineCheckOut} required/>
                    </div>
                </div>
            </div>
            <div className="border p-3" onClick={props.handleChange}>
                <h6 className="mt-3 border-bottom border-primary ">Modalità di pagamento</h6>
                <div className="form-row-group d-flex justify-content-around">
                    <div className="form-check-inline ">
                        <input type="checkbox" id="pagamentoonline" name="pagamentoonline" value={1}
                               defaultChecked={props.dati.pagamentoonline}/>
                        <label htmlFor="pagamentoonline" className=" form-check-label pl-2">Pagamento online</label>
                    </div>
                    <div className="form-check-inline ">
                        <input type="checkbox" id="pagamentoloco" name="pagamentoloco" value={1}
                               defaultChecked={props.dati.pagamentoloco}/>
                        <label htmlFor="pagamentoloco" className=" form-check-label pl-2">Pagamento in loco</label>
                    </div>
                </div>
                <p id="feedbackPagamento" className=" text-danger collapse small">Selezionare almeno una delle due checkbox</p>
                <p className="mt-3 border-bottom border-primary">Politica di cancellazione</p>
                <div className="form-check"  onChange={abilita}>
                    <div className="radio">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" id="cancellazioneGratuita" value="gratuita" name="politicacancellazione" defaultChecked={props.dati.politicacancellazione && props.dati.politicacancellazione === 'gratuita'} required/>
                            Cancellazione gratuita</label>
                    </div>
                    <div className="form-row">
                        <div className="radio">
                            <label htmlFor="pagamento" className="ml-1 mr-3">
                                <input type="radio" className="form-check-input" id="pagamento" value="pagamento" name="politicacancellazione" defaultChecked={props.dati.politicacancellazione && props.dati.politicacancellazione === 'pagamento'} required/>
                                Penale di cancellazione</label>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">€</span>
                                </div>
                                <input name="penalecancellazione" id="penalecancellazione" type="number"
                                       className="form-control currency mr-3" min={1} step={0.5} max={1000}
                                       defaultValue={props.dati.penalecancellazione}
                                       required={(props.dati.politicacancellazione === "pagamento")}
                                       style={{maxWidth: 100 + 'px'}} disabled={props.dati.politicacancellazione !== "pagamento"}/>
                                <div className="invalid-feedback">1€-1000€</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="preavvisodisdetta" className={'pr-2' + ((props.dati.politicacancellazione === "pagamento") ? "" : " text-muted")} id="preavvisoTesto">Preavviso
                                    minimo disdetta</label>
                                <select id="preavvisodisdetta" className="custom-select " name="preavvisodisdetta"
                                        defaultValue={props.dati.preavvisodisdetta}
                                        required={props.dati.politicacancellazione === "pagamento"}
                                        disabled={props.dati.politicacancellazione === "gratuita"}>
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
                        <label htmlFor="prezzobambini" className="pr-3">Prezzo base bambini</label>
                        <div className="input-group-prepend">
                            <span className="input-group-text">€</span>
                        </div>
                        <input name="prezzobambini" id="prezzobambini" type="number" className="form-control currency "
                               defaultValue={props.dati.prezzobambini} min={0} step={0.5} max={10} required
                               style={{maxWidth: 100 + 'px'}}/>
                        <div className="invalid-feedback text-center">1€-10€</div>
                    </div>
                    <div className="input-group  d-flex justify-content-center mb-2">
                        <label htmlFor="prezzoadulti" className="pr-4 mr-2">Prezzo base adulti</label>
                        <div className="input-group-prepend">
                            <span className="input-group-text">€</span>
                        </div>
                        <input name="prezzoadulti" id="prezzoadulti" type="number" className="form-control currency  "
                               min={0} step={0.5} max={10} required style={{maxWidth: 100 + 'px'}}
                               defaultValue={props.dati.prezzoadulti}/>
                        <div className="invalid-feedback text-center">1€-10€</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormCondizioni;