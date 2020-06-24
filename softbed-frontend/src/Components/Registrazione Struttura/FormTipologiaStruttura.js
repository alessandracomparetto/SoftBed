import React, { useState } from "react";
import ButtonForm from "../ButtonForm";
import data from "../../regioni_province_comuni.js";
import $ from "jquery"

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


function FormTipologiaStruttura(){
    const [URL, setURL] = useState("");

    function verso(){
        if(document.getElementById("cv").checked === true){
            setURL("/registrazioneStruttura/ambienti");
        }else{
            setURL("/registrazioneStruttura/camere");
        }
    }
    function verificaScelta(event){
        if(document.getElementById("cv").checked || document.getElementById("B&B").checked){
            document.getElementById("feedback").classList.add("collapse");
        }
        else{
            document.getElementById("feedback").classList.remove("collapse");
        }
    }
    return(
        <div className="container pt-3 ">
            <div className="progress">
                <div className="progress-bar" style={{width: 20 + '%'}}>20%</div>
            </div>
            <form className="container needs-validation p-3" onChange={verso} onSubmit={verificaScelta} action={URL} noValidate>
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
