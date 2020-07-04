import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useParams, useHistory} from "react-router-dom";
import mostraDialogErrore from "../../Actions/errore";
import {convertiData} from "../../Actions/gestioneDate";
import RiepilogoRendiconto from "./RiepilogoRendiconto";
function Rendiconto(){
    const [struttura,setStruttura]= useState([]);
    const [prenotazioni,setPrenotazioni]= useState([]);
    const [ospiti,setOspiti]= useState([]);
    const {indice} = useParams();
    const history = useHistory();
    const oggi = new Date(convertiData(new Date()));
    const trimestre= convertiData(oggi, 0, 3, 0);

    useEffect(() => {
        let utente = window.sessionStorage.getItem("utente");
        if(!utente || utente.length==0){
            window.location.href="/accedi";
        }
        let lista = JSON.parse(window.sessionStorage.getItem("strutture"));
        if(!lista || indice>=lista.length || !lista[indice]){
            window.location.href="/gestioneStrutture/"
        }
        let dati = lista[indice];
        console.log(dati);
        axios.post(`/struttura/fetchStruttura`, dati)
            .then(res => {
                setStruttura(res.data);
                console.log(dati.rendicontoEffettuato);
                console.log(dati.rendicontoEffettuato.split('T')[0]);
                let info={idStruttura: res.data[0].idStruttura, trimestre: trimestre, rendiconto: dati.rendicontoEffettuato}
                axios.post(`/prenotazione/rendiconto`, info)
                    .then(res => {
                        console.log(res.data);
                        setPrenotazioni(res.data);
                        res.data.map((prenotazione, indice) => {
                            let tmp = ospiti;
                            axios.post(`/ospite/fetch`,[prenotazione.idPrenotazione]).then(res => {
                                tmp.push(res.data);
                                setOspiti(tmp);
                            }).catch(()=>mostraDialogErrore());
                        })
                    })
                    .catch(()=>mostraDialogErrore());
            })
            .catch(()=>mostraDialogErrore());

    }, []);

    return(
        <RiepilogoRendiconto ospiti={ospiti} trimestre={trimestre}/>
    )

}

export default Rendiconto;