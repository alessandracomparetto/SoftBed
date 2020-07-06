import React from "react";
import Caratteristica from "./Caratteristica";
import {servizi} from "../../caratteristiche";
import {Link} from "react-router-dom";

function RisultatoRicerca(props) {
    return (
        <div className="card shadow px-0 p-3 mx-0 my-2 my-sm-3 mx-lg-3 d-flex flex-md-row maxw-xl">
            <figure className="figure m-0 d-flex justify-content-center">
                <img className="annuncio-img" src={`/uploads/foto/${props.foto}`} alt={props.nomeStruttura}/>
            </figure>
            <div className="px-3">
                <h5 className="card-title mt-3 mt-md-0 mb-1">{props.nomeStruttura}</h5>
                <p className="text-90 card-text annuncio-desc mb-0 annuncio-box-descrizione">{props.descrizioneStruttura}</p>

                <div className="row p-2 annuncio-box-servizi">
                    {
                        props.servizi.map((servizio) => {
                            return <Caratteristica key={servizi[servizio].nome} caratteristica={servizi[servizio].nome} icona={servizi[servizio].icona} />
                        })
                    }
                </div>

                <div className="text-md-right">
                    <Link
                        to={{
                            pathname: `/struttura/${props.idStruttura}`,
                            state: {data: props.parametri}
                        }}
                        className="btn btn-primary d-block d-md-inline-block m-auto stretched-link">Visualizza struttura</Link>
                </div>
            </div>
        </div>
    )
}

export default RisultatoRicerca;