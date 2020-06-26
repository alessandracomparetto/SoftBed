import React from "react";

function FormCaratteristicheB(props){
    function vaiAvanti(event) {
        event.preventDefault();
        document.getElementById("form").classList.add("was-validated");
        if (document.getElementById("form").checkValidity()) {
            props.go();
        }
    }

    function  vaiIndietro() {
        props.goBack();
    }
    function verificaLunghezza(event){
        if(event.target.value.length>=200){
            document.getElementById("feedback").classList.remove("collapse");
            event.target.classList.add("border-warning");
        }
        else{
            document.getElementById("feedback").classList.add("collapse");
            event.target.classList.remove("border-warning");
        }
    }
    if(props.currentStep != 4){
        return null;
    }
    return(
        <div className="container">
        <div className="progress mt-2">
            <div className="progress-bar" style={{width: 60 + '%'}}>60%</div>
        </div>
        <form id="form" className="w50 justify-content-center mt-3 needs-validation" onChange={props.handleChange} noValidate>
          <h6 className="mt-3 border-bottom border-primary">Servizi disponibili</h6>
          <div className="form-row-group text-center offset-1">
              <div className="form-check-inline col-12  col-sm-5  col-lg-3">
                  <input type="checkbox" className="form-check-input " value="true" name="connessione" defaultChecked={props.dati.connessione==="true"}/>
                  <label className="form-check-label">Connessione Wi-fi</label>
              </div>
              <div className="form-check-inline col-12  col-sm-5 col-lg-3">
                  <input type="checkbox" className="form-check-input" id="riscaldamento" name="riscaldamento"value="true" defaultChecked={props.dati.riscaldamento==="true"}/>
                  <label className="form-check-label" htmlFor="riscaldamento">Riscaldamento</label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <input type="checkbox" className="form-check-input" id="cucina" name="cucina" value="true" defaultChecked={props.dati.cucina==="true"}/>
                  <label className="form-check-label" htmlFor="cucina">Cucina per celiaci</label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3 text-left">
                  <input type="checkbox" className="form-check-input" id="disabili" name="disabili" value="true" defaultChecked={props.dati.disabili==="true"}/>
                  <label className="form-check-label" htmlFor="disabili" style={{minWidth : 200+'px'}}>Strutture per disabili</label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <input type="checkbox" className="form-check-input" id="aria" name="aria" value="true" defaultChecked={props.dati.aria==="true"}/>
                  <label className="form-check-label" htmlFor="aria">Aria condizionata</label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <input type="checkbox" className="form-check-input" id="tv" name="tv" value="true" defaultChecked={props.dati.tv==="true"}/>
                  <label className="form-check-label" htmlFor="tv">TV</label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <input type="checkbox" className="form-check-input" id="parcheggio" name="parcheggio" value="true" defaultChecked={props.dati.parcheggio==="true"}/>
                  <label className="form-check-label" htmlFor="parcheggio">Parcheggio</label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3 p-0">
                  <input type="checkbox" className="form-check-input" id="servizioInCamera" name="servizioInCamera" value="true" defaultChecked={props.dati.servizioInCamera==="true"}/>
                  <label className="form-check-label " htmlFor="servizioInCamera">Servizio in camera</label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <input type="checkbox" className="form-check-input" id="navettaAereoportuale" name="navettaAereoportuale" value="true" defaultChecked={props.dati.navttaAereoportuale==="true"}/>
                  <label className="form-check-label" htmlFor="navettaAereoportuale" style={{minWidth : 200+'px'}}>Navetta aereoportuale</label>
              </div>

          </div>


        <h6 className="mt-3 border-bottom border-primary">Sugli ospiti</h6>
          <div className="form-group text-center offset-1">
              <div className="form-check-inline  col-12 col-sm-5 col-lg-3 ">
                  <input type="checkbox" className="form-check-input" id="animali" name="animali" value="true" defaultChecked={props.dati.animali==="true"}/>
                  <label className="form-check-label" htmlFor="animali">Animali ammessi</label>
              </div>
              <div className="form-check-inline  col-12 col-sm-5 col-lg-3 text-left">
                  <input type="checkbox" className="form-check-input" id="permessoFumo" name="permessoFumo" value="true" defaultChecked={props.dati.permessoFumo==="true"}/>
                  <label className="form-check-label" htmlFor="permessoFumo" style={{minWidth : 200+'px'}}>Permesso di fumare</label>
              </div>
              <div className="form-check-inline col-12 col-sm-7 col-lg-3 text-left p-0">
                  <input type="checkbox" className="form-check-input" id="bambini" name="bambini" value="true" defaultChecked={props.dati.bambini==="true"}/>
                  <label className="form-check-label" htmlFor="bambini" style={{minWidth : 300+'px'}}>Idoneità ad ospitare bambini </label>
              </div>
              {/*<div className="form-check-inline col-12 col-sm-3 col-lg-3 "/>*/}
          </div>

          <h6 className="mt-3 border-bottom border-primary">Descrizione</h6>
            <div className="md-form amber-textarea active-amber-textarea">
                <textarea id="descrizione" name="descrizione" className="md-textarea form-control" rows="5"  maxLength="200" placeholder="Write something here..." onChange={verificaLunghezza}></textarea>
                <p id="feedback" className="text-danger form-text text-muted collapse ">Hai raggiunto il massimo di 200 caratteri</p>
            </div>
            <button id="indietro" className="btn btn-secondary mt-3 float-left btn-lg w-200px" onClick={vaiIndietro}>Indietro</button>
            <button id="ok" type="submit" className="btn btn-primary mt-3  float-right btn-lg w-200px" onClick={vaiAvanti}>Continua</button>
        </form>

        </div>
)}
export default FormCaratteristicheB