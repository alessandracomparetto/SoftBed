import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './App.css';
import Navbar from "./Components/Navbar";
import FormRicerca from "./Components/FormRicerca";
import Carousel from "./Components/Carousel";
import PaginaNonTrovata from "./Components/PaginaNonTrovata";
import SchermataRisultati from "./Components/Schermata Risultati/SchermataRisultati";
import SchermataStruttura from "./Components/Schermata Struttura/SchermataStruttura";
import SchermataPagamento from "./Components/Schermata Pagamento/SchermataPagamento";

function App() {
    return (
        <Router>
            {/* La navbar è presente in ogni caso */}
            <Navbar />

            <Switch>
                {/* Schermata principale */}
                <Route exact path="/">
                    <Carousel />
                    <FormRicerca />
                    <SchermataPagamento />
                </Route>

                {/* Schermata dei risultati di ricerca */}
                <Route path="/search">
                    <SchermataRisultati/>
                </Route>

                {/* Schermata della struttura */}
                <Route path="/struttura/">
                    <SchermataStruttura struttura={{nome: "Nome della struttura", id: "1", regione: "Sicilia", provincia: "Palermo", comune: "Trabia"}} />
                </Route>

                {/* TODO: Non è possibile accedere alle risorse in backend, come le immagini tramite URL */}
                {/* Se il percorso non è stato trovato viene mostrata la pagina di errore 404 */}
                <Route path="*">
                    <PaginaNonTrovata/>
                    <FormRicerca />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;