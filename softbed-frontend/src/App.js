import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Footer from "./Components/Footer";
import Immagine from "./Components/Immagine";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Registrazione from "./Components/Registrazione";
import RegistrazioneStruttura from "./Components/Registrazione Struttura/RegistrazioneStruttura";
import SchermataGestioneStruttura from "./Components/Schermata Gestione Struttura/SchermataGestioneStruttura";
import SchermataOperazioneCompletata from "./Components/Schermata Operazione Completata/SchermataOperazioneCompletata";
import SchermataPaginaNonTrovata from "./Components/Pagina Non Trovata/SchermataPaginaNonTrovata";
import SchermataPrenotazioniOspite from "./Components/Schermata Prenotazioni Ospite/SchermataPrenotazioniOspite";
import SchermataPrincipale from "./Components/SchermataPrincipale";
import SchermataRisultati from "./Components/Schermata Risultati/SchermataRisultati";
import SchermataStruttura from "./Components/Schermata Struttura/SchermataStruttura";
import SchermataStrutture from "./Components/SchermataStrutture/SchermataStrutture";
import SchermataDatoPagamento from "./Components/Schermata Dato Pagamento/SchermataDatoPagamento";
import FormDatiAggiuntivi from "./Components/SchermataPersonaleUtente/FormDatiAggiuntivi";
import SchermataPersonaleUtente from "./Components/SchermataPersonaleUtente/SchermataPersonaleUtente";
import SchermataPrenotazioneStruttura from "./Components/Schermata Prenotazione Struttura/SchermataPrenotazioneStruttura";
import SchermataPagamento from "./Components/Schermata Pagamento/SchermataPagamento";
import SchermataDatiOspiti from "./Components/Schermata Dati Ospiti/SchermataDatiOspiti";
import Rendiconto from "./Components/Schermata Gestione Struttura/Rendiconto";


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

                       <Route exact path="/struttura/gestioneStruttura/:indice">
                            <SchermataGestioneStruttura />
                        </Route>


                        <Route exact path="/struttura/rendiconto/:indice">
                            <Rendiconto />
                        </Route>


                        <Route path="/gestioneStrutture/">
                            <SchermataStrutture />
                        </Route>

                        <Route exact path="/operazione-completata">
                            <SchermataOperazioneCompletata />
                        </Route>

                        <Route exact path="/pagamento">
                            <SchermataPagamento />
                        </Route>

                        <Route exact path="/utente">
                            <SchermataPersonaleUtente/>
                        </Route>

                        <Route exact path="/utente/modificaAccount">
                            <FormDatiAggiuntivi/>
                        </Route>

                        <Route exact path="/utente/pagamenti">
                            <SchermataDatoPagamento/>
                        </Route>

                        <Route exact path="/utente/prenotazioni">
                            <SchermataPrenotazioniOspite/>
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

                        <Route exact path="/struttura/gestioneStruttura/:indice/prenotazioni">
                            <SchermataPrenotazioneStruttura />
                        </Route>

                        <Route exact path="/ospiti/dichiarazioneOspiti/:indice/:refPrenotazione">
                            <SchermataDatiOspiti />
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
