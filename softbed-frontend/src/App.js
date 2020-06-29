import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Navbar from "./Components/Navbar";
import FormRicerca from "./Components/FormRicerca";
import Carousel from "./Components/Carousel";
import PaginaNonTrovata from "./Components/PaginaNonTrovata";
import SchermataRisultati from "./Components/Schermata Risultati/SchermataRisultati";
import SchermataStruttura from "./Components/Schermata Struttura/SchermataStruttura";
import Registrazione from "./Components/Registrazione";
import Login from "./Components/Login";
import RegistrazioneStruttura from "./Components/Registrazione Struttura/RegistrazioneStruttura";
import SchermataPrenotazioniOspite from "./Components/Schermata Prenotazioni Ospite/SchermataPrenotazioniOspite";
import Footer from "./Components/Footer";
import StruttureRecenti from "./Components/StruttureRecenti";
import Immagine from "./Components/Immagine";


function App() {

    // TODO: da rimuovere, solo per test
    const descrizione = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac eleifend lacus." +
        " In sed interdum augue. Aliquam lacinia lectus pulvinar lacus feugiat commodo. Praesent suscipit quam a" +
        " ipsum luctus congue. Sed quis nibh mauris. Vivamus massa elit, rhoncus a velit non, suscipit elementum sem." +
        " Sed commodo lacus nulla, non placerat libero gravida a. Orci varius natoque penatibus et magnis dis" +
        " parturient montes, nascetur ridiculus mus. Aliquam nec justo at felis posuere laoreet."

    const struttura = {
        nome: "Nome della struttura",
        id: "1",
        regione: "Sicilia",
        provincia: "Palermo",
        comune: "Trabia",
        tipologia: "b&b",
        descrizione: descrizione,
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

    return (
        <Router>
            <Switch>
                {/* Immagini da backend */}
                <Route path="/uploads/foto/:id/:immagine">
                    <Immagine />
                </Route>

                <Route path="*">
                    {/* La navbar è presente in ogni caso */}
                    <Navbar />

                    <Switch>
                        {/* Schermata principale */}
                        <Route exact path="/">
                            <Carousel />
                            <FormRicerca />
                            <StruttureRecenti />
                        </Route>

                        <Route exact path="/accedi/">
                            <Login />
                        </Route>

                        <Route exact path="/registrati/">
                            <Registrazione />
                        </Route>

                        <Route path="/registrazioneStruttura/">
                            <RegistrazioneStruttura />
                        </Route>

                        {/* Schermata dei risultati di ricerca */}
                        <Route exact path="/search">
                            <SchermataRisultati/>
                        </Route>

                        {/* Schermata della struttura */}
                        <Route exact path="/struttura/:id">
                            <SchermataStruttura struttura={struttura} />
                        </Route>

                        <Route path="/registrazioneStruttura">
                            <RegistrazioneStruttura/>
                        </Route>

                        <Route path="/profilo/:id">
                            <Route path="*/prenotazioni-effettuate/">
                                <SchermataPrenotazioniOspite />
                            </Route>
                        </Route>

                        {/* Se il percorso non è stato trovato viene mostrata la pagina di errore 404 */}
                        <Route path="*">
                            <PaginaNonTrovata/>
                            <FormRicerca />
                        </Route>
                    </Switch>

                    <Footer />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;