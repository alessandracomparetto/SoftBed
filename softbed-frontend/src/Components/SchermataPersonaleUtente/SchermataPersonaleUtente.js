import React,{useEffect, useState} from "react";
import SidebarUtente from "./SidebarUtente";

function SchermataPersonaleUtente(){
    const [utente,setUtente]=useState([]);

    useEffect(() => {
        let dati = JSON.parse(window.sessionStorage.getItem(["utente"]));
        setUtente(dati);
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
                <SidebarUtente idUtente={utente.idUtente}></SidebarUtente>
                <div className="col-12 col-md-9 mt-3">
                    {/* Informazioni dell'utente */}
                    <div className="d-block card pt-2 pl-3">
                        <strong>I tuoi dati personali</strong>
                        {/*Caratteristiche*/}
                        <div className="my-3">
                            <InformazioneLineare nome="Nome:" valore={`${utente.nome}`} />
                            <InformazioneLineare nome="Cognome:" valore={`${utente.cognome} `} />
                            <InformazioneLineare nome="Email:" valore={`${utente.email}`} />
                            <InformazioneLineare nome="Data di nascita:" valore={new Date(utente.dataNascita).toLocaleDateString()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SchermataPersonaleUtente;
