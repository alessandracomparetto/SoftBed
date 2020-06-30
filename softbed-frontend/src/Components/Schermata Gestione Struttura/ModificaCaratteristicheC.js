import React from "react";
import FormCaratteristicheC from "../Registrazione Struttura/FormCaratteristicheC";
import axios from "axios";
function ModificaCaratteristicheC(props){
    function modificaCaratteristiche(event) {
        event.preventDefault()
        try {
            let dato = props.props;
            console.log("DATI======= ");
            console.log(dato);
            axios.post('/struttura/modificaCaratteristicheCasaVacanze', dato)
                .then(res => { // then print response status
                    if(res.status===200){
                        console.log(res.data);
                        console.log("OK");
                    }
                }).catch(()=> console.log("Nesssuna riga modificata"))
        } catch (e) {
            console.log(e);
        }
    }
    return(
        <form id="form" className="p-3 needs-validation" onChange={props.handleChange} noValidate>
            <FormCaratteristicheC dati={props.props}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={modificaCaratteristiche} >Conferma</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" >Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCaratteristicheC;