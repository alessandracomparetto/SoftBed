import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './App.css';
import Navbar from "./Components/Navbar";
import FormRicerca from "./Components/FormRicerca";
import Carousel from "./Components/Carousel";
import PaginaNonTrovata from "./Components/PaginaNonTrovata";
import SchermataRisultati from "./Components/SchermataRisultati";

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
                </Route>

                {/* Schermata dei risultati di ricerca */}
                <Route path="/search" component={SchermataRisultati}/>

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