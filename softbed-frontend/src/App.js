import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Footer from "./Components/Componenti Parziali/Footer";
import Immagine from "./Components/Componenti Parziali/Immagine";
import Login from "./Components/Gestione Account/Autenticazione/Login";
import Navbar from "./Components/Componenti Parziali/Navbar";
import Registrazione from "./Components/Gestione Account/Autenticazione/Registrazione";
import RegistrazioneStruttura from "./Components/Gestione Struttura/Registrazione Struttura/RegistrazioneStruttura";
import SchermataGestioneStruttura from "./Components/Gestione Struttura/SchermataGestioneStruttura";
import SchermataOperazioneCompletata from "./Components/Componenti Parziali/Schermata Operazione Completata/SchermataOperazioneCompletata";
import SchermataPaginaNonTrovata from "./Components/Componenti Parziali/Pagina Non Trovata/SchermataPaginaNonTrovata";
import SchermataPrenotazioniOspite from "./Components/Gestione Prenotazioni/Prenotazioni Ospite/SchermataPrenotazioniOspite";
import SchermataPrincipale from "./Components/Homepage/SchermataPrincipale";
import SchermataRisultati from "./Components/Ricerca/Schermata Risultati/SchermataRisultati";
import SchermataStruttura from "./Components/Ricerca/Schermata Struttura/SchermataStruttura";
import SchermataStrutture from "./Components/Gestione Struttura/SchermataStrutture";
import SchermataDatoPagamento from "./Components/Gestione Account/Modifica Account/Schermata Dato Pagamento/SchermataDatoPagamento";
import FormDatiAggiuntivi from "./Components/Gestione Account/Modifica Account/FormDatiAggiuntivi";
import SchermataPersonaleUtente from "./Components/Gestione Account/SchermataPersonaleUtente";
import SchermataPrenotazioneStruttura from "./Components/Gestione Prenotazioni/Prenotazioni Struttura/SchermataPrenotazioneStruttura";
import SchermataPagamento from "./Components/Gestione Prenotazioni/Schermata Pagamento/SchermataPagamento";
import SchermataDatiOspiti from "./Components/Gestione Dichiarazioni/Gestione Dichiarazione Ospiti/SchermataDatiOspiti";
import RendicontoCompletato from "./Components/Gestione Dichiarazioni/Gestione Rendiconto/RendicontoCompletato";
import DichiarazioneCompletata
    from "./Components/Gestione Dichiarazioni/Gestione Dichiarazione Ospiti/DichiarazioneCompletata";


function App() {

    return (
        <Router>
            <Switch>
                {/* Immagini da backend */}
                <Route path="/uploads/foto/:immagine">
                    <Immagine />
                </Route>

                <Route path="*">
                    <div className="corpo">
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

                        <Route path="/gestioneStrutture/">
                            <SchermataStrutture />
                        </Route>

                        <Route exact path="/operazione-completata">
                            <SchermataOperazioneCompletata />
                        </Route>

                        <Route exact path="/rendiconto-completato">
                            <RendicontoCompletato />
                        </Route>

                        <Route exact path="/dichiarazione-completata/:indice">
                            <DichiarazioneCompletata/>
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
                    </div>
                    <Footer />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
