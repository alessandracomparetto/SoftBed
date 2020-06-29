import React from "react";

function StruttureRecenti() {
    const strutture = JSON.parse(localStorage.getItem("annunciRecenti"));
    console.log(strutture);

    if (strutture) {
        return (
            <div className="card shadow container p-4 m-3">
                <h3 className="text-center">Annunci visualizzati di recente</h3>
                <div className="d-md-flex justify-content-around mx-0 mt-3">
                    {
                        strutture.map((struttura, indice) => {
                            if (indice < 3) {
                                return (
                                    <div key={indice} className="col-12 col-md-4">
                                        <div className="card shadow">
                                            <img className="card-img-top" src={`uploads/foto/${struttura.id}/1.jpg`}
                                                 alt={struttura.nome}/>
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{struttura.nome}</h5>
                                                <a href={`/struttura/${struttura.id}`}
                                                   className="btn btn-block btn-warning">Visualizza</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    return null;
}

export default StruttureRecenti;