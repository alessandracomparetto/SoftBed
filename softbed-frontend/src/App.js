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
import SchermataGestioneStruttura from "./Components/Schermata Gestione Struttura/SchermataGestioneStruttura";
import SchermataStrutture from "./Components/SchermataStrutture/SchermataStrutture";
import SchermataPagamento from "./Components/Schermata Pagamento/SchermataPagamento";
import SchermataOperazioneCompletata from "./Components/Schermata Operazione Completata/SchermataOperazioneCompletata";


function App() {

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

                        <Route path="/gestioneStruttura/">
                            <SchermataGestioneStruttura />
                        </Route>

                        <Route path="/gestioneStrutture/">
                            <SchermataStrutture />
                        </Route>

                        <Route exact path="/operazione-completata">
                            <SchermataOperazioneCompletata />
                        </Route>

                        <Route exact path="/pagamento/informazioni">
                            <SchermataPagamento />
                        </Route>

                        <Route exact path="/profilo/prenotazioni-effettuate/">
                            <SchermataPrenotazioniOspite />
                        </Route>

                        <Route exact path="/registrati/">
                            <Registrazione />
                        </Route>

                        <Route path="/registrazioneStruttura/">
                            <RegistrazioneStruttura />
                        </Route>

                        <Route exact path="/search">
                            <SchermataRisultati />
                        </Route>

                        {/* Schermata della struttura */}
                        <Route exact path="/struttura/:id">
                            <SchermataStruttura />
                        </Route>

                        {/* Se il percorso non è stato trovato viene mostrata la pagina di errore 404 */}
                        <Route path="*">
                            <PaginaNonTrovata />
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
