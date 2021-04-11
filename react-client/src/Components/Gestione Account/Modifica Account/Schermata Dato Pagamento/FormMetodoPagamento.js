import React from "react";
import axios from "axios";
import mostraDialogErrore from "../../../../Actions/errore";
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

    function aggiungi(e) {
        e.preventDefault();
        let nomeintestatario = document.getElementById("nome");
        let cognomeintestatario = document.getElementById("cognome");
        let numerocarta = document.getElementById("ncarta");
        let cvv = document.getElementById("cvv");
        let datascadenza = document.getElementById("data");

        let form = document.getElementById("form");
        form.classList.add('was-validated');

        if (form.checkValidity()) {
            form.classList.remove('was-validated');

            let idutente = (JSON.parse(window.sessionStorage.getItem("utente"))).idutente;

            let tmp = [...props.listaDatiPagamento];
            let dato = {
                idutente: idutente,
                nomeintestatario: nomeintestatario.value,
                cognomeintestatario: cognomeintestatario.value,
                numerocarta: numerocarta.value,
                cvv: cvv.value,
                datascadenza: datascadenza.value
            };

            tmp.push(dato)

            axios.post("/user/aggiungiDatoPagamento", dato)
                .then(() => {
                    // Aggiornamento dei metodi di pagamento selezionabili
                    props.setDatiPagamento(tmp)

                    // Pulizia dei campi di inserimento metodo di pagamento
                    nomeintestatario.value = "";
                    cognomeintestatario.value = "";
                    numerocarta.value = "";
                    cvv.value = "";
                    datascadenza.value = "";
                })
                .catch(() => {mostraDialogErrore()})
        }
    }


    return (
        <form id="form" className="container p-3" noValidate onSubmit={aggiungi}>
            <h6 className="mt-3">Inserisci una nuova carta:</h6>
            <div className="form-row">
                <div className="form-group col-12 col-md-5 ">
                    <label htmlFor="nome">Nome intestatario</label>
                    <input id="nome" name="nomeintestatario" type="text" className="form-control"  pattern = "^[A-z\sàèìòùÀÈÌÒÙéÉ]+$" placeholder="Nome" maxLength="16" required/>
                    <div className="invalid-feedback">
                        Inserire nome
                    </div>
                </div>

                <div className="form-group col-12 col-md-5 ">
                    <label htmlFor="cognome">Cognome intestatario</label>
                    <input id="cognome" name="cognomeintestatario" type="text" className="form-control"  pattern = "^[A-z\sàèìòùÀÈÌÒÙéÉ]+$" placeholder="Cognome" maxLength="16" required/>
                    <div className="invalid-feedback">
                        Inserire cognome
                    </div>
                </div>

                <div className="form-group col-12 col-md-4">
                    <label htmlFor="ncarta">Numero carta</label>
                    <input id="ncarta" name="numerocarta" type="text" className="form-control" pattern="^[0-9]{16}" placeholder="#### #### #### ####" required/>
                    <div className="invalid-feedback">
                        Inserire numero carta
                    </div>
                </div>

                <div className="form-group col-5 col-md-2">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" name="cvv" type="tel" pattern="^[0-9]{3}$" className="form-control" placeholder="###" required/>
                    <div className="invalid-feedback">
                        Inserire CVV
                    </div>
                </div>

                <div className="form-group col-7 col-md-4">
                    <label htmlFor="data">Data di scadenza</label>
                    <input name="datascadenza" id="data" type="month" min={minData} className="form-control" required/>
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