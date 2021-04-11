import React, {useEffect, useState} from "react";
import mostraDialogErrore from "../../Actions/errore";
import axios from 'axios';
import InformazioniStruttura from "./Registrazione Struttura/InformazioniStruttura";
import ModificaCaratteristicheB from "./Modifica Informazioni Struttura/ModificaCaratteristicheB";
import ModificaCondizioni from "./Modifica Informazioni Struttura/ModificaCondizioni";
import ModificaCaratteristicheC from "./Modifica Informazioni Struttura/ModificaCaratteristicheC";
import CalcoloGuadagno from "./CalcoloGuadagno";
import SidebarStruttura from "./SidebarStruttura";
import {useParams} from "react-router-dom";
import {useHistory, useLocation} from "react-router-dom";
import reindirizza from "../../Actions/reindirizzamento";

function SchermataGestioneStruttura(){
    const [struttura,setStruttura] = useState([]);
    //utilizzo questo stato per aggiornare le informazioni della struttura al modificare delle condizione e delle caratteristiche
    const [flag, setFlag] = useState(0);
    const {indice} = useParams();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        let utente = window.sessionStorage.getItem("utente");
        if(!utente || utente.length === 0){
            window.location.href="/accedi"
        }
        let lista = JSON.parse(window.sessionStorage.getItem("strutture"));
        if(!lista || indice>=lista.length || !lista[indice]){
            window.location.href="/gestioneStrutture/"
        }
        let dati = lista[indice];
        axios.post(`/building/gestioneStruttura`, dati)
            .then(res => {
                setStruttura(res.data);
            }).catch(err => {
            if (err.response.status === 401) {
                reindirizza(history, {
                    pathname: '/accedi',
                    state: {
                        provenienza: "Schermata Gestione Struttura",
                        urlProvenienza: location.pathname
                    }

                }, 3000, "Devi effettuare nuovamente l'accesso per accedere a questa struttura.");
            } else {
                mostraDialogErrore();
            }
        });
    }, []);

    function handleChange(event){
        const {name, value} = event.target;
        let tmp = struttura;
        if (event.target.type === "checkbox") {
            if (event.target.checked === true) {
                tmp[name] = 1;
            }
            if (event.target.checked === false) {
                tmp[name] = 0;
            }
        } else {
            tmp[name] = value;
        }
        setStruttura(tmp);
    }

    function correzione (nome, valore) {
        let tmp = struttura;
        tmp[nome] = valore;
        setStruttura(tmp);
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="row mx-auto maxw-xl">
                <div className="col-12 col-md-3">
                    <SidebarStruttura/>
                </div>
                 <div id="InformazioniPricipali" className="col-12 col-md-9 contenuto">
                    {/* Contenitore principale */}
                    <InformazioniStruttura struttura={struttura}  flag={flag} />
                </div>
                <div  id="caratteristiche" className="collapse contenuto col-12 col-md-9">
                    {
                        (struttura.tipologiastruttura==="cv")?
                            <ModificaCaratteristicheC props={struttura} handleChange={handleChange} flag={flag} setFlag={setFlag} />
                            :
                            <ModificaCaratteristicheB props={struttura} handleChange={handleChange} flag={flag} setFlag={setFlag} />
                    }
                </div>
                <div id="guadagno" className="collapse contenuto col-12 col-md-9">
                    <CalcoloGuadagno idstruttura={struttura.idstruttura}/>
                </div>
                <div id="condizioni" className="collapse contenuto col-12 col-md-9">
                    <ModificaCondizioni dati={struttura} setStruttura={setStruttura} handleChange={handleChange} flag={flag} setFlag={setFlag} correzione={correzione}/>
                </div>

            </div>
        </div>
    )
}

export default SchermataGestioneStruttura;
