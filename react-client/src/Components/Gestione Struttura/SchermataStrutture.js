import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import reindirizza from "../../Actions/reindirizzamento";
import mostraDialogErrore from "../../Actions/errore";
import Rendiconto from "../Gestione Dichiarazioni/Gestione Rendiconto/Rendiconto";

function SchermataStrutture(){
    const history = useHistory();
    const location = useLocation();
    const [listaStrutture,setLista]=useState([]);

    useEffect(() => {
        let utente = window.sessionStorage.getItem("utente");

        // Se la sessione è assente
        if (!utente || utente.length === 0) {
            reindirizza(history, {
                pathname: '/accedi',
                state: {
                    provenienza: 'Schermata Gestione Strutture',
                    urlProvenienza: location.pathname
                }
            }, 3000, "Devi effettuare l'accesso per visualizzare le tue strutture");
        }

        let idutente = JSON.parse(window.sessionStorage.getItem("utente")).idutente;

        axios.post('/building/listaStruttureGestore', {"idutente": idutente})
            .then(res => {
                setLista(res.data);
                window.sessionStorage.setItem("strutture", JSON.stringify(res.data));
            }).catch(err => {
                // Se la sessione non è valida / è scaduta
                if (err.response.status === 401) {
                    reindirizza(history, {
                        pathname: '/accedi',
                        state: {
                            provenienza: "Schermata Dato Pagamento",
                            urlProvenienza: location.pathname
                        }

                    }, 3000, "Devi effettuare l'accesso per accedere ai tuoi dati");
                } else {
                    mostraDialogErrore();
                }
            })
    }, []);


    return(
        <div className="container">
            <h4>Strutture registrate</h4>
            <ul className="list-group list-group-flush ">
                {
                    listaStrutture.map((struttura, indice) => {
                        return(
                            <li className={"list-group-item border border-dark border-top-"+ ((indice === 0)? "" : 0)} key={indice}>
                                <div className="row d-flex justify-content-center">
                                    <div  className="col-4 col-lg-2 my-auto text-center">
                                        Nome: <br/>
                                        <strong>{struttura.nomestruttura}</strong>
                                    </div>
                                    <div className="col-4 col-lg-2 my-auto text-center">
                                        Via: <br/>
                                        <strong>{struttura.via}, {struttura.numerocivico}</strong>
                                    </div>
                                    <div className="col-4 col-lg-2 my-auto text-center">
                                        Tipologia: <br/>
                                        {struttura.tipologiastruttura === "B&B" ?
                                            <strong>B&B</strong>
                                            :
                                            <strong>Casa Vacanze</strong>
                                        }
                                    </div>
                                    <div  className=" col-6 col-lg-2">
                                        <Link className="text-light" to={`/struttura/gestioneStruttura/${indice}`} ><button type="button" className="btn btn-block btn-primary mt-2 mr-2 ">Visualizza</button></Link>
                                    </div>
                                    <div  className=" col-6 col-lg-2">
                                        <Rendiconto indice={indice}/>
                                    </div>
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
