import React from 'react';
import SliderPrezzo from "./SliderPrezzo";

function FormFiltri(props) {
    return (
        <form className="form form-row p-3">
            <div className="col-12 mt-3">
                <h4>Prezzo</h4>
                <div className="mx-2">
                    <SliderPrezzo minimo={50} massimo={300}/>
                </div>
            </div>
            <div className="col-12 mt-3">
                { props.servizi && (
                    <React.Fragment>
                        <h4>Servizi</h4>

                        {
                            props.servizi.map((servizio, indice) => {
                                return (
                                    <div className="form-check mx-2" key={indice}>
                                        <input className="form-check-input" id={servizio.id} name={servizio.id} type="checkbox"/>
                                        <label className="form-check-label" htmlFor={servizio.id}>{servizio.nome}</label>
                                    </div>
                                );
                            })
                        }

                    </React.Fragment>
                    )
                }
            </div>
            <button className="btn btn-secondary btn-block mt-3" type="submit">Applica filtri</button>
        </form>
    );
}

export default FormFiltri;