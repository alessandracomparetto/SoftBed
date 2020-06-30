import React, {useState} from "react";
import $ from 'jquery';
import axios from 'axios';

function CalcoloGuadagno(props){
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");
    const [guadagno, setGuadagno] = useState("");
    const GIORNO = 86400000;

    function calcola(event) {
        let form = $(event.target).parent().parent().parent()
        $(form).addClass("was-validated");
        let dataInizioDIV = $(form).children().children().first()
        let dataInizio = $(dataInizioDIV).children("input");
        let dataFineDIV= $(dataInizioDIV).next();
        let dataFine = $(dataFineDIV).children("input")

        if($(dataInizio).val() && $(dataFine).val()){
            try{
                axios.get('/struttura/calcoloGaudagno', props.idStruttura)
                    .then ( res =>{
                        setGuadagno(res.body)
                    })

            }catch (err) {
                console.log(err);
            }
            let calcolo = $(form).children().children().last();
            $(calcolo).toggleClass("collapse");
        }
    }
    function aggiornaDataFine(event) {
        let copia = dataFine;
        let data1 = new Date(event.target.value);
        let data1Convertita = convertiData(data1);
        setDataInizio (data1Convertita)
        if(!copia || data1Convertita >= copia){
            const nuovaData = new Date(data1.getTime() + 7*GIORNO);
            const nuovaDataConvertita = convertiData(nuovaData);
            setDataFine(nuovaDataConvertita);
        }
    }
    function aggiornaDataInizio(event) {
        let copia = dataInizio;
        let data2 = new Date(event.target.value);
        let data2Convertita = convertiData(data2);
        setDataFine(data2Convertita);
        if(!copia || data2Convertita <= copia) {
            const nuovaData = new Date(data2.getTime() - 7*GIORNO);
            const nuovaDataConvertita = convertiData(nuovaData);
            setDataInizio(nuovaDataConvertita);
        }
    }

    function convertiData (data) {
        const giorno = data.getDate().toString().padStart(2, "0");
        const mese = (data.getMonth() + 1).toString().padStart(2, "0");
        const anno = data.getFullYear();
        return anno + "-" + mese + "-" + giorno;
    }

    return(
        <form className="d-block mt-2 border-top border-warning">
           <div className="form-group row my-auto pt-2">
               <div className="pb-2 col-12 col-md-4">
                   <label htmlFor="example-date-input" className="col-8 col-form-label">Data inzio</label>
                   <input className="form-control" type="date" id="dataInizio" name="dataInizio"  value={dataInizio} onChange={aggiornaDataFine} required/>
               </div>
               <div className="col-12 col-md-4 pb-2">
                   <label htmlFor="example-date-input" className="col-7 col-form-label">Data fine</label>
                   <input className="form-control" type="date" id="dataFine" name="dataFine" value={dataFine} onChange={aggiornaDataInizio} required/>
               </div>
               <div className="col-12 col-md-4 col-lg-3 mt-auto mb-2 ml-lg-auto">
                   <button type="button" className="btn btn-warning btn-block" onClick={calcola}>Calcola</button>
               </div>
               <div className="col-12 row text-center pt-3 collapse">
                   <h3 className="col-12 col-md-6 mx-auto">Guadagno totalizzato ${guadagno}€</h3>
               </div>
           </div>
        </form>
    )
}


export default CalcoloGuadagno;
