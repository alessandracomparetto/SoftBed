import React from "react";
/*
TODO:
*Inserire pattern per la carta di credito
*/
function SchermataDatoPagamento(){

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
    return(
        <form className="container pt-3 col-xs-10 col-md-10">
        <h6 className="lead mt-3 text-uppercase ">Aggiungi un nuovo metodo di pagamento</h6>
        <h6 className="mt-3">Inserisci i dati della carta:</h6>
            <div className="form-row">
                <div className="form-group col-sm-6 col-md-4">
                    <label htmlFor="Nome">Intestatario carta</label>
                    <input id="name" name="name" type="text" className="form-control" placeholder="Nome Cognome" required/>
                </div>

                <div className="form-group col-sm-6 col-md-4">
                    <label htmlFor="ncarta">Numero carta</label>
                    <input id="ncarta" name="ncarta" type="tel" className="form-control" placeholder="#### #### #### ####" required/>
                </div>

                <div className="form-group col-sm-4 col-md-1">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" name="cvv" type="tel" pattern="^[0-9]{3}$"className="form-control" placeholder="###" required/>
                </div>

                <div className="form-group col-sm-8 col-md-3">
                    <label htmlFor="data">Data di scadenza</label>
                    <input name="data" id="data" type="month" min={minData} defaultValue={minData} className="form-control" required/>
                </div>
            </div>

            <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3 float-right">Aggiungi carta</button>
        </form>
    )
}


export default SchermataDatoPagamento;