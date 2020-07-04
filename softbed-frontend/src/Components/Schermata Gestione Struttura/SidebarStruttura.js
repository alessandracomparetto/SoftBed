import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {useParams} from "react-router-dom"

function SidebarStruttura() {

    function informazioniStruttura(){
        $(".contenuto").addClass("collapse");
        $("#InformazioniPricipali").removeClass("collapse");
    }
    function modificaCaratteristiche(){
        $(".contenuto").addClass("collapse");
        $("#caratteristiche").removeClass("collapse");
    }
    function modificaCondizioni(){
        $(".contenuto").addClass("collapse");
        $("#condizioni").removeClass("collapse");
    }
    function calcoloGuadagno(){
        $(".contenuto").addClass("collapse");
        $("#guadagno").removeClass("collapse");
    }
    let {indice} = useParams();

    return(
        <nav className="navbar bg-warning">
            <button className="ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                <span className="d-none d-sm-inline mr-2">La mia struttura</span>
                <span className="fas fa-edit"/>
            </button>
            <div className="collapse navbar-collapse" id="menu">
                <ul className="navbar-nav ml-auto text-right">
                    <button type="button" className="btn btn-warning" onClick={informazioniStruttura}>
                        <li className="nav-item text-center text-md-right">Informazioni sulla struttura</li>
                    </button>
                    <div className="dropdown-divider"/>

                    <button type="button" className="btn btn-warning">
                        <Link to={`${indice}/prenotazioni`} className="text-decoration-none">
                            <li className="nav-item text-center text-md-right text-dark ">Prenotazioni</li>
                        </Link>
                    </button>

                    <div className="dropdown-divider text-dark"/>

                    <button type="button" className="btn btn-warning" onClick={calcoloGuadagno}>
                        <li className="nav-item text-center text-md-right">Calcolo guadagno</li>
                    </button>
                    <div className="dropdown-divider"/>


                    <button type="button" className="btn btn-warning" onClick={modificaCaratteristiche}>
                        <li className="nav-item text-center text-md-right">Modifica caratteristiche</li>
                    </button>
                    <div className="dropdown-divider"/>


                    <button type="button" className="btn btn-warning" onClick={modificaCondizioni}>
                        <li className="nav-item text-center text-md-right">Modifica condizioni</li>
                    </button>
                    <div className="dropdown-divider"/>

                </ul>
            </div>
        </nav>
    )

}
export default SidebarStruttura;
