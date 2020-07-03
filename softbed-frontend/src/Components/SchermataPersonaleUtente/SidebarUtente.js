import React from "react";
import {Link} from "react-router-dom";

function SidebarUtente(){
    /*TODO prendere id utente*/
    let idUtente=1;
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
                            <Link className="text-light text-decoration-none" to={`/utente/${idUtente}/modificaAccount`}>
                                    <li className="nav-item text-center text-dark">Modifica account</li>
                            </Link>
                        </button>
                        <div className="dropdown-divider"/>
                        <button type="button" className="btn btn-warning">
                            <Link className="text-light text-decoration-none" to={`/utente/${idUtente}/pagamenti`}>
                                <li className="nav-item text-center text-dark">Pagamenti</li>
                            </Link>
                        </button>
                        <div className="dropdown-divider"/>
                        <button type="button" className="btn btn-warning">
                            <Link className="text-light text-decoration-none" to={`/utente/${idUtente}/prenotazioni`}>
                                <li className="nav-item text-center text-dark">Prenotazioni</li>
                            </Link>
                        </button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default SidebarUtente;