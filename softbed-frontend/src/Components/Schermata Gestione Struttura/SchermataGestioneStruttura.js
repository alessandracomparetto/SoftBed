import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useParams} from "react-router-dom"
import InformazioniStruttura from "../Registrazione Struttura/InformazioniStruttura";
import ModificaCaratteristicheB from "./ModificaCaratteristicheB";
import ModificaCondizioni from "./ModificaCondizioni";
import ModificaCaratteristicheC from "./ModificaCaratteristicheC";
import CalcoloGuadagno from "./CalcoloGuadagno";
import SchermataPrenotazioneStruttura from "../Schermata prenotazione struttura/SchermataPrenotazioneStruttura";

function SchermataGestioneStruttura(){
    let {id} = useParams();
    const [struttura,setStruttura]=useState([]);

    useEffect(() => {
        let lista = JSON.parse(window.sessionStorage.getItem("strutture"));
        let dati;
        for(let i = 0; i<lista.length; i++){
            if(lista[i].idStruttura == id){
                dati=lista[i];
            }
        }
        console.log(dati);
        axios.post(`/struttura/gestioneStruttura/${id}`, dati)
            .then(res => {
                setStruttura(res.data);
                console.log("Strutturaaa:");
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    function informazioniStruttura(){
        document.getElementById("InformazioniPricipali").classList.remove("collapse");
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("condizioni").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
    }
    function visualizzaPrenotazioni(){
        document.getElementById("prenotazioni").classList.remove("collapse");
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("condizioni").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
    }
    function modificaCaratteristiche(){
        document.getElementById("caratteristiche").classList.remove("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("condizioni").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
        console.log(struttura);
    }
    function modificaCondizioni(){
        document.getElementById("condizioni").classList.remove("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        document.getElementById("guadagno").classList.add("collapse");
    }
    function calcoloGuadagno(){
        document.getElementById("guadagno").classList.remove("collapse");
        document.getElementById("InformazioniPricipali").classList.add("collapse");
        document.getElementById("caratteristiche").classList.add("collapse");
        document.getElementById("prenotazioni").classList.add("collapse");
        document.getElementById("condizioni").classList.add("collapse");

    }

    function printObject(o) {
        let out = '';
        for (let p in o) {
            out += p + ': ' + o[p] + '\n';
        } console.log(out);
    }

    function handleChange(event){
        const{name,value}=event.target;
        let tmp=struttura;
        if(event.target.type === "checkbox"){
            if(event.target.checked === true){
                tmp[name]=1;
            }
            if(event.target.checked ===false){
                tmp[name]=0;
            }
        }else{
            tmp[name]=value;
        }
        setStruttura(tmp);
        printObject(tmp)
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
                                <div>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn btn-warning" onClick={informazioniStruttura}>Informazioni sulla struttura</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </div>
                                <div>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn btn-warning" onClick={visualizzaPrenotazioni}>Prenotazioni</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </div>
                                <div>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn btn-warning" onClick={calcoloGuadagno}>Calcolo guadagno</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </div>
                                <div>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn btn-warning" onClick={modificaCaratteristiche}>Modifica caratteristiche</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </div>
                                <div>
                                    <li className="nav-item text-center text-md-right">
                                        <button type="button" className="btn btn-warning" onClick={modificaCondizioni}>Modifica condizioni</button>
                                    </li>
                                    <div className="dropdown-divider"/>
                                </div>
                            </ul>
                        </div>
                    </nav>
                </div>

                 <div id="InformazioniPricipali" className="col-12 col-md-9">
                    {/* Contenitore principale */}
                    <InformazioniStruttura struttura={struttura}  />
                </div>
                <div id="prenotazioni" className="collapse col-12 col-md-9">
                    <SchermataPrenotazioneStruttura idStruttura={id} tipologiaStruttura={struttura.tipologiaStruttura}/>
                </div>
                <div  id="caratteristiche" className="collapse col-12 col-md-9">
                    {
                        (struttura.tipologiaStruttura==="cv")?
                            <ModificaCaratteristicheC idStruttura={id} props={struttura} handleChange={handleChange}/>
                            :
                            <ModificaCaratteristicheB idStruttura={id} props={struttura} handleChange={handleChange}/>
                    }
                </div>
                <div id="guadagno" className="collapse col-12 col-md-9">
                    <CalcoloGuadagno idStruttura={id}/>
                </div>
                <div id="condizioni" className="collapse col-12 col-md-9">
                    <ModificaCondizioni dati={struttura} idStruttura={id} handleChange={handleChange} correzione={correzione} setStruttura={setStruttura}/>
                </div>

            </div>
        </div>
    )
}

export default SchermataGestioneStruttura;
