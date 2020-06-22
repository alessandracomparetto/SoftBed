import React from "react";

function FormMetodoPagamento() {

    const GIORNO = 86400000;
    const dataAttuale = new Date();
    //la data di scadenza deve essere maggiore o uguale al mese attuale
    const primaData = new Date(dataAttuale.getTime());
    const minData = convertiData(primaData);

    // Converte la data da oggetto Date a stringa in formato "MM-GG"
    function convertiData (data) {
        // +1 poiché getMonth() restituisce valori da 0 (Gennaio) a 11 (Dicembre).
        const mese = (data.getMonth() + 1).toString().padStart(2, "0");
        const anno = data.getFullYear();
        return anno + "-" + mese;
    }

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

    return (
        <form className="needs-validation" noValidate>
            <h6 className="mt-3">Inserisci i dati della carta:</h6>
            <div className="form-row">
                <div className="form-group col-sm-6 col-md-4 validazione">
                    <label htmlFor="name">Intestatario carta</label>
                    <input id="name" name="name" type="text" className="form-control" pattern = "^[A-z]+\s[A-z]+" placeholder="Nome e Cognome" required/>
                    <div className="invalid-feedback">
                        Inserire nome e cognome
                    </div>
                </div>

                <div className="form-group col-sm-6 col-md-4">
                    <label htmlFor="ncarta">Numero carta</label>
                    <input id="ncarta" name="ncarta" type="tel" className="form-control" pattern="^[0-9]{16}" placeholder="#### #### #### ####" required/>
                    <div className="invalid-feedback">
                        Inserire numero carta
                    </div>
                </div>

                <div className="form-group col-sm-4 col-md-1">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" name="cvv" type="tel" pattern="^[0-9]{3}$"className="form-control" placeholder="###" required/>
                    <div className="invalid-feedback">
                        Inserire CVV
                    </div>
                </div>

                <div className="form-group col-sm-8 col-md-3">
                    <label htmlFor="data">Data di scadenza</label>
                    <input name="data" id="data" type="month" min={minData} className="form-control" required/>
                    <div className="invalid-feedback">
                        Inserire data di scadenza
                    </div>
                </div>
            </div>

            <div className="text-right">
                <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3" >Aggiungi carta</button>
            </div>
        </form>
    )
}

export default FormMetodoPagamento;