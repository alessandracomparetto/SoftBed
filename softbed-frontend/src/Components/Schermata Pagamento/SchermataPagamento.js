import React, {useState, Fragment, useEffect} from "react";
import {useLocation, useHistory} from "react-router-dom"
import Breadcrumb from "../Breadcrumb";
import $ from "jquery"
import FormMetodoPagamento from "../Schermata Dato Pagamento/FormMetodoPagamento";
import axios from "axios";
import RiepilogoPrenotazionePDF from "./RiepilogoPrenotazionePDF";
import mostraDialogErrore from "../../Actions/errore";
import reindirizza from "../../Actions/reindirizzamento";

function SchermataPagamento() {

    const location = useLocation();
    const history = useHistory();

    const [pagamentoOnline, setPagamentoOnline] = useState(false);
    const [pagamentoInLoco, setPagamentoInLoco] = useState(false);
    const [listaDatiPagamento, setDatiPagamento] = useState([]);
    const [online, setStatoOnline] = useState(false);
    const [datiRichiesta, setDatiRichiesta] = useState({});

    useEffect(() => {

        if (sessionStorage.getItem("utente") && JSON.parse(sessionStorage.getItem("utente")).idUtente) {
            if (!location.state || !location.state.provenienza || !(location.state.provenienza === "Schermata struttura")) {
                reindirizza(history, '/', 3000, "Puoi accedere alla pagina di pagamento solamente dalla pagina della struttura!")
            } else {
                setDatiRichiesta(location.state);
                console.log(datiRichiesta);
            }
        } else {
            reindirizza(history, {
                pathname: '/accedi/',
                state: {
                    provenienza: 'Schermata pagamento',
                    urlProvenienza: location.pathname,
                }
            })
        }


        // Gestione della selezione sulla tipologia di pagamento (in loco o online)
        const modPagamentoOnline = $("#online");
        $("input[name='modPagamento']").on('change', () => {
            if (modPagamentoOnline[0]) {
                setStatoOnline(modPagamentoOnline[0].checked);
            }
        });
    }, []);


    const aggiungiDatoPagamento = (dato) => {
        let tmp = [...listaDatiPagamento];
        tmp.push(dato);
        setDatiPagamento(tmp);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        // TODO: Ottenere ID Utente e il metodo di pagamento selezionato
        let tmp = datiRichiesta;
        tmp["idUtente"] = 5;
        tmp["metodoPagamento"] = null; // null per pagamenti in loco
        setDatiRichiesta(tmp);

        axios.post('/prenotazione/richiesta', datiRichiesta)
            .then(res => {
                const informazioni = {
                    id: res.data,
                    emailGestore: 'slcxx98@gmail.com',
                    emailOspite: 'slcxx98@gmail.com',
                    allegato: RiepilogoPrenotazionePDF(datiRichiesta, res.data)
                }

                axios.post('/mail/richiesta-prenotazione', informazioni)
                    .catch();

                history.push({
                    pathname: "/operazione-completata",
                    state: { provenienza: "Schermata pagamento" }
                });
            })
            .catch(() => {
                mostraDialogErrore();
            });
    }

    return (
        <div className="container my-3">
            <div className="py-2">
                <Breadcrumb gerarchia={[
                    {url: `/struttura/${datiRichiesta.idStruttura}`, testo: "Struttura"},
                    {testo: "Richiesta di prenotazione", stato: "active"},
                    {testo: "Pagamento", stato: "active"}
                ]} icona="bed"/>
            </div>

            <div className="d-lg-flex flex-row-reverse">
                {/* Riepilogo richiesta */}
                <div className="card shadow col-12 col-lg-4 bg-dark text-light py-3 h-100">
                    <h3 className="card-title">Riepilogo richiesta</h3>
                    <div className="ml-2">

                        <div className="mb-3">
                            <h5 className="mb-0">Struttura</h5>
                            <span className="text-90">{datiRichiesta.struttura}</span>
                        </div>

                        <div className="mb-3">
                            <h5 className="mb-0">Periodo</h5>
                            <span className="text-90">
                                dal <strong>{new Date(datiRichiesta.dataCheckIn).toLocaleDateString()}</strong> ({datiRichiesta.orarioCheckIn})
                                al <strong>{new Date(datiRichiesta.dataCheckOut).toLocaleDateString()}</strong> ({datiRichiesta.orarioCheckOut})
                            </span>
                        </div>

                        { datiRichiesta.camere && datiRichiesta.camere[0] && (
                            <div className="mb-3">
                                <h5 className="mb-0">Camere selezionate</h5>
                                {
                                    datiRichiesta.camere.map((camera, indice) => {
                                        return (
                                            <Fragment key={indice}>
                                                <span className="text-90">{camera.numero}x {camera.tipologia}</span>
                                                <br/>
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        )}

                        <div className="mb-3">
                            <h5 className="mb-0">Persone</h5>
                            <span className="text-90">{datiRichiesta.adulti}x adulto</span>
                            { datiRichiesta.adultiEsenti && datiRichiesta.adultiEsenti > 0 && (
                                <span className="text-90">&nbsp;({datiRichiesta.adultiEsenti} esent{parseInt(datiRichiesta.adultiEsenti) === 1 ? "e" : "i"} da tasse)</span>
                            )}

                            { datiRichiesta.bambini && datiRichiesta.bambini > 0 && (
                                <Fragment>
                                    <br/>
                                    <span className="text-90">{datiRichiesta.bambini}x bambino</span>
                                    { datiRichiesta.bambiniEsenti && datiRichiesta.bambiniEsenti > 0 && (
                                        <span className="text-90">&nbsp;({datiRichiesta.bambiniEsenti} esent{parseInt(datiRichiesta.bambiniEsenti) === 1 ? "e" : "i"} da tasse)</span>
                                    )}
                                </Fragment>
                            )}
                        </div>

                    </div>

                    {/* Prezzo */}
                    <div className="text-right">
                        <span className="display-4 d-inline-block border-top border-warning w-100">{datiRichiesta.prezzo}€</span>
                    </div>
                </div>

                {/* Selezione metodo di pagamento */}
                <div className="col-12 col-lg-8 py-3 pt-lg-2">
                    <h2>Seleziona il metodo di pagamento</h2>
                    <div className="form">
                        <form onSubmit={onSubmit}>
                            { pagamentoOnline && (
                                <div className="radio">
                                    <label><input id="online" className="mr-2" type="radio" name="modPagamento" value="online" required/>Pagamento online</label>

                                    { online && (
                                        <div className="ml-3">
                                            { listaDatiPagamento.map((metodo, indice) => {
                                                return (
                                                    <div key={indice} className="radio">
                                                        <label><input className="mr-2" type="radio" name="pagOnline" value={indice} required/>{metodo.nomeIntestatario} {metodo.cognomeIntestatario} (termina con {metodo.numeroCarta.substr(metodo.numeroCarta.length - 4, 4)})</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            { pagamentoInLoco && (
                                <div className="radio">
                                    <label><input className="mr-2" type="radio" name="modPagamento" value="inLoco"/>Pagamento in loco</label>
                                </div>
                            )}

                            <div className="text-right">
                                <button className="btn btn-warning" type="submit">Effettua richiesta</button>
                            </div>
                        </form>
                    </div>

                    { pagamentoOnline && (
                        <div className="form mt-3 card shadow">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#formNuovoMetodo" aria-expanded="false" aria-controls="formNuovoMetodo">
                                    Aggiungi un nuovo metodo di pagamento
                                </button>
                            </h5>
                            <div id="formNuovoMetodo" className="collapse">
                                <FormMetodoPagamento aggiungiDatoPagamento={aggiungiDatoPagamento}/>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default SchermataPagamento;
