import React, {useEffect, useState} from "react";
import FormDatiOspite from "./FormDatiOspite";
import OspitiInseriti from "./OspitiInseriti";
import axios from "axios";
import {useParams, useHistory, useLocation} from "react-router-dom";
import reindirizza from "../../Actions/reindirizzamento";
import $ from "jquery";
import RiepilogoDatiQuestura from "./RiepilogoDatiQuestura";
function SchermataDatiOspiti(props){
    const[listaOspiti, setOspiti] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const {idStruttura, refPrenotazione} = useParams();
    const [flag, setFlag] = useState(0);
    useEffect(() => {

        axios.post(`/ospite/fetch`,[refPrenotazione]).then(res => {
            console.log("DATI OSPITI RECUPERATI=======");
            console.log(res.data);
            setOspiti(res.data);
        })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        console.log("Ciao");
    }, [flag]);


    function aggiungiOspite(dato) {
        try {
            console.log(listaOspiti);
            dato.refPrenotazione = refPrenotazione;
            console.log(dato);
            axios.post("/ospite/aggiungi", dato)
                .then(res => { // then print response status
                    let tmp = [...listaOspiti];
                    console.log("TMP COPIATO" ,tmp);
                    dato.idOspite = res.data.insertId;
                    tmp.push(dato);
                    setOspiti(tmp);
                    console.log("OSPITI",tmp);
                    let contatore = flag +1;
                    setFlag(contatore);
                });
        }catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }

    }

   const eliminaOspite = (idOspite, refPrenotazione, indice) => {
        console.log("Sono qui");
        console.log(idOspite);
        console.log(refPrenotazione);
        try {
            axios.post(`/ospite/elimina`, {"idOspite":idOspite, "refPrenotazione":refPrenotazione})
                .then(res => { // then print response status
                    console.log("OSPITE ELIMINATO ======= ");
                    console.log(res.data);
                    // Rimuovere dalla lista
                    let tmp = [...listaOspiti];
                    tmp.splice(indice, 1);
                    setOspiti(tmp);
                });
        }catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }

    }


    const verificaDatiAggiuntivi = (event)=>{
        event.preventDefault();
        let utente = JSON.parse(window.sessionStorage.getItem("utente"));
        /*if(utente[0].refIndirizzo === null || utente[0].refComuneNascita=== null){
            // Se il gestore non ha inserito i propri dati, viene rimandato al form dati aggiuntivi
            reindirizza(history, {
                pathname:`/utente/${utente[0].idUtente}/modificaAccount`,
                state: {
                    provenienza: 'Schermata dati Ospiti',
                    urlProvenienza: location.pathname
                }
            }, 3000, "Devi inserire i tuoi dati personali per poter completare la dichiarazione degli ospiti.");

        }
        else*/
        document.getElementById("ospiti").classList.add("collapse");
        document.getElementById("riepilogo").classList.remove("collapse");
    }



    return(

        <div  className="container my-3" >

            <div id ="ospiti" >
                <div  className="my-3">
                    <h4 className="mt-3 d-inline">I tuoi ospiti</h4>
                    <ul className="list-group list-group-flush mt-3 ">
                        {
                            listaOspiti.map((ospiti, indice) => {
                                return <OspitiInseriti key={indice} indiceElemento={indice} idOspite={ospiti.idOspite} nome={ospiti.nome} cognome={ospiti.cognome}
                                                      codiceFiscale={ospiti.codiceFiscale} dataNascita={ospiti.dataNascita.split("T")[0]}
                                                      comune={ospiti.comuneNascita} provincia={ospiti.provinciaNascita} regione={ospiti.regione}
                                                      via={ospiti.via} numero={ospiti.numeroCivico} cap={ospiti.cap}
                                                       comuneResidenza={ospiti.comuneResidenza} provinciaResidenza={ospiti.provinciaResidenza}
                                                       regioneResidenza={ospiti.nomeRegioneResidenza} tassa={ospiti.tassa} dataArrivo={ospiti.dataArrivo.split("T")[0]}
                                                       permanenza={ospiti.permanenza} refPrenotazione={ospiti.refPrenotazione} eliminaOspite={eliminaOspite}/>
                            })

                        }
                    </ul>
                </div>

                <FormDatiOspite aggiungiOspite={aggiungiOspite}/>
                <button name="ok" id="ok" type="button" className="btn btn-danger mt-4 mb-4 float-right" onClick={verificaDatiAggiuntivi}>Procedi alla dichiarazione</button>
            </div>
            <div id = "riepilogo" className="my-3 collapse">
                       <RiepilogoDatiQuestura dati={listaOspiti} idStruttura={idStruttura}/>
            </div>

        </div>


    )
}


export default SchermataDatiOspiti;