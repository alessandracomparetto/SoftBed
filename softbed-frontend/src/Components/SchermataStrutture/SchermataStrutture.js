import React, {useEffect, useState} from "react";
import CalcoloGuadagno from "./CalcoloGuadagno"
import $ from 'jquery';
import {Link, Route} from "react-router-dom";
import axios from "axios";

function SchermataStrutture(){
    const [listaStrutture,setLista]=useState([]);
    const [lunghezza, setLunghezza] = useState("");
    useEffect(() => {
        if(!window.sessionStorage.getItem("strutture")){
            axios.get('/struttura/listaStruttureGestore') //prendo la lista delle strutture se non è presente il session storage
            .then(res => {
                console.log(res.data);
                setLista(res.data);
                window.sessionStorage.setItem("strutture", JSON.stringify(res.data));
            }).catch(err => console.log(err));
        } else{
            setLista(JSON.parse(window.sessionStorage.getItem("strutture")));
        }
    }, []);

    function apri(event) {
        let calcolo = event.target.closest("li").lastChild;
        $(calcolo).toggleClass("collapse")
    }
    return(
        <div className="container">
            <h4>Strutture registrare</h4>
            <ul className="list-group list-group-flush ">
                {
                    listaStrutture.map((struttura, indice) => {
                        return(
                            <li className={"list-group-item border border-dark border-top-"+ ((indice === 0)? "" : 0)} key={indice}>
                                <div className="row d-flex justify-content-center">
                                    <div className="col-4 col-md-3 my-auto text-center">
                                        <strong>{struttura.nomeStruttura}</strong>
                                    </div>
                                    <div className="col-4 col-md-3 my-auto text-center">
                                        <strong>{struttura.nomeComune} </strong>
                                    </div>
                                    <div className="col-4 col-md-3 my-auto text-center">
                                        <strong>{struttura.tipologia}</strong>
                                    </div>
                                    <div  className=" col-12 col-lg-3">
                                        <Link className="text-light" to={`/struttura/gestioneStruttura/${listaStrutture[indice].idStruttura}`} ><button type="button" className="btn btn-block btn-primary mt-2 mr-2 ">Visualizza</button></Link>
                                    </div>
                                </div>
                                <div className="collapse">
                                    <CalcoloGuadagno/>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default SchermataStrutture;
