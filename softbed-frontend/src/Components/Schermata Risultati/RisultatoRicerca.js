import React from "react";
import Servizio from "./Servizio";

function RisultatoRicerca(props) {
    return (
        <div className="card shadow p-3 m-2 m-sm-3 d-flex flex-md-row maxw-xl">
            <figure className="figure m-0 d-flex justify-content-center">
                <img className="annuncio-img" src={`/uploads/${props.idStruttura}/1.jpg`} alt={props.nomeStruttura}/>
            </figure>
            <div className="px-3">
                <h5 className="card-title mt-3 mt-md-0 mb-1">{props.nomeStruttura}</h5>
                <p className="text-90 card-text annuncio-desc mb-0">{props.descrizioneStruttura}</p>

                <div className="row p-2 annuncio-box-servizi">
                    {
                        props.servizi.map((servizio) => {
                            return <Servizio key={servizio.servizio} servizio={servizio.servizio} icona={servizio.icona} />
                        })
                    }
                </div>

                <div className="text-md-right">
                    <a href={`/struttura/${props.idStruttura}`} className="btn btn-primary d-block d-md-inline-block m-auto stretched-link">Visualizza struttura</a>
                </div>
            </div>
        </div>
    )
}

export default RisultatoRicerca;