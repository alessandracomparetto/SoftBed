import React, {useEffect, useState} from "react";
import mostraDialogErrore from "../../Actions/errore";
import axios from 'axios';
import {useParams} from "react-router-dom"
import InformazioniStruttura from "../Registrazione Struttura/InformazioniStruttura";
import ModificaCaratteristicheB from "./ModificaCaratteristicheB";
import ModificaCondizioni from "./ModificaCondizioni";
import ModificaCaratteristicheC from "./ModificaCaratteristicheC";
import CalcoloGuadagno from "./CalcoloGuadagno";
import SidebarStruttura from "./SidebarStruttura";

function SchermataGestioneStruttura(){
    let {id} = useParams();
    const [struttura,setStruttura]=useState([]);
    const [flag, setFlag]=useState(0);

    const[copia, setCopia]= useState("");
    //utilizzo questo stato per aggiornare le informazioni della struttura al modificare delle condizione e delle caratteristiche

    useEffect(() => {
        let lista = JSON.parse(window.sessionStorage.getItem("strutture"));
        let dati;
        for(let i = 0; i<lista.length; i++){
            if(lista[i].idStruttura == id){
                dati=lista[i];
            }
        }
        axios.post(`/struttura/gestioneStruttura/${id}`, dati)
            .then(res => {
                setStruttura(res.data);
                setCopia(res.data);
            })
            .catch(()=>mostraDialogErrore());
    }, []);

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
    }
    function correzione (nome, valore){
        let tmp = struttura;
        tmp[nome]=valore;
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
                        (struttura.tipologiaStruttura==="cv")?
                            <ModificaCaratteristicheC idStruttura={id} props={struttura} handleChange={handleChange} flag={flag} setFlag={setFlag} />
                            :
                            <ModificaCaratteristicheB idStruttura={id} props={struttura} handleChange={handleChange} flag={flag} setFlag={setFlag} />
                    }
                </div>
                <div id="guadagno" className="collapse contenuto col-12 col-md-9">
                    <CalcoloGuadagno idStruttura={id}/>
                </div>
                <div id="condizioni" className="collapse contenuto col-12 col-md-9">
                    <ModificaCondizioni dati={struttura} setStruttura={setStruttura} idStruttura={id} handleChange={handleChange} flag={flag} setFlag={setFlag} correzione={correzione} copia={copia} setCopia={setCopia}/>
                </div>

            </div>
        </div>
    )
}

export default SchermataGestioneStruttura;
