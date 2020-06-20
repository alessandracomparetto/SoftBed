import React from "react";
import { Link } from "react-router-dom"

function RisultatoRicerca(props) {
    return (
        <div className="card p-3 m-2 m-sm-3 d-flex flex-md-row maxw-xl">
            <figure className="figure m-0 h-100 d-flex justify-content-center">
                <img className="anteprima-struttra" src={"/images/" + props.idStruttura} alt={props.nomeStruttura}/>
            </figure>
            <div className="card-body">
                <h5 className="card-title">{props.nomeStruttura}</h5>
                <p className="card-text annuncio-testo">{props.descrizioneStruttura}</p>

                {/* TODO: Aggiungere servizi */}

                <div className="text-md-right">
                    <Link to={"/strutture/" + props.idStruttura} className="btn btn-primary d-block d-md-inline-block m-auto">Visualizza struttura</Link>
                </div>
            </div>
        </div>
    )
}

export default RisultatoRicerca;