import React, {useState, useEffect, Fragment} from 'react';
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
                            <Link className="nav-link" to="/utente/modificaAccount">Modifica profilo</Link>
                        </li>
                        {
                            (props.utente.gestore == 1) ? (
                                <Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/gestioneStrutture/">Gestione strutture</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="dropdown-item" to="/registrazioneStruttura/">Registra la tua struttura</Link>
                                    </li>
                                </Fragment>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/utente/prenotazioni">Le mie prenotazioni</Link>
                                </li>
                            )
                        }
                        <div className="dropdown-divider d-sm-none"/>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Esci</Link>
                        </li>
                    </div>

                    {/* Dropdown menu | d-sm-flex (>=576px) */}
                    <li className="nav-item dropdown d-none d-sm-flex">
                        <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">
                            <span className="mr-2">{props.utente.nome}</span><i className="fas fa-user"/>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="/utente/modificaAccount">Modifica profilo</Link>
                            {
                                (props.utente.gestore == 1) ? (
                                    <Fragment>
                                        <Link className="dropdown-item" to="/gestioneStrutture/">Gestione strutture</Link>
                                        <Link className="dropdown-item" to="/registrazioneStruttura/">Registra la tua struttura</Link>
                                    </Fragment>
                                ):(
                                    <Link className="dropdown-item" to="/utente/prenotazioni">Le mie prenotazioni</Link>
                                )
                            }
                            <div className="dropdown-divider"/>
                            <Link className="dropdown-item" to="/">Esci</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

function Navbar() {
    const [accessoEffettuato, setAccessoEffettuato] = useState("");
    const[utente, setUtente]=useState("");

    useEffect(()=>{
        let dati = JSON.parse(window.sessionStorage.getItem("utente"));
        if(dati){
            setAccessoEffettuato(true);
            setUtente(dati);
        }
    },[]);

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