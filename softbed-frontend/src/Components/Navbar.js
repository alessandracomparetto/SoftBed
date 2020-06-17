import React from 'react';

function NavbarToggler() {
    return (
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"/>
        </button>
    )
}

function NuovoUtente() {
    return (
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/login/">Accedi</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/registration/">Registrati</a>
                </li>
            </ul>
        </div>
    )
}

function UtenteCollegato() {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-right" href="#" data-toggle="dropdown">
                    <i className="fas fa-user"/>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Modifica profilo</a>
                    <a className="dropdown-item" href="#">Gestione struttura</a>
                    <a className="dropdown-item" href="#">Le mie prenotazioni</a>
                    <div className="dropdown-divider"/>
                    <a className="dropdown-item" href="#">Esci</a>
                </div>
            </li>
        </ul>
    )
}


function Navbar() {
    // TODO
    const accessoEffettuato = false;

    return (
        <nav className ="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
            <a className="navbar-brand" href="/">softbed</a>

            { accessoEffettuato ? (
                <UtenteCollegato />
            ) : (
                <div>
                    <NavbarToggler />
                    <NuovoUtente />
                </div>
            )}
        </nav>
    )
}

export default Navbar;