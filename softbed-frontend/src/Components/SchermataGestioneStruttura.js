import React from "react"
import ImmaginiStruttura from "./Schermata Struttura/ImmaginiStruttura";

function SchermataGestioneStruttura() {
    const struttura = {
        id: 1,
        nome: "Dolce Risveglio"
    }

    const link = [
        {nome: "Modifica Ambienti", struttura}
    ]

    return (
        <div className="container d-flex flex-row">
            <div className="d-none d-md-block col-3">
                {/* Navbar */}
                <nav className="navbar bg-dark navbar-dark">
                    <ul className="navbar-nav ml-auto text-right">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Modifica Ambienti</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Modifica Caratteristiche</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Modifica Fotografie</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Modificia Descrizione</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Modifica Condizioni di Prenotazione</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Modifica Condizioni di Pagamento</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Modifica Tasse di Soggiorno</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Modifica Disponibilità</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="col-12 col-md-9">
                <ImmaginiStruttura struttura={struttura} idStruttura={struttura.id}/>
            </div>
        </div>
    )
}

export default SchermataGestioneStruttura;