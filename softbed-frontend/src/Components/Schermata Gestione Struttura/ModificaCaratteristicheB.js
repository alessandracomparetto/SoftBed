import React, {useEffect} from "react"
import FormCaratteristicheB from "../Registrazione Struttura/FormCaratteristicheB";
import axios from "axios";
import ModificaCondizioni from "./ModificaCondizioni";

function ModificaCaratteristicheB(props){

    function modificaCaratteristiche(event) {
        event.preventDefault()
        try {
           let dato = props.props;
            dato["idStruttura"]=props.idStruttura;
            console.log("Inizio la richiesta");
            console.log(dato)
            axios.post('/struttura/modificaCaratteristicheB&B', dato)
                .then(res => { // then print response status
                    if (res.status === 200) {
                        console.log(res.data);
                        console.log("OK");
                    }
                }).catch(() => console.log("Nesssuna riga modificata"))
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <form id="form" className="p-3" >
            <FormCaratteristicheB dati={props.props} handleChange={props.handleChange}/>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={modificaCaratteristiche}> Conferma </button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px">Annulla</button>
            </div>
        </form>
    )
}

export default ModificaCaratteristicheB;
