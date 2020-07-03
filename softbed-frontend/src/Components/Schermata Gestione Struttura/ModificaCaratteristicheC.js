import React from "react";
import FormCaratteristicheC from "../Registrazione Struttura/FormCaratteristicheC";
import axios from "axios";
import mostraDialogErrore from "../../Actions/errore";
import mostraDialogConferma from "../../Actions/conferma_struttura";

function ModificaCaratteristicheC(props){
    function modificaCaratteristiche(event) {
        event.preventDefault()
        try {
            let dato = props.props;
            dato["idStruttura"]=props.idStruttura;
            console.log("Inizio la richiesta");
            axios.post('/struttura/modificaCaratteristicheCasaVacanze', dato)
                .then(res => { // then print response status
                    if(res.status===200){
                        console.log(res.data);
                        let contatore=props.flag+1;
                        //aggiorno lo stato flag presente nella Schermata Gestione Struttura
                        props.setFlag(contatore);
                        mostraDialogConferma();
                    }
                }).catch(()=> console.log("Nesssuna riga modificata"))
        } catch (e) {
            mostraDialogErrore();
        }
    }
    return(
        <form id="form" className="p-3" >
            <FormCaratteristicheC dati={props.props} handleChange={props.handleChange}/>
            <div className="d-flex flex-row-reverse justify-content-center">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={modificaCaratteristiche} >Conferma</button>
            </div>
        </form>
    )
}

export default ModificaCaratteristicheC;