import React from "react";

function RisultatoRicerca(props) {
    return (
        <div className="card p-2 p-sm-3 m-2 m-sm-3 d-flex flex-sm-row maxw-xl h-240px">
            <div>
                <img className="card-img anteprima-struttra" src={"/images/" + props.idStruttura} alt={props.nomeStruttura}/>
            </div>
            <div className="card-body">
                <h4 className="card-title">{props.nomeStruttura}</h4>
                <p className="card-text annuncio-testo">{props.descrizioneStruttura}</p>

                {/* TODO: Aggiungere servizi */}

                <a href={"/strutture/" + props.idStruttura} className="btn btn-primary float-right m-3 annuncio-btn">Visualizza struttura</a>
            </div>
        </div>
    )
}

export default RisultatoRicerca;