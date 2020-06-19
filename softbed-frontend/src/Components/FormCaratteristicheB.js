import React from "react";
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

function FormCaratteristicheB(){
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
    return(
        <div className="container">
        <div className="progress">
            <div className="progress-bar" style={{width: 60 + '%'}}>60%</div>
        </div>
        <h4>Caratteristiche B&B</h4>
        <form className="w50 justify-content-center mt-3 needs-validation" noValidate>
          <h6 className="mt-3 border-bottom border-primary">Servizi disponibili</h6>
          <div className="form-row-group text-center">
              <div className="form-check-inline col-12  col-sm-5  col-lg-3">
                  <label className="form-check-label">
                      <input type="checkbox" className="form-check-input " value="true" name="connessione"
                      />Connessione Wi-fi
                  </label>
              </div>
              <div className="form-check-inline col-12  col-sm-5 col-lg-3">
                  <label className="form-check-label" htmlFor="riscaldamento">
                      <input type="checkbox" className="form-check-input" id="riscaldamento" name="riscaldamento"
                             value="true"/>Riscaldamento
                  </label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <label className="form-check-label" htmlFor="cucina">
                      <input type="checkbox" className="form-check-input" id="cucina" name="cucina" value="true"/>Cucina
                      per celiaci
                  </label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <label className="form-check-label" htmlFor="disabili">
                      <input type="checkbox" className="form-check-input" id="disabili" name="disabili" value="true"/>Strutture
                      per disabili
                  </label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <label className="form-check-label" htmlFor="aria">
                      <input type="checkbox" className="form-check-input" id="aria" name="aria" value="true"/>Aria
                      condizionata
                  </label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <label className="form-check-label" htmlFor="tv">
                      <input type="checkbox" className="form-check-input" id="tv" name="tv" value="true"/>TV
                  </label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <label className="form-check-label" htmlFor="navettaAereoportuale">
                      <input type="checkbox" className="form-check-input" id="navettaAereoportuale"
                             name="navettaAereoportuale" value="true"/>Navetta aereoportuale
                  </label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                  <label className="form-check-label" htmlFor="parcheggio">
                      <input type="checkbox" className="form-check-input" id="parcheggio" name="parcheggio"
                             value="true"/>Parcheggio
                  </label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3 ">
                  <label className="form-check-label " htmlFor="servizioInCamera">
                      <input type="checkbox" className="form-check-input" id="servizioInCamera" name="servizioInCamera"
                             value="true"/>Servizio in camera
                  </label>
              </div>
          </div>


        <h6 className="mt-3 border-bottom border-primary">Sugli ospiti</h6>
          <div className="form-group text-center">
              <div className="form-check-inline  col-12 col-sm-5 col-lg-3 ">
                  <input type="checkbox" className="form-check-input" id="animali" name="animali" value="true"/>
                  <label className="form-check-label" htmlFor="animali">Animali ammessi</label>
              </div>
              <div className="form-check-inline  col-12 col-sm-5 col-lg-3 ">
                  <input type="checkbox" className="form-check-input" id="permessoFumo" name="permessoFumo" value="true"/>
                  <label className="form-check-label" htmlFor="permessoFumo">Permesso di fumare</label>
              </div>
              <div className="form-check-inline col-12 col-sm-5 col-lg-3 ">
                  <input type="checkbox" className="form-check-input" id="bambini" name="bambini" value="true"/>
                  <label className="form-check-label" htmlFor="bambini">Idoneità ad ospitare bambini </label>
              </div>
          </div>

          <h6 className="mt-3 border-bottom border-primary">Descrizione</h6>
            <div className="md-form amber-textarea active-amber-textarea">
                <textarea id="descrizione" name="descrizione" className="md-textarea form-control" rows="5"  maxLength="200" placeholder="Write something here..." onChange={verificaLunghezza}></textarea>
                <p id="feedback" className="text-danger form-text text-muted collapse ">Massimo 200 caratteri</p>
            </div>
        <ButtonForm/>
        </form>

        </div>
)}
export default FormCaratteristicheB