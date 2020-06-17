import React from 'react';

function UtenteNonAutenticato() {
    return (
        <React.Fragment>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="fas fa-sign-in-alt"/>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item">
                        <a className="nav-link" href="/login/">Accedi</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/registration/">Registrati</a>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

function UtenteAutenticato() {
    return (
        <React.Fragment>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="fas fa-user"/>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto text-right">
                    {/* Dropdown menu | d-sm-flex */}
                    <li className="nav-item dropdown d-none d-sm-flex">
                        <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                            <i className="fas fa-user"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#">Modifica profilo</a>
                            <a className="dropdown-item" href="#">Gestione strutture</a>
                            <a className="dropdown-item" href="#">Le mie prenotazioni</a>
                            <div className="dropdown-divider"/>
                            <a className="dropdown-item" href="#">Esci</a>
                        </div>
                    </li>

                    {/* Collapsed menu | d-sm-none */}
                    <li className="nav-item d-sm-none">
                        <a className="nav-link" href="#">Modifica profilo</a>
                    </li>
                    <li className="nav-item d-sm-none">
                        <a className="nav-link" href="#">Gestione strutture</a>
                    </li>
                    <li className="nav-item d-sm-none">
                        <a className="nav-link" href="#">Le mie prenotazioni</a>
                    </li>
                    <div className="dropdown-divider d-sm-none"/>
                    <li className="nav-item d-sm-none">
                        <a className="nav-link" href="#">Esci</a>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}


function Navbar() {
    // TODO
    const accessoEffettuato = true;

    return (
        <nav className ="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
            <a className="navbar-brand" href="/">softbed</a>

            { accessoEffettuato ? (
                <UtenteAutenticato />
            ) : (
                <UtenteNonAutenticato />
            )}
        </nav>
    )
}

export default Navbar;