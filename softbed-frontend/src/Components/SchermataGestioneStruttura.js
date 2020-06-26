import React, {Fragment} from "react"
import ImmaginiStruttura from "./Schermata Struttura/ImmaginiStruttura";
import Servizio from "./Schermata Risultati/Servizio";
import {Link} from "react-router-dom";

function SchermataGestioneStruttura() {
    const struttura = { // TODO: da eliminare - potrebbe tornare utile un dizionario {nomeServizio: icona}
        id: 1,
        nome: "Dolce Risveglio",
        descrizione: "Questa struttura è bella, ma mai quanto te che stai leggendo ^-^",
        servizi: [
            {servizio: "Aria condizionata", icona: "snowflake"},
            {servizio: "Riscaldamento", icona: "fire"},
            {servizio: "TV", icona: "tv"},
            {servizio: "Wi-Fi", icona: "wifi"},
            {servizio: "Piscina", icona: "water"},
            {servizio: "Idonea per bambini", icona: "child"},
            {servizio: "Animali ammessi", icona: "paw"}
        ]
    }

    const collegamenti = [
        {nome: "Modifica Ambienti", url: "#"},
        {nome: "Modifica Caratteristiche", url: "#"},
        {nome: "Modifica Fotografie", url: "#"},
        {nome: "Modifica Descrizione", url: "#"},
        {nome: "Modifica Condizioni di Prenotazione", url: "#"},
        {nome: "Modifica Condizioni di Pagamento", url: "#"},
        {nome: "Modifica Tasse di Soggiorno", url: "#"},
        {nome: "Modifica Disponibilità", url: "#"},
    ]

    return (
        <div className="d-flex justify-content-center">
            <div className="row mx-auto maxw-xl">
                <div className="col-12 col-md-3">
                    {/* Navbar */}
                    <nav className="navbar bg-warning">
                        <button className="d-md-none ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                            <span className="fas fa-bars"/>
                        </button>
                        <div className="navbar-collapse" id="menu">
                            <ul className="navbar-nav ml-auto text-right">
                                {collegamenti.map((link, indice) => {
                                    return (
                                        <Fragment>
                                            {indice === 0 && <div className="border-top border-dark dropdown-divider"/>}
                                            <li key={indice} className="nav-item text-center text-md-right">
                                                <Link className="nav-link text-dark" to={link.url}>{link.nome}</Link>
                                            </li>
                                            <div className="border-top border-dark dropdown-divider"/>
                                        </Fragment>
                                    )
                                })}
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Contenitore principale */}
                <div className="col-12 col-md-9">
                    {/* Immagini */}
                    <ImmaginiStruttura struttura={struttura} idStruttura={struttura.id}/>
                    {/* Informazioni struttura */}
                    <div className="d-flex">
                        <div className="shadow mt-3 card bg-white p-3">
                            <div>
                                <div>
                                    <h6>Informazioni sulla struttura</h6>
                                    <p>{struttura.descrizione}</p>
                                </div>
                            </div>
                            <div>
                                <h6>Servizi</h6>
                                <div className="row mx-auto">
                                    {
                                        struttura.servizi && struttura.servizi.map((servizio) => {
                                            return (
                                                <Servizio key={servizio.servizio} servizio={servizio.servizio} icona={servizio.icona}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SchermataGestioneStruttura;