import React, { useState } from "react";
import ButtonForm from "../ButtonForm";
import axios from 'axios';


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
            }, false);
        });
    }, false);
})();


function FormTipologiaStruttura(props) {


    function aggiornaTipologia(){
        if(document.getElementById("cv").checked === true){
            props.aggiornaTipologia(document.getElementById("cv").value)
        }else{
            props.aggiornaTipologia(document.getElementById("B&B").value)
        }
    }

    function verificaScelta(event){
        event.preventDefault();
        if(document.getElementById("cv").checked || document.getElementById("B&B").checked){
            document.getElementById("feedback").classList.add("collapse");
            let tip;
            if(document.getElementById("cv").checked === true){
                tip = {tipologia : document.getElementById("cv").value}
            }else{
               tip = {tipologia : document.getElementById("B&B").value}
            }
            try{
                axios.post("/struttura/tipologia", tip)
                    .then( res => console.log(res.status))
            } catch (err) {
                if (err.response.status === 400) {
                    console.log('There was a problem with the server');
                } else {
                    console.log(err.response.data.msg);
                }
            }
        }
        else{
            event.preventDefault();
            document.getElementById("feedback").classList.remove("collapse");
        }
    }
    return(
        <div className="container pt-3 ">
            <div className="progress">
                <div className="progress-bar" style={{width: 20 + '%'}}>20%</div>
            </div>
            <form className="container needs-validation p-3" onSubmit={verificaScelta} onChange={aggiornaTipologia} action="/registrazioneStruttura/informazioniGenerali" noValidate>
                <h6 className="mt-3 border-bottom border-primary">Scegli la tipologia di struttura</h6>
                <div className=" container d-flex justify-content-around">
                    <i className="fa fa-bed fa-10x" aria-hidden="true"></i>
                    <i className="fa fa-home fa-10x " aria-hidden="true"></i>
                </div>
                <div className="form-row ">
                    <div className="col-6 text-center">
                        <div className="custom-control custom-radio custom-control-inline mt-2">
                            <input type="radio" className="custom-control-input" id="cv" name="tipologia" value="cv" required/>
                            <label className="custom-control-label" htmlFor="cv">Casa vacanze</label>
                        </div>
                    </div>
                    <div className="col-6 text-center">
                        <div className="custom-control custom-radio custom-control-inline mt-2">
                            <input type="radio" className="custom-control-input pr-3" id="B&B" name="tipologia" value="B&B"required/>
                            <label className="custom-control-label" htmlFor="B&B">B&B</label>
                        </div>
                    </div>
                    <div id="feedback" className="col-12 text-danger text-center collapse">
                        Inserire la tipologia di struttura
                    </div>
                </div>
            <ButtonForm/>
        </form>
    </div>
    )
}
export default FormTipologiaStruttura
