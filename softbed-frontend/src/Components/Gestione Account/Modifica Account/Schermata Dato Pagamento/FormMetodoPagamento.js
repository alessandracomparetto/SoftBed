import React, {useState} from "react";
import $ from "jquery";
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
        let nomeIntestatario = document.getElementById("nome");
        let cognomeIntestatario = document.getElementById("cognome");
        let numeroCarta = document.getElementById("ncarta");
        let cvv = document.getElementById("cvv");
        let dataScadenza = document.getElementById("data");

        var form = document.getElementById("form");
        form.classList.add('was-validated');
        if(form.checkValidity()){
            form.classList.remove('was-validated');

            let idUtente = (JSON.parse(window.sessionStorage.getItem("utente"))).idUtente;
            console.log(idUtente);
            let tmp = [...props.listaDatiPagamento];
            let dato = {idUtente: idUtente, nomeIntestatario:nomeIntestatario.value, cognomeIntestatario:cognomeIntestatario.value, numeroCarta:numeroCarta.value, cvv:cvv.value, dataScadenza:dataScadenza.value};
            tmp.push(dato)
            props.setDatiPagamento(tmp);
            try {
                axios.post("/utente/aggiungiDatoPagamento", dato)
                    .then(res => { // then print response status
                        console.log("DATO AGGIUNTO ======= ");
                        console.log(res.data);
                        console.log("Dati aggiunti");
                    });
            }catch(err){
                mostraDialogErrore();
            }

            nomeIntestatario.value="";
            cognomeIntestatario.value="";
            numeroCarta.value="";
            cvv.value="";
            dataScadenza.value="";
        }
    }


    return (
        <form id="form" className="container p-3" noValidate onSubmit={aggiungi}>
            <h6 className="mt-3">Inserisci una nuova carta:</h6>
            <div className="form-row">
                <div className="form-group col-12 col-md-5 ">
                    <label htmlFor="nome">Nome intestatario</label>
                    <input id="nome" name="nomeIntestatario" type="text" className="form-control"  pattern = "^[A-z\sàèìòùÀÈÌÒÙéÉ]+$" placeholder="Nome" maxLength="16" required/>
                    <div className="invalid-feedback">
                        Inserire nome
                    </div>
                </div>

                <div className="form-group col-12 col-md-5 ">
                    <label htmlFor="cognome">Cognome intestatario</label>
                    <input id="cognome" name="cognomeIntestatario" type="text" className="form-control"  pattern = "^[A-z\sàèìòùÀÈÌÒÙéÉ]+$" placeholder="Cognome" maxLength="16" required/>
                    <div className="invalid-feedback">
                        Inserire cognome
                    </div>
                </div>

                <div className="form-group col-12 col-md-4">
                    <label htmlFor="ncarta">Numero carta</label>
                    <input id="ncarta" name="numeroCarta" type="text" className="form-control" pattern="^[0-9]{16}" placeholder="#### #### #### ####" required/>
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
                    <input name="dataScadenza" id="data" type="month" min={minData} className="form-control" required/>
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