import React, {Fragment, useEffect, useState} from "react"
import FormRicerca from "../FormRicerca";
import RisultatoRicerca from "./RisultatoRicerca";
import Paginazione from "./Paginazione";
import Mappa from "./Mappa";
import FormFiltri from "./FormFiltri/FormFiltri";
import axios from "axios";
import $ from "jquery";
import {servizi} from "../../../caratteristiche";

function SchermataRisultati() {
    // Per la navigazione fra le varie pagine
    const [pagina, setPagina] = useState(1);
    const [destinazione, setDestinazione] = useState("");
    const [listaStrutture, setListaStrutture] = useState([]);
    const [parametri, setParametri] = useState({});
    const [risultatiCaricati, setRisultati] = useState(false);

    useEffect(() => {

        // Genero manualmente la GET a partire dai campi del form di ricerca
        // (sempre validi al caricamento del componente)
        let parametriTMP = {
            destinazione: $("#destinazione").val().trim(),
            arrivo: $("#arrivo").val(),
            partenza: $("#partenza").val(),
            ospiti: $("#ospiti").val(),
            bedAndBreakfast: $("#bedAndBreakfast")[0].checked,
            casaVacanze: $("#casaVacanze")[0].checked
        }

        setParametri({
            dataCheckIn: parametriTMP.arrivo,
            dataCheckOut: parametriTMP.partenza,
            adulti: parametriTMP.ospiti
        });

        Object.keys(servizi).map((servizio) => {
            if ($(`#${servizio}`)[0].checked)
                parametriTMP[servizio] = true;
        })

        const valoriRicerca = $.param(parametriTMP);

        axios
            .get("search?" + valoriRicerca)
            .then(res => setListaStrutture(res.data))
            .catch(err => console.error(err))
            .finally(() => setRisultati(true));
    }, []);

    return (
        <Fragment>
            <FormRicerca setDestinazione={setDestinazione}/>
            <a className="btn btn-primary btn-block d-lg-none mt-0 no-radius" href="#filtri">
                Filtri<span className="ml-2 fas fa-filter"/>
            </a>
            <div className="container">
                <div className="d-lg-flex flex-row-reverse">
                    <div className="col-12 col-lg-8 px-0 px-lg-2">
                        { risultatiCaricati &&
                            <Fragment>
                                { listaStrutture && listaStrutture[0] ? (
                                    <Fragment>
                                        { listaStrutture instanceof Array && listaStrutture.slice((pagina - 1) * 10, pagina * 10).map((struttura, indice) => {
                                            return <RisultatoRicerca key={(pagina - 1) * 10 + indice} idstruttura={struttura.id} nomestruttura={struttura.nome} descrizioneStruttura={struttura.descrizione} servizi={struttura.servizi} foto={struttura.foto[0]} parametri={parametri}/>
                                        })}
                                        <Paginazione paginaAttuale={pagina} numPagine={Math.ceil(listaStrutture.length / 10)} setPagina={setPagina} />
                                    </Fragment>
                                ) : (
                                    <div className="card shadow p-3 m-2 m-sm-3 d-flex flex-md-row maxw-xl text-center">
                                        <h4>Siamo spiacenti, non è stato trovato alcun alloggio per i criteri di ricerca inseriti.</h4>
                                    </div>
                                )}
                            </Fragment>
                        }
                    </div>

                    <div id="filtri" className="shadow d-lg-block col-12 col-lg-4 h-100 p-3 card mt-3">
                        <div className="shadow-sm" style={{height: 250 + "px"}}>
                            <Mappa destinazione={destinazione}/>
                        </div>
                        <FormFiltri setListaStrutture={setListaStrutture}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SchermataRisultati;