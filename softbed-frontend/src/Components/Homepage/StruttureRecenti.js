import React from "react";

function StruttureRecenti() {
    if (localStorage && localStorage.getItem("annunciRecenti")) {
        const strutture = JSON.parse(localStorage.getItem("annunciRecenti"));

        if (strutture) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="card shadow container p-4 m-3">
                        <h3 className="text-center">Annunci visualizzati di recente</h3>
                        <div className="d-md-flex justify-content-around mx-0 my-3 align-items-stretch">
                            {
                                strutture.map((struttura, indice) => {
                                    if (indice < 3) {
                                        return (
                                            <div key={indice} className="col-12 col-md-4 my-3 my-md-0">
                                                <div className="card shadow h-100">
                                                    <img className="card-img-top maxh-240px" src={`uploads/foto/${struttura.img}`}
                                                         alt={struttura.nome}/>
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title text-center mt-auto">{struttura.nome}</h5>
                                                        <a href={`/struttura/${struttura.id}`}
                                                           className="btn btn-block btn-warning stretched-link">Visualizza</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    else return null;
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

    return null;
}

export default StruttureRecenti;