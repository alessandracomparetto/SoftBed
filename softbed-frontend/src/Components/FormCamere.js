import React from "react";
import ButtonForm from "./ButtonForm";

(function() {
    'use strict';
    window.addEventListener('load', function() {
// Fetch all the forms we want to apply custom Bootstrap validation styles to
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

function FormCamere(){
    return(
        <form className="container col-12 col-md-8 needs-validation" noValidate>
            <h6 className="mt-3 border-bottom border-primary">Camere presenti</h6>
            <div>
                <div id="listaCamere" className="mb-3 col-12 mx-auto border pre-scrollable" style={{maxHeight: 30 + 'vh'}}>
                    <p>
                        <br/>
                    </p>

                </div>
            </div>

            <div className="form-group bootstrap-select-wrapper">
                <label htmlFor="tipologiaCamera">Tipologia di camera</label>
                <select className="form-control selectpicker" required>
                    <option value="" disabled selected>Scegli una opzione</option>
                    <option value="Singola">Singola</option>
                    <option value="Doppia">Doppia</option>
                    <option value="Tripla">Tripla</option>
                    <option value="Quadrupla">Quadrupla</option>
                </select>
            </div>


            <div className="form-group">
                <label htmlFor="nLettiMatrimoniali">Numero letti matrimoniali</label>
                <input name="nLettiMatrimoniali" id="nLettiMatrimoniali" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" required/>
                <div className="invalid-feedback">
                    1 - 10
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="nLettiSingoli">Numero letti singoli </label>
                <input name="nLettiSingoli" id="nLettiSingoli" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" required />
                <div className="invalid-feedback">
                    1 - 10
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="nCamere">Numero di camere per questa tipologia </label>
                <input name="nCamere" id="nCamere" type="number" className="form-control" min="1" max="10" size="2" maxLength="2" required />
                <div className="invalid-feedback">
                    1 - 10
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="prezzo">Prezzo base a notte</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">€</span>
                    </div>
                    <input name="prezzo" id="prezzo" type="number" className="form-control currency" min="0" step="0.01" max="10000" required/>
                </div>
                <div className="invalid-feedback">
                    Inserire il prezzo base a notte
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary">
                    Aggiungi camera
                </button>
            </div>

            <ButtonForm/>

        </form>

    )
}
export default FormCamere
