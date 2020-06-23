import React, {useState} from "react";
import $ from 'jquery';

function CalcoloGuadagno(){
    function visualizza(event) {
        let form = $(event.target).parent().parent().parent()
        $(form).addClass("was-validated");
        let dataInizioDIV = $(form).children().children().first()
        let dataInizio = $(dataInizioDIV).children("input");
        let dataFineDIV= $(dataInizioDIV).next();
        let dataFine = $(dataFineDIV).children("input")

        if($(dataInizio).val() && $(dataFine).val()){
            let calcolo = $(form).children().children().last();
            $(calcolo).toggleClass("collapse");
        }
    }

    return(
        <form className="d-block mt-2 border-top border-warning">
           <div className="form-group row my-auto pt-2">
               <div className="pb-2 col-12 col-md-4">
                   <label htmlFor="example-date-input" className="col-8 col-form-label">Data inzio</label>
                   <input className="form-control" type="date" id="dataInizio" name="dataInizio" required/>
               </div>
               <div className="col-12 col-md-4 pb-2">
                   <label htmlFor="example-date-input" className="col-7 col-form-label">Data fine</label>
                   <input className="form-control" type="date" id="dataFine" name="dataFine" required/>
               </div>
               <div className="col-12 col-md-4 col-lg-3 mt-auto mb-2 ml-lg-auto">
                   <button type="button" className="btn btn-warning btn-block" onClick={visualizza}>Calcola</button>
               </div>
               <div className="col-12 row text-center pt-3 collapse">
                   <h3 className="col-12 col-md-6 mx-auto">Guadagno totalizzato €12,50</h3>
               </div>
           </div>
        </form>
    )
}


export default CalcoloGuadagno;
