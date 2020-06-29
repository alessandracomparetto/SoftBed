import React, {Fragment, useEffect, useState} from "react"
import FormRicerca from "../FormRicerca";
import RisultatoRicerca from "./RisultatoRicerca";
import Paginazione from "./Paginazione";
import Mappa from "./Mappa";
import FormFiltri from "./FormFiltri/FormFiltri";
import axios from "axios";
import { useLocation } from "react-router-dom";

function SchermataRisultati() {
    // Per la navigazione fra le varie pagine
    const [pagina, setPagina] = useState(1);
    const [destinazione, setDestinazione] = useState("");
    const [listaStrutture, setListaStrutture] = useState([]);

    const valoriRicerca = useLocation().search;

    useEffect(() => {
        axios
            .get(valoriRicerca)
            .then(res => setListaStrutture(res.data))
            .catch(err => console.log(err));
    }, []);

    // TODO: da rimuovere, solo per test

    const servizi = [
            {servizio: "Aria condizionata", icona: "snowflake"},
            {servizio: "Riscaldamento", icona: "fire"},
            {servizio: "TV", icona: "tv"},
            {servizio: "Wi-Fi", icona: "wifi"},
            {servizio: "Piscina", icona: "water"},
            {servizio: "Idonea per bambini", icona: "child"}
        ]

    return (
        <React.Fragment>
            <FormRicerca setDestinazione={setDestinazione}/>
            <div className="container">
                <div className="row">
                    <div className="shadow d-none d-lg-block col-lg-4 h-100 p-3 card mt-3">
                        <div className="shadow-sm" style={{height: 250 + "px"}}>
                            <Mappa destinazione={destinazione}/>
                        </div>
                        <FormFiltri servizi={[
                            {nome: "Cucina per celiaci", id: "cucinaPerCeliaci"},
                            {nome: "TV", id: "tv"}
                            ]}/>
                    </div>
                    <div className="col-12 col-lg-8">
                        { listaStrutture[0] ? (
                            <Fragment>
                                { listaStrutture.map((struttura, indice) => {
                                    if (indice >= (pagina - 1) * 10 && indice < pagina * 10)
                                        return <RisultatoRicerca key={indice} idStruttura={struttura.idStruttura} nomeStruttura={struttura.nome} descrizioneStruttura={struttura.descrizione} servizi={servizi}/>
                                    else return null;
                                })}
                                <Paginazione paginaAttuale={pagina} numPagine={Math.ceil(listaStrutture.length / 10)} setPagina={setPagina} />
                            </Fragment>
                        ) : (
                            <div className="card shadow p-3 m-2 m-sm-3 d-flex flex-md-row maxw-xl text-center">
                                <h4>Siamo spiacenti, non è stato trovato alcun alloggio per i criteri di ricerca inseriti.</h4>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SchermataRisultati;