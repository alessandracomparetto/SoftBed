import React, {useEffect, useState} from "react";
import CalcoloGuadagno from "./CalcoloGuadagno"
import $ from 'jquery';
import {Link, Route} from "react-router-dom";
import axios from "axios";

function SchermataStrutture(){
    const [listaStrutture,setLista]=useState([]);
    useEffect(() => {
        console.log("get");
        axios.get('/struttura/listaStruttureGestore',listaStrutture).then(res => {
                setLista(res.data);
                console.log("Strutturaaa:");
                console.log(res.data)})
            .catch(err => console.log(err));
    }, []);

   /* const [listaStrutture] = useState([
        {   idStruttura: "3333",
            nomeStruttura: "Struttura 1",
            refGestore: "5555",
            refIndirizzo: "1",
            renditontoEffettuato: "true",
            idIndirizzo :"1",
            via : "Carlo Magno",
            cap : "90011",
            refComune : "5",
            idComune :"5",
            nomeComune : "Comune1",
            refProvincia : "90",
            tipologia: "B&B"
        },
        {    idStruttura: "4444",
            nomeStruttura: "Struttura 2",
            refGestore: "6666",
            refIndirizzo: "2",
            renditontoEffettuato: "true",
            idIndirizzo :"2",
            via : "Carlo Magno",
            cap : "90011",
            refComune : "6",
            idComune :"6",
            nomeComune : "Comune 2",
            refProvincia : "81",
            tipologia: "Casa vacanze"
        },
        {   idStruttura: "3999",
            nomeStruttura: "Struttura 3",
            refGestore: "7777",
            refIndirizzo: "3",
            renditontoEffettuato: "true",
            idIndirizzo :"3",
            via : "Anacleto",
            cap : "90011",
            refComune : "7",
            idComune :"7",
            nomeComune : "Comune3",
            refProvincia : "6",
            tipologia: "Casa vacanze"
        }
    ]);
*/
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
                                        <button type="button" className="btn btn-block btn-primary mt-2 mr-2 "><Link className="text-light" to="/gestioneStruttura/key">Visualizza</Link></button>
                                        <button type="button" className="btn btn-block btn-outline-primary mt-2 mr-2" onClick={apri}>Calcolo Guadagni</button>
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