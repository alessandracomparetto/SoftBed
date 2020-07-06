import React, {useEffect} from 'react';
import SliderPrezzo from "./SliderPrezzo";
import {servizi, ambienti} from "../../../../caratteristiche";
import $ from "jquery";
import axios from "axios";
import {useLocation, useHistory} from "react-router-dom";

function FormFiltri(props) {

    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    // Carico i valori dei filtri in base ai parametri contenuti nell'URL
    useEffect(() => {
        if (query.get("prezzoMinimo"))
            $("#prezzoMinimo").val(query.get("prezzoMinimo"));

        if (query.get("prezzoMassimo"))
            $("#prezzoMassimo").val(query.get("prezzoMassimo"));

        Object.keys(servizi).map((servizio) => {

            if (query.get(servizio)) {
                $(`#${servizio}`)[0].checked = true;
            }
        })

        Object.keys(ambienti).map((ambiente) => {

            if (query.get(ambiente)) {
                $(`#${ambiente}`)[0].checked = true;
            }
        })
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();

        let parametri = {
            destinazione: query.get("destinazione"),
            bedAndBreakfast: query.get("bedAndBreakfast"),
            casaVacanze: query.get("casaVacanze"),
            arrivo: query.get("arrivo"),
            partenza: query.get("partenza"),
            ospiti: query.get("ospiti"),
        }

        parametri.prezzoMinimo = $("#prezzoMinimo").val();
        parametri.prezzoMassimo = $("#prezzoMassimo").val();

        Object.keys(servizi).map((servizio) => {
            if ($(`#${servizio}`)[0].checked)
                parametri[servizio] = true;
        })

        Object.keys(ambienti).map((ambiente) => {
            if ($(`#${ambiente}`)[0].checked)
                parametri[ambiente] = true;
        })


        history.push("search?" + $.param(parametri));
        axios
            .get("search?" + $.param(parametri))
            .then((res) => {
                props.setListaStrutture(res.data);
            })
            .catch(err => console.log(err));

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <form className="form form-row p-3" onSubmit={onSubmit}>
            <div className="col-12 mt-3">
                <h4>Prezzo a notte</h4>
                <div className="mx-2">
                    <SliderPrezzo minimo={0} massimo={500}/>
                </div>
            </div>
            <div className="col-12 mt-3">
                <h4>Servizi</h4>

                { Object.keys(servizi).map((servizio) => {
                    return (
                        <div key={servizi[servizio].nome} className="form-check mx-2">
                            <input className="form-check-input" id={servizio} name={servizio} type="checkbox"/>
                            <label className="form-check-label" htmlFor={servizio}>{servizi[servizio].nome}</label>
                        </div>
                    );
                })}
            </div>
            <div className="col-12 mt-3">
                <h4>Ambienti</h4>

                { Object.keys(ambienti).map((ambiente) => {
                    return (
                        <div key={ambienti[ambiente].nome} className="form-check mx-2">
                            <input className="form-check-input" id={ambiente} name={ambiente} type="checkbox"/>
                            <label className="form-check-label" htmlFor={ambiente}>{ambienti[ambiente].nome}</label>
                        </div>
                    );
                })}
            </div>
            <button className="btn btn-secondary btn-block mt-3" type="submit">Applica filtri</button>
        </form>
    );
}

export default FormFiltri;
