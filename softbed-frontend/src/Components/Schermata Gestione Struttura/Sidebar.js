import React, {Fragment} from "react";
import {Link} from "react-router-dom";

function Sidebar() {
    const collegamenti = [
        {nome: "Modifica Caratteristiche", url: "struttura"},
        {nome: "Modifica Condizioni di prenotazione", url: "#"},
        {nome: "Modifica Disponibilità", url: "#"},
    ]

    return (
        <nav className="navbar bg-warning">
            <button className="ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                <span className="d-none d-sm-inline mr-2">Modifica struttura</span>
                <span className="fas fa-edit"/>
            </button>
            <div className="collapse navbar-collapse" id="menu">
                <ul className="navbar-nav ml-auto text-right">
                    {collegamenti.map((link, indice) => {
                        return (
                            <Fragment>
                                {indice === 0 && <div className="border-top border-dark dropdown-divider"/>}
                                <li key={indice} className="nav-item text-center text-md-right">
                                    <Link className="nav-link text-dark" to={link.url}>{link.nome}</Link>
                                </li>
                                <div className="dropdown-divider"/>
                            </Fragment>
                        )
                    })}
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;