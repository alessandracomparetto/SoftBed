import React from "react";

function FormCaratteristicheB(){
return(
<div className="container">
  <h2>Caratteristiche</h2>
  <form className="w50 justify-content-center mt-3">
  <h6 className="mt-3 border-bottom border-primary">Servizi disponibili</h6>
      <div className="form-group text-center">
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" value="something" name="connessione"
                         />Connessione Wi-fi
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="riscaldamento">
                  <input type="checkbox" className="form-check-input" id="riscaldamento" name="riscaldamento"
                         value="something"/>Riscaldamento
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="cucina">
                  <input type="checkbox" className="form-check-input" id="cucina" name="cucina" value="something"/>Cucina
                  per celiaci
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="disabili">
                  <input type="checkbox" className="form-check-input" id="disabili" name="disabili" value="something"/>Strutture
                  per disabili
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="aria">
                  <input type="checkbox" className="form-check-input" id="aria" name="aria" value="something"/>Aria
                  condizionata
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="tv">
                  <input type="checkbox" className="form-check-input" id="tv" name="tv" value="something"/>TV
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="navettaAereoportuale">
                  <input type="checkbox" className="form-check-input" id="navettaAereoportuale"
                         name="navettaAereoportuale" value="something"/>Navetta aereoportuale
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="parcheggio">
                  <input type="checkbox" className="form-check-input" id="parcheggio" name="parcheggio"
                         value="something"/>Parcheggio
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="servizioInCamera">
                  <input type="checkbox" className="form-check-input" id="servizioInCamera" name="servizioInCamera"
                         value="something"/>Servizio in camera
              </label>
          </div>
      </div>

    <h6 className="mt-3 border-bottom border-primary">Sugli ospiti</h6>
      <div className="form-group text-center">
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="bambini">
                  <input type="checkbox" className="form-check-input" id="bambini" name="bambini" value="something"/>Idoneità
                  ad ospitare bambini
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="animali">
                  <input type="checkbox" className="form-check-input" id="animali" name="animali" value="something"/>Animali
                  ammessi
              </label>
          </div>
          <div className="form-check-inline col-12 col-md-4 col-lg-3">
              <label className="form-check-label" htmlFor="permessoFumo">
                  <input type="checkbox" className="form-check-input" id="permessoFumo" name="permessoFumo"
                         value="something"/>Permesso di fumare
              </label>
          </div>
      </div>

      <h6 className="mt-3 border-bottom border-primary">Descrizione</h6>
      <div className="md-form amber-textarea active-amber-textarea">
      <textarea id="descrizione" className="md-textarea form-control" rows="5"  placeholder="Write something here..."></textarea>
    </div>
  </form>
    <div className="d-flex col-12 col-sm-10 mx-auto justify-content-between m-5">
        <button type="button" className="btn btn-outline-danger btn-lg">Indietro</button>
        <button type="button" className="btn btn-primary col-3 btn-block">Continua</button>
    </div>
</div>
)}
export default FormCaratteristicheB