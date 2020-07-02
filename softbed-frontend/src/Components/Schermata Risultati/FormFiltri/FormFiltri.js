import React from 'react';
import SliderPrezzo from "./SliderPrezzo";
import {servizi, ambienti} from "../../../caratteristiche";

function FormFiltri() {
    return (
        <form className="form form-row p-3">
            <div className="col-12 mt-3">
                <h4>Prezzo</h4>
                <div className="mx-2">
                    <SliderPrezzo minimo={50} massimo={300}/>
                </div>
            </div>
            <div className="col-12 mt-3">
                <h4>Servizi</h4>

                { Object.keys(servizi).map((servizio) => {
                    return (
                        <div key={servizi[servizio].nome} className="form-check mx-2">
                            <input className="form-check-input" id={servizi[servizio].nome} name={servizi[servizio].nome} type="checkbox"/>
                            <label className="form-check-label" htmlFor={servizi[servizio].nome}>{servizi[servizio].nome}</label>
                        </div>
                    );
                })}
            </div>
            <div className="col-12 mt-3">
                <h4>Ambienti</h4>

                { Object.keys(ambienti).map((ambiente) => {
                    return (
                        <div key={ambienti[ambiente].nome} className="form-check mx-2">
                            <input className="form-check-input" id={ambienti[ambiente].nome} name={ambienti[ambiente].nome} type="checkbox"/>
                            <label className="form-check-label" htmlFor={ambienti[ambiente].nome}>{ambienti[ambiente].nome}</label>
                        </div>
                    );
                })}
            </div>
            <button className="btn btn-secondary btn-block mt-3" type="submit">Applica filtri</button>
        </form>
    );
}

export default FormFiltri;