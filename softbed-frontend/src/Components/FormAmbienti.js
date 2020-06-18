import React, {useState} from 'react';
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



function FormAmbienti() {
    /* TODO: PROPS
    *  Durante la modifica la pagina deve apparire compilata
    *  TODO: centrare checkbox
    *
    */
    const stringa = "Camera ";
    const [contatore, setContatore] = useState(1);

    function scriviCamera() {
        var lista = document.getElementById("listaCamere");
        if (contatore === 1){
            lista.removeChild(lista.childNodes[0]);
        }
        setContatore(contatore+1);
        var p =  document.createElement("P");
        var camera = document.createTextNode(stringa + contatore);
        p.appendChild(camera);
        lista.appendChild(p);
    }


    return(
        <form className="container col-12 col-md-8 needs-validation" noValidate>
            <h6 className="mt-3 border-bottom border-primary">Ambienti presenti</h6>
            <div className="form-row-group text-center">
                <div className="form-check-inline col-12 col-sm-5">
                    <input type="checkbox" className="mr-1" name="salotto" id="salotto"/>
                    <label className="form-check-label text-center" htmlFor="salotto">Salotto</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5">
                    <input type="checkbox" className="mr-1" name="terrazza" id="terrazza"/>
                    <label className="form-check-label" htmlFor="terrazza">Terrazza</label>
                </div>
            </div>
            <div className="form-row-group text-center">
                <div className="form-check-inline col-12 col-sm-5">
                    <input type="checkbox" className="mr-1" name="giardino" id="giardino"/>
                    <label className="form-check-label" htmlFor="giardino">Giardino</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5">
                    <input type="checkbox" className="mr-1" name="piscina" id="piscina"/>
                    <label className="form-check-label" htmlFor="piscina">Piscina</label>
                </div>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Camere presenti</h6>
            <div>
                <div id="listaCamere" className="mb-3 col-12 mx-auto border pre-scrollable" style={{maxHeight: 30 + 'vh'}}>
                    <p>
                        <br/>
                    </p>

                </div>
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
                <input name="nLettiSingoli" id="nLettiSingoli" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" required/>
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

            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary" onClick={scriviCamera}>
                    Aggiungi camera
                </button>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Informazioni generali</h6>
            <div className="form-group">
                <label htmlFor="nBagni">Numero bagni</label>
                <input name="nBagni" type="number" className="form-control" min={0} max={5} required/>
            </div>
            <div className="input-group">
                <label htmlFor="prezzo">Prezzo struttura (a notte)</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">€</span>
                    </div>
                    <input name="prezzo" type="number" className="form-control currency" min="0" step="0.01" max="10000" required/>
                </div>
                <div className="invalid-feedback">
                    Inserire il prezzo base a notte
                </div>
            </div>

            <ButtonForm/>
        </form>



    )
}

export default FormAmbienti;

