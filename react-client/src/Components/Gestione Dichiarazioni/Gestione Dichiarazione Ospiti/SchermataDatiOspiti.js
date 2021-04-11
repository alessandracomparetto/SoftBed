import React, {useEffect, useState} from "react";
import FormDatiOspite from "./FormDatiOspite";
import OspitiInseriti from "./OspitiInseriti";
import axios from "axios";
import {useParams, useHistory, useLocation} from "react-router-dom";
import RiepilogoDatiQuestura from "./RiepilogoDatiQuestura";

function SchermataDatiOspiti(props){
    const[listaOspiti, setOspiti] = useState([]);
    const [struttura, setStruttura] = useState([]);

    const history = useHistory();
    const location = useLocation();
    const {indice, refprenotazione} = useParams();

    useEffect(() => {
        let utente = JSON.parse(window.sessionStorage.getItem("utente"));
        if(!utente || utente.length === 0){
            window.location.href="/accedi";
        }
        let listaStrutture = JSON.parse(window.sessionStorage.getItem("strutture"));
        if(!listaStrutture || !listaStrutture[indice] || indice >= listaStrutture.length){
            window.location.href="/gestioneStrutture/";
        }
        let data = listaStrutture[indice];
        setStruttura(data);

        axios.post(`/ospite/fetch`,[refprenotazione]).then(res => {
            setOspiti(res.data);
        })
            .catch(err => console.log(err));
    }, []);



  const eliminaOspite = (indice) => {
        let tmp = [...listaOspiti];
        tmp.splice(indice, 1);
        setOspiti(tmp);
    }

    return(
        <div className="container my-3" >
            <div id ="ospiti" >
                <div  className="my-3">
                    <h4 className="mt-3 d-inline">I tuoi ospiti</h4>
                    <ul className="list-group list-group-flush mt-3 ">
                        {
                            listaOspiti.map((ospiti, indice) => {
                                return <OspitiInseriti key={indice} indiceElemento={indice} idospite={ospiti.idospite} nome={ospiti.nome} cognome={ospiti.cognome}
                                                      codicefiscale={ospiti.codicefiscale} datanascita={ospiti.datanascita.split("T")[0]}
                                                      comune={ospiti.comunenascita} provincia={ospiti.provincianascita} regione={ospiti.regione}
                                                      via={ospiti.via} numero={ospiti.numerocivico} cap={ospiti.cap} numerocivico = {ospiti.numerocivico}
                                                       comuneresidenza={ospiti.comuneresidenza} provinciaresidenza={ospiti.provinciaresidenza}
                                                       regioneresidenza={ospiti.nomeregioneresidenza} tassa={ospiti.tassa} dataarrivo={ospiti.dataarrivo.split("T")[0]}
                                                       permanenza={ospiti.permanenza} refprenotazione={ospiti.refprenotazione} eliminaOspite={eliminaOspite}/>
                            })

                        }
                    </ul>
                </div>

                <FormDatiOspite listaOspiti={listaOspiti} setOspiti={setOspiti}/>
                <RiepilogoDatiQuestura listaOspiti={listaOspiti} refprenotazione={refprenotazione} indice={indice}/>
            </div>
        </div>


    )
}


export default SchermataDatiOspiti;