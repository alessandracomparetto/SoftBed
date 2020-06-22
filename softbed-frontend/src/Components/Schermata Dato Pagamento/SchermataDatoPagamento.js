import React from "react";
import FormMetodoPagamento from "./FormMetodoPagamento";
/*
TODO:
*Inserire pattern per la carta di credito
*/
function SchermataDatoPagamento(){
    function scriviDato(){
        let listaDatiPagamento = document.getElementById("listaDatiPagamento");
        let nome = document.getElementById("name");
        let ncarta = document.getElementById("ncarta");
        let cvv = document.getElementById("cvv");
        let data = document.getElementById("data");

        let p = document.createElement("P");
        let info = nome.value + "\t\t\t\t\t" + ncarta.value + "\t\t\t\t\t" + cvv.value +"\t\t\t\t\t" + data.value;
        let stringa = document.createTextNode(info);
        p.appendChild(stringa);
        listaDatiPagamento.appendChild(p);
    }
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

    return(
        <div className="container pt-3 col-xs-10 col-md-10">
            <form className="needs-validation" noValidate>
                <h6 className="mt-3 border-bottom border-primary d-inline">Dati di pagamento presenti</h6>
                <img className="img-responsive  ml-3 mb-2" src="http://i76.imgup.net/accepted_c22e0.png"/>


                <div id="listaDatiPagamento" className="mb-3 col-12 mx-auto border pre-scrollable" style={{maxHeight: 30 + 'vh'}}>
                    <div className="container mb-3">
                        <div className="row">
                            <div className="lead mt-3 d-inline col-sm">
                                Intestatario carta
                            </div>
                            <div className="lead mt-3 d-inline col-sm">
                                Numero carta
                            </div>
                            <div className="lead mt-3 d-inline col-sm">
                                CVV
                            </div>
                            <div className="lead mt-3 d-inline col-sm">
                                Data di scadenza
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>
                            <br/>
                        </p>
                    </div>
                </div>

                <br/><br/><br/>
            </form>
            <h6 className="lead mt-3 text-uppercase">Aggiungi un nuovo metodo di pagamento</h6>
            <FormMetodoPagamento/>
        </div>
    )
}


export default SchermataDatoPagamento;