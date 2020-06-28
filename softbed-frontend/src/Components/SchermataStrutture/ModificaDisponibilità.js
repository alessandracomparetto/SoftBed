import React, {useState} from "react";
import $ from 'jquery';
import {convertiData} from "../../Actions/gestioneDate";
/* TODO la lista trova contenere i periodi precedentemente inseriti in cui la struttura non è disponibile */

function ModificaDisponibilita(){
    const [periodiIndisponibilità,aggiornaPeriodi]=useState([]);
    const prenotazioni=[{dataInizio: new Date("2020-6-2"), dataFine: new Date("2020-7-5")}];
    function aggiungiPeriodo(){
        document.getElementById("periodoNonValido").classList.add("collapse");
        document.getElementById("nessunPeriodo").classList.add("collapse");
        //verifico che il periodo non è vuoto
        let inserisciPeriodo=true;
        if( $("#dataInizio").val() == "" && $("#dataFine").val() == ""){
            document.getElementById("nessunPeriodo").classList.remove("collapse");
            inserisciPeriodo=false;
        }
        if($("#dataFine").val() < $("#dataInizio").val()){
            document.getElementById("periodoNonValido").classList.remove("collapse");
            inserisciPeriodo=false;
        }
        if( prenotazioni.length>=0){
            console.log("entro");
            for (let x in prenotazioni) {
                let flag = false;
                if ($("#dataInizio").val() >= convertiData(prenotazioni[x].dataInizio)  && $("#dataInizio").val() <= convertiData(prenotazioni[x].dataFine)){
                    flag = true;
                    console.log("verificato");
                }
                if (flag) {
                    document.getElementById("prenotazioni").classList.remove("collapse");
                    inserisciPeriodo = false;
                }
            }
        }
        let tmp=[...periodiIndisponibilità];
        if(tmp.length>0) {
            for (let x in tmp) {
                let flag = false;
                if (($("#dataInizio").val() >= tmp[x].dataInizio && $("#dataInizio").val() <= tmp[x].dataFine ) || ( $("#dataInizio").val()<= tmp[x].dataInizio && $("#dataFine").val()>= tmp[x].dataInizio )) {
                    flag = true;
                }
                if (flag) {
                    document.getElementById("periodoIndisiponibile").classList.remove("collapse");
                    inserisciPeriodo = false;
                }
            }
        }
        if(inserisciPeriodo){
            let p = document.createElement("p");
            p.innerText="Periodo: da "+ $("#dataInizio").val() + " a " + $("#dataFine").val();
            document.getElementById("listaPeriodi").appendChild(p);
            tmp.push({dataInizio: $("#dataInizio").val(), dataFine: $("#dataFine").val() })
        }
        aggiornaPeriodi(tmp);
    }
    return(
       <div>
           <form className=" d-block m-2">
               <h6 className="mt-3 border-bottom border-primary">Lista dei periodi in cui la tua struttura non è disponibile</h6>
               <div>
                   <div id="listaPeriodi" className="mb-3 col-12 mx-auto border pre-scrollable bg-white" style={{maxHeight: 30 + 'vh'}}>

                   </div>
               </div>
               <h6 className="mt-3 border-primary">Inserisci il periodo in cui la struttura non è disponibile</h6>
               <div className="form-group row my-auto">
                   <div className="pb-2 col-12 col-md-6 col-lg-4">
                       <label htmlFor="example-date-input" className="col-8 col-form-label">Data inizio</label>
                       <input className="form-control" type="date" id="dataInizio" name="dataInizio"  required/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4 pb-2">
                       <label htmlFor="example-date-input" className="col-7 col-form-label">Data fine</label>
                       <input className="form-control" type="date" id="dataFine" name="dataFine" required/>
                   </div>
                   <div className="col-12 col-lg-4 mt-auto mb-2 ml-lg-auto">
                       <button type="button" className="btn btn-warning btn-block" onClick={aggiungiPeriodo} style={{maxWidth:180+'px'}}>Aggiungi periodo</button>
                   </div>
                   <small id="nessunPeriodo" className="text-danger collapse ml-3"> Inserire un periodo </small>
                   <small id="periodoNonValido" className="text-danger collapse ml-3"> Selezionare un periodo corretto: la data di inizio è posteriore alla data di fine </small>
                   <small id="periodoIndisiponibile" className="text-danger collapse ml-3"> Hai già inserito un periodo in cui la struttura non è disponibile.Riprova. </small>
                   <small id="prenotazioni" className="text-danger collapse ml-3"> Non è possibile aggiungere il periodo: vi sono già delle prenotazioni </small>
               </div>
           </form>
       </div>
    )
}
export default ModificaDisponibilita;
