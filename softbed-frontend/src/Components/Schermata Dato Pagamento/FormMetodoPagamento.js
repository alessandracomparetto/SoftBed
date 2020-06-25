import React, {useState} from "react";
import $ from "jquery";
function FormMetodoPagamento(props) {

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

    const[dato, setDato] = useState( {nomeIntestatario:"cioa", cognomeIntestatario:"ciao", numeroCarta:"1234123412341234", cvv:"123", dataScadenza:"12-03-20"});

    function onSubmit(e) {
        e.preventDefault();
        props.aggiungiDatoPagamento(dato);
    }

   function setNome(event){
       let tmp = dato;
       tmp.nomeIntestatario=event.target.value;
       setDato(tmp);
    }
    function setCognome(event){
        let tmp = dato;
        tmp.cognomeIntestatario=event.target.value;
        setDato(tmp);
    }
    function setNumeroCarta(event){
        let tmp = dato;
        tmp.numeroCarta=event.target.value;
        setDato(tmp);
    }
    function setCVV(event){
        let tmp = dato;
        tmp.cvv=event.target.value;
        setDato(tmp);
    }
    function setDataScadenza(event){
        let tmp = dato;
        tmp.dataScadenza=event.target.value;
        setDato(tmp);
    }
    return (
        <form className=" needs-validation" noValidate onSubmit={onSubmit}>
            <h6 className="mt-3">Inserisci una nuova carta:</h6>
            <div className="form-row">
                <div className="form-group col-12 col-md-5 ">
                    <label htmlFor="nome">Nome intestatario</label>
                    <input id="nome" name="nome" type="text" className="form-control" pattern = "^[A-z]+$" placeholder="Nome" maxLength="16" onChange={setNome} required/>
                    <div className="invalid-feedback">
                        Inserire nome
                    </div>
                </div>

                <div className="form-group col-12 col-md-5 ">
                    <label htmlFor="cognome">Cognome intestatario</label>
                    <input id="cognome" name="cognome" type="text" className="form-control" pattern = "^[A-z]+$" placeholder="Cognome" maxLength="16" onChange={setCognome} required/>
                    <div className="invalid-feedback">
                        Inserire cognome
                    </div>
                </div>

                <div className="form-group col-12 col-md-4">
                    <label htmlFor="ncarta">Numero carta</label>
                    <input id="ncarta" name="ncarta" type="text" className="form-control" pattern="^[0-9]{16}" placeholder="#### #### #### ####" onChange={setNumeroCarta} required/>
                    <div className="invalid-feedback">
                        Inserire numero carta
                    </div>
                </div>

                <div className="form-group col-5 col-md-2">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" name="cvv" type="tel" pattern="^[0-9]{3}$"className="form-control" placeholder="###" onChange={setCVV} required/>
                    <div className="invalid-feedback">
                        Inserire CVV
                    </div>
                </div>

                <div className="form-group col-7 col-md-4">
                    <label htmlFor="data">Data di scadenza</label>
                    <input name="data" id="data" type="month" min={minData} className="form-control" onChange={setDataScadenza} required/>
                    <div className="invalid-feedback">
                        Inserire data di scadenza
                    </div>
                </div>
                <div className=" col-12 col-md-2 btn-group d-flex justify-content-around">
                    <button name="ok" id="ok" type="submit" className="btn btn-warning btn-block mt-4 mb-2" style={{width: 100 + 'px'}} >Aggiungi</button>
                </div>

            </div>

        </form>
    )
}

export default FormMetodoPagamento;