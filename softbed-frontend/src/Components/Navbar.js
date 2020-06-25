import React from 'react';
import { Link } from "react-router-dom"

function UtenteNonAutenticato() {
    return (
        <React.Fragment>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="fas fa-sign-in-alt"/>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item">
                        <Link className="nav-link" to="/accedi/">Accedi</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/registrati/">Registrati</Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

function UtenteAutenticato(props) {
    return (
        <React.Fragment>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="fas fa-user"/>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto text-right">
                    {/* Collapsed menu | d-sm-none (<576px) */}
                    <div className="d-sm-none">
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Modifica profilo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Gestione strutture</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Le mie prenotazioni</Link>
                        </li>
                        <div className="dropdown-divider d-sm-none"/>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Esci</Link>
                        </li>
                    </div>

                    {/* Dropdown menu | d-sm-flex (>=576px) */}
                    <li className="nav-item dropdown d-none d-sm-flex">
                        <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">
                            <span className="mr-2">{props.utente.nome}</span><i className="fas fa-user"/>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="#">Modifica profilo</Link>
                            <Link className="dropdown-item" to="#">Gestione strutture</Link>
                            <Link className="dropdown-item" to="#">Le mie prenotazioni</Link>
                            <div className="dropdown-divider"/>
                            <Link className="dropdown-item" to="#">Esci</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}


function Navbar() {
    const accessoEffettuato = false;
    const utente = {nome: "SoftEngineers"}

    return (
        <nav className ="navbar navbar-expand-sm bg-dark navbar-dark">
            <Link className="navbar-brand" to="/">softbed</Link>

            { accessoEffettuato ? (
                // TODO
                <UtenteAutenticato utente={utente} />
            ) : (
                <UtenteNonAutenticato />
            )}
        </nav>
    )
}

export default Navbar;