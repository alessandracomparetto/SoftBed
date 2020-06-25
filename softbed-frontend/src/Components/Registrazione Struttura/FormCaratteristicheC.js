import React from "react";
import ButtonForm from "../ButtonForm";
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

function FormCaratteristicheC(props){
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
            <h4>Caratteristiche Casa vacanze</h4>
            <form className="w50  mt-3 needs-validation" action="caratteristicheC/condizioni"  onChange={props.handleChange} noValidate>
                <h6 className="mt-3 border-bottom border-primary">Servizi disponibili</h6>
                <div className="form-row-group text-center offset-2">
                    <div className="form-check-inline col-12 col-md-5">
                        <input type="checkbox" className="form-check-input" value="true" name="connessione"/>
                        <label className="form-check-label">Connessione Wi-fi</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5">
                        <input type="checkbox" className="form-check-input" id="riscaldamento" name="riscaldamento"
                               value="true"/>
                        <label className="form-check-label" htmlFor="riscaldamento">Riscaldamento</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 ">
                        <input type="checkbox" className="form-check-input" id="disabili" name="disabili" value="true"/>
                        <label className="form-check-label" htmlFor="disabili">Strutture per disabili
                        </label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 ">
                        <input type="checkbox" className="form-check-input" id="aria" name="aria" value="true"/>
                        <label className="form-check-label" htmlFor="aria">Aria condizionata</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 ">
                        <input type="checkbox" className="form-check-input" id="tv" name="tv" value="true"/>
                        <label className="form-check-label" htmlFor="tv">TV</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 ">
                        <input type="checkbox" className="form-check-input" id="parcheggio" name="parcheggio"
                               value="true"/>
                        <label className="form-check-label" htmlFor="parcheggio">Parcheggio</label>
                    </div>
                </div>

                <h6 className="mt-3 border-bottom border-primary">Sugli ospiti</h6>
                <div className="form-row-group text-center offset-2">
                    <div className="form-check-inline col-12 col-md-5 text-left p-0">
                        <input type="checkbox" className="form-check-input" id="feste" name="feste" value="true"/>
                        <label className="form-check-label" htmlFor="feste" style={{minWidth : 290+'px'}}>Permesso per feste/eventi</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5">
                        <input type="checkbox" className="form-check-input" id="animali" name="animali" value="true"/>
                        <label className="form-check-label" htmlFor="animali">Animali ammessi</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5">
                        <input type="checkbox" className="form-check-input" id="permessoFumo" name="permessoFumo" value="true"/>
                        <label className="form-check-label" htmlFor="permessoFumo">Permesso di fumare</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 p-0 text-left">
                        <input type="checkbox" className="form-check-input" id="bambini" name="bambini" value="true"/>
                        <label className="form-check-label " htmlFor="bambini" style={{minWidth : 290+'px'}}>Idoneità ad ospitare bambini</label>
                    </div>
                </div>

                <h6 className="mt-3 border-bottom border-primary">Descrizione</h6>
                <div className="md-form amber-textarea active-amber-textarea">
                    <textarea id="descrizione" name="descrizione" className="md-textarea form-control" rows="5"  maxLength="200" placeholder="Write something here..." onChange={verificaLunghezza}></textarea>
                    <p id="feedback" className="text-danger form-text text-muted collapse ">Hai raggiunto il massimo di 200 caratteri</p>
                </div>
            </form>
        </div>
    )}
export default FormCaratteristicheC