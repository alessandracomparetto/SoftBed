

import React, {Fragment, useEffect, useState} from "react";
import axios from 'axios';

import InformazioniStruttura from "../Registrazione Struttura/InformazioniStruttura";
import ModificaCaratteristicheB from "./ModificaCaratteristicheB";
import ModificaDisponibilita from "../SchermataStrutture/ModificaDisponibilità";
import ModificaCondizioni from "./ModificaCondizioni";
import ModificaCaratteristicheC from "./ModificaCaratteristicheC";
import CalcoloGuadagno from "../SchermataStrutture/CalcoloGuadagno";
import SchermataPrenotazioneStruttura from "../Schermata prenotazione struttura/SchermataPrenotazioneStruttura";

function SchermataGestioneStruttura() {
const [struttura,setStruttura]=useState([]);
    useEffect(() => {
        axios
            .get("/struttura")
            .then(res => {
                setStruttura(res.data);
                console.log("Strutturaaa:");
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    function informazioniStruttura(){
        document.getElementById("InformazioniPricipali").classList.remove("collapse");
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("condizioni").classList.add("collapse");
        document.getElementById("disponibilità").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
    }
    function visualizzaPrenotazioni(){
        document.getElementById("prenotazioni").classList.remove("collapse");
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("condizioni").classList.add("collapse");
        document.getElementById("disponibilità").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
    }
    function modificaCaratteristiche(){
        document.getElementById("caratteristiche").classList.remove("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("condizioni").classList.add("collapse");
        document.getElementById("disponibilità").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        console.log(struttura);
    }
    function modificaCondizioni(){
        document.getElementById("condizioni").classList.remove("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("disponibilità").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
    }
    function modificaDisponibilità(){
        document.getElementById("disponibilità").classList.remove("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
    }
    function calcoloGuadagno(){
        document.getElementById("guadagno").classList.remove("collapse");
        document.getElementById("condizioni").classList.add("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        document.getElementById("disponibilità").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
    }
    function printObject(o) {
        let out = '';
        for (let p in o) {
            out += p + ': ' + o[p] + '\n';
        } console.log(out);
    }

    function handleChange(event){
        const{name,value}=event.target;
        let tmp=struttura
        tmp[name]=value;
        setStruttura(tmp);
        printObject(tmp);
    }

    function correzione (nome, valore){
        console.log("aggiorno "+nome+ " a "+valore);
        let tmp = struttura;
        tmp[nome]=valore;
        setStruttura(tmp);
    }


    return (
        <div className="d-flex justify-content-center">
            <div className="row mx-auto maxw-xl">
                <div className="col-12 col-md-3">
                    {/* Navbar */}
                    {/* <Sidebar */}
                    <nav className="navbar bg-warning">
                        <button className="ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                            <span className="d-none d-sm-inline mr-2">La mia struttura</span>
                            <span className="fas fa-edit"/>
                        </button>
                        <div className="collapse navbar-collapse" id="menu">
                            <ul className="navbar-nav ml-auto text-right">
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn-warning" onClick={informazioniStruttura}>Informazioni sulla struttura</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn-warning" onClick={visualizzaPrenotazioni}>Prenotazioni</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn-warning"onClick={calcoloGuadagno}>Calcolo guadagno</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn-warning" onClick={modificaCaratteristiche}>Modifica caratteristiche</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn-warning" onClick={modificaCondizioni}>Modifica condizioni</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn-warning" onClick={modificaDisponibilità}>Modifica disponibilità</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                            </ul>
                        </div>
                    </nav>
                </div>

                 <div id="InformazioniPricipali" className="col-12 col-md-9">
                    {/* Contenitore principale */}
                    <InformazioniStruttura struttura={struttura}  />
                </div>
                <div id="prenotazioni" className="collapse col-12 col-md-9">
                    <SchermataPrenotazioneStruttura/>
                </div>
                <div  id="caratteristiche" className="collapse col-12 col-md-9">
                    {
                        (struttura.tipologiaStruttura==="cv")?
                            <ModificaCaratteristicheC props={struttura} handleChange={handleChange}/>
                            :
                            <ModificaCaratteristicheB props={struttura} handleChange={handleChange}/>
                    }
                </div>
                <div id="guadagno" className="collapse col-12 col-md-9">
                    <CalcoloGuadagno dati={struttura}/>
                </div>
                <div id="condizioni" className="collapse col-12 col-md-9">
                    <ModificaCondizioni dati={struttura} handleChange={handleChange} correzione={correzione}/>
                </div>
                <div id="disponibilità" className="collapse col-12 col-md-9">
                    <ModificaDisponibilita props={struttura}/>
                </div>
            </div>
        </div>
    )
}

export default SchermataGestioneStruttura;
