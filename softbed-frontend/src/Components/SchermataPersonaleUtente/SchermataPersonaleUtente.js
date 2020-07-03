import React, useEffect, useState} from "react";

import axios from 'axios';
import {useParams} from "react-router-dom"
import SidebarUtente from "./SidebarUtente";


function SchermataPersonaleUtente(){
    const [utente,setUtente]=useState([]);
    let {id} = useParams();
    /*TODO:cambiare idUtente*/
    let idUtente=1;
    useEffect(() => {
        axios
            .get("/utente")
            .then(res => {
                res.data.dataNascita=res.data.dataNascita.split("T")[0];
                console.log("DATI RECUPERATI=======");
                console.log(res.data);
                res.data.refComuneResidenza =  res.data.refComuneResidenza;
                res.data.via = res.data.via;
                setUtente(res.data);})
            .catch(err => console.log(err));
    }, []);

    function InformazioneLineare(props) {
        return (
            <div className="d-md-flex d-md-flex-row py-2">
                <div className="col-12 col-md-6">
                    <strong>{props.nome}</strong>
                </div>
                <div className="col-12 col-md-6">
                    {props.valore}
                </div>
            </div>
        );
    }

    return (
        <div className="d-block">
            <div className="row mx-auto">
                <SidebarUtente idUtente={idUtente}></SidebarUtente>
                <div className="col-12 col-md-9 mt-3">
                    {/* Informazioni dell'utente */}
                    <div className="d-block">
                        <h8>DATI</h8>
                        {/*Caratteristiche*/}
                        <div className="my-3">
                            <InformazioneLineare nome="Nome:" valore={`${utente.nome}`} />
                            <InformazioneLineare nome="Cognome:" valore={`${utente.cognome} `} />
                            <InformazioneLineare nome="Email:" valore={`${utente.email}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SchermataPersonaleUtente;
