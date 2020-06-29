

import React, {Fragment, useEffect} from "react";
import axios from 'axios';
import $ from "jquery";
import InformazioniStruttura from "./InformazioniStruttura";
import ModificaCaratteristicheB from "./ModificaCaratteristicheB";
import ModificaDisponibilita from "../SchermataStrutture/ModificaDisponibilità";
import ModificaCondizioni from "./ModificaCondizioni";
import ModificaCaratteristicheC from "./ModificaCaratteristicheC";

function SchermataGestioneStruttura() {
    let struttura;
    useEffect(() => {
        axios
            .get("/struttura")
            .then(res => {struttura=res.body; console.log("Struttura"+struttura)})
            .catch(err => console.log(err));
    }, []);

   /* const struttura={ tipologiaStruttura: "B&B",
        nomeStruttura: "aa",
        nomeRegione: "Basilicata",
        nomeProvincia: "MT",
        nomeComune: "077006",
        via: "aa",
        numeroCivico: 33,
        cap: "33333",
        camere: null,
        strutturaDisabili: 1,
        wifi: 1,
        animaliAmmessi: 1,
        parcheggio: 1,
        riscaldamento: 1,
        ariaCondizionata: 1,
        servizioInCamera: 1,
        permessoFumare: 1,
        TV: 1,
        navettaAeroportuale: 1,
        cucinaCeliaci: 1,
        bambini: 1,
        descrizione: "ciao",
        anticipoPrenotazioneMin: "5",
        anticipoPrenotazioneMax: "21",
        oraInizioCheckIn: "13:00",
    oraFineCheckIn: "15:00",
    oraInizioCheckOut: "21:00",
    oraFineCheckOut: "18:00",
    pagamentoOnline: 1,
    pagamentoLoco: 1,
    politicaCancellazione: "gratuita",
    prezzoBambini: 3,
    prezzoAdulti: 3,
    esclusioneSoggiorni: 3,
    percentualeRiduzione: 3,
    nPersoneRiduzione: 3
}*/
    function modificaCaratteristiche(){
        document.getElementById("caratteristiche").classList.remove("collapse");
       /* document.getElementById("InformazioniPrincipali").classList.add("collapse"); */
        document.getElementById("condizioni").classList.add("collapse");
        document.getElementById("disponibilità").classList.add("collapse");
    }
    function modificaCondizioni(){
        document.getElementById("condizioni").classList.remove("collapse");
        /*document.getElementById("InformazioniPrincipali").classList.add("collapse"); */
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("disponibilità").classList.add("collapse");
    }
    function modificaDisponibilità(){
        document.getElementById("disponibilità").classList.remove("collapse");
       /* document.getElementById("InformazioniPrincipali").classList.add("collapse"); */
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("condizioni").classList.add("collapse");
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="row mx-auto maxw-xl">
                <div className="col-12 col-md-3">
                    {/* Navbar */}
                    {/* <Sidebar */}
                    <nav className="navbar bg-warning">
                        <button className="ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                            <span className="d-none d-sm-inline mr-2">Modifica struttura</span>
                            <span className="fas fa-edit"/>
                        </button>
                        <div className="collapse navbar-collapse" id="menu">
                            <ul className="navbar-nav ml-auto text-right">
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <a className="nav-link text-dark" onClick={modificaCaratteristiche}>Modifica Caratteristiche</a>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <a className="nav-link text-dark" onClick={modificaCondizioni}>Modifica condizioni</a>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                                <Fragment>
                                    <li className="nav-item text-center text-md-right">
                                        <a className="nav-link text-dark" onClick={modificaDisponibilità}>Modifica disponibilità</a>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </Fragment>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/*} <div id="InformazioniPricipali" className="col-12 col-md-9">
                    {/!* Contenitore principale *!/}
                    <InformazioniStruttura datiStruttura={struttura} />
                </div>*/}
                <div  id="caratteristiche" className="collapse col-12 col-md-9">
                    {
                        (struttura.tipologiaStruttura==="cv")?
                            <ModificaCaratteristicheC props={struttura}/>
                            :
                            <ModificaCaratteristicheB props={struttura}/>
                    }
                </div>
                <div id="condizioni" className="collapse col-12 col-md-9">
                    <ModificaCondizioni dati={struttura}></ModificaCondizioni>
                </div>
                <div id="disponibilità" className="collapse col-12 col-md-9">
                    <ModificaDisponibilita props={struttura}></ModificaDisponibilita>
                </div>
            </div>
        </div>
    )
}

export default SchermataGestioneStruttura;
