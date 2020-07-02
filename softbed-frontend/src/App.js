import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Footer from "./Components/Footer";
import Immagine from "./Components/Immagine";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Registrazione from "./Components/Registrazione";
import RegistrazioneStruttura from "./Components/Registrazione Struttura/RegistrazioneStruttura";
import SchermataGestioneStruttura from "./Components/Schermata Gestione Struttura/SchermataGestioneStruttura";
import SchermataOperazioneCompletata from "./Components/Schermata Operazione Completata/SchermataOperazioneCompletata";
import SchermataPagamento from "./Components/Schermata Pagamento/SchermataPagamento";
import SchermataPaginaNonTrovata from "./Components/Pagina Non Trovata/SchermataPaginaNonTrovata";
import SchermataPrenotazioniOspite from "./Components/Schermata Prenotazioni Ospite/SchermataPrenotazioniOspite";
import SchermataPrincipale from "./Components/SchermataPrincipale";
import SchermataRisultati from "./Components/Schermata Risultati/SchermataRisultati";
import SchermataStruttura from "./Components/Schermata Struttura/SchermataStruttura";
import SchermataStrutture from "./Components/SchermataStrutture/SchermataStrutture";


function App() {

    return (
        <Router>
            <Switch>
                {/* Immagini da backend */}
                <Route path="/uploads/foto/:id/:immagine">
                    <Immagine />
                </Route>

                <Route path="*">
                    <Navbar />

                    <Switch>
                        {/* Schermata principale */}
                        <Route exact path="/">
                            <SchermataPrincipale />
                        </Route>

                        <Route exact path="/accedi/">
                            <Login />
                        </Route>

                       <Route path="/struttura/gestioneStruttura/:id">
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

                        <Route exact path="/struttura/:id">
                            <SchermataStruttura />
                        </Route>

                        {/* Se il percorso non è stato trovato viene mostrata la pagina di errore 404 */}
                        <Route path="*">
                            <SchermataPaginaNonTrovata />
                        </Route>
                    </Switch>

                    <Footer />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
