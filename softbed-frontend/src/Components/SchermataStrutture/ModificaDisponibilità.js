import React, {useState} from "react";
import $ from 'jquery';
/* TODO la lista trova contenere i periodi precedentemente inseriti in cui la struttura non è disponibile */
function ModificaDisponibilità(){
    function aggiungiPeriodo(){
        document.getElementById("periodoNonValido").classList.add("collapse");
        document.getElementById("nessunPeriodo").classList.add("collapse");
        //verifico che il periodo non è vuoto
        if( $("#dataInizio").val() == "" && $("#dataFine").val() == ""){
            document.getElementById("nessunPeriodo").classList.remove("collapse");
        }
        else if($("#dataFine").val() < $("#dataInizio").val()){
            document.getElementById("periodoNonValido").classList.remove("collapse");
        }
        else{
            let p = document.createElement("p");
            p.innerText="Periodo: da "+ $("#dataInizio").val() + " a " + $("#dataFine").val();
            document.getElementById("listaPeriodi").appendChild(p);
        }
    }
    /* function gestisciCalendario() {
        document.getElementById("calendario").fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            defaultDate: '2018-11-16',
            navLinks: true,
            editable: true,
            eventLimit: true,
            events: [{
                title: 'All Day Event',
                start: '2018-11-01'
            },
                {
                    title: 'Long Event',
                    start: '2018-11-07',
                    end: '2018-11-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2018-11-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2018-11-16T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2018-11-11',
                    end: '2018-11-13'
                },
                {
                    title: 'Meeting',
                    start: '2018-11-12T10:30:00',
                    end: '2018-11-12T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: '2018-11-12T12:00:00'
                },
                {
                    title: 'Meeting',
                    start: '2018-11-12T14:30:00'
                },
                {
                    title: 'Happy Hour',
                    start: '2018-11-12T17:30:00'
                },
                {
                    title: 'Dinner',
                    start: '2018-11-12T20:00:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2018-11-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'https://google.com/',
                    start: '2018-11-28'
                }
            ]
        });
    }*/
    return(
       <div className="col -6">
           <form className=" d-block mt-2 border-top border-warning">
               <h6 className="mt-3 border-bottom border-primary">Lista dei periodi in cui la tua struttura non è disponibile</h6>
               <div>
                   <div id="listaPeriodi" className="mb-3 col-12 mx-auto border pre-scrollable bg-white" style={{maxHeight: 30 + 'vh'}}>
                       <p></p>
                   </div>
               </div>
               <h6 className="mt-3 border-bottom border-primary">Inserisci il periodo in cui la struttura non è disponibile</h6>
               <div className="form-group row my-auto pt-2">
                   <div className="pb-2 col-12 col-md-6 col-lg-4">
                       <label htmlFor="example-date-input" className="col-8 col-form-label">Data inizio</label>
                       <input className="form-control" type="date" id="dataInizio" name="dataInizio"  required/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4 pb-2">
                       <label htmlFor="example-date-input" className="col-7 col-form-label">Data fine</label>
                       <input className="form-control" type="date" id="dataFine" name="dataFine" required/>
                   </div>
                   <small id="nessunPeriodo" className="text-danger collapse">Inserire un periodo</small>
                   <small id="periodoNonValido" className="text-danger collapse">Selezionare un periodo corretto: la data di inizio è posteriore alla data di fine </small>
                   <div className="col-12 col-lg-3 mt-auto mb-2 ml-lg-auto">
                       <button type="button" className="btn btn-warning btn-block" onClick={aggiungiPeriodo} style={{maxWidth:180+'px'}}>Aggiungi periodo</button>
                   </div>
               </div>
           </form>
           {/* <div id="calendario"  data-provide="calendar"></div>
           {gestisciCalendario()} */}
       </div>
    )
}


export default ModificaDisponibilità;
