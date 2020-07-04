import React, {useEffect, useState, Fragment} from "react";
import {Link} from "react-router-dom";


function SidebarUtente(){
    const[utente, setUtente]=useState("");

    useEffect(()=>{
        let dati = JSON.parse(window.sessionStorage.getItem("utente"));
        if(dati){
            setUtente(dati);
        }
    },[]);


    return(
        <div className="col-12 col-md-3">
            {/* Navbar */}
            {/* <Sidebar */}
            <nav className="navbar bg-warning">
                <button className="ml-auto navbar-toggler mb-1" type="button" data-toggle="collapse" data-target="#menu">
                    <span className="d-none d-sm-inline mr-2 ">La mia home</span>
                    <span className="fas fa-edit"/>
                </button>
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav ml-auto text-right">
                        <button type="button" className="btn btn-warning">
                            <Link className="text-light text-decoration-none" to={`/utente/modificaAccount`}>
                                    <li className="nav-item text-center text-dark">Modifica account</li>
                            </Link>
                        </button>
                        <div className="dropdown-divider"/>
                        <button type="button" className="btn btn-warning">
                            <Link className="text-light text-decoration-none" to={`/utente/pagamenti`}>
                                <li className="nav-item text-center text-dark">Pagamenti</li>
                            </Link>
                        </button>
                        <div className="dropdown-divider"/>
                        {utente.gestore == 1 ?
                            (
                            <Fragment>
                                <button type="button" className="btn btn-warning">
                                    <Link className="text-dark text-decoration-none" to="/gestioneStrutture/">
                                        <li className="nav-item">Gestione Strutture</li>
                                    </Link>
                                </button>
                                <div className="dropdown-divider"/>
                                <button type="button" className="btn btn-warning">
                                    <Link className="text-dark text-decoration-none" to="/registrazioneStruttura/">
                                        <li className="nav-item">Registra la tua struttura</li>
                                    </Link>
                                </button>
                            </Fragment>
                            ):(
                                <button type="button" className="btn btn-warning">
                                    <Link className="text-light text-decoration-none" to={`/utente/prenotazioni`}>
                                        <li className="nav-item text-center text-dark">Prenotazioni</li>
                                    </Link>
                                </button>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default SidebarUtente;