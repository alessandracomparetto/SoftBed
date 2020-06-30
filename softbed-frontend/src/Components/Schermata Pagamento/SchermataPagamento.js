import React, {useState, Fragment, useEffect} from "react";
import {useLocation, useHistory} from "react-router-dom"
import Breadcrumb from "../Breadcrumb";
import $ from "jquery"
import FormMetodoPagamento from "../Schermata Dato Pagamento/FormMetodoPagamento";
import axios from "axios";
import RiepilogoPrenotazionePDF from "./RiepilogoPrenotazionePDF";
import mostraDialogErrore from "../../Actions/errore";

function SchermataPagamento() {

    // TODO: utilizzate per test, da rimuovere
    const pagamentoOnLine = true;
    const pagamentoInLoco = true;

    const metodiUtente = [
        {id: 2751, nome: "Mastercard", numero: "0000 1111 2222 3333"},
        {id: 3725, nome: "Poste", numero: "3333 4444 5555 6666"}
    ]

    const [onLineAttivo, setStatoOnline] = useState(false);
    const [nuovoMetodo, setNuovoMetodo] = useState(false);

    // metodoPagamento e refUtente

    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();
    const [datiRichiesta, setDatiRichiesta] = useState({});

    useEffect(() => {
        // L'utente deve aver effettuato il login


        // GESTIONE DEI PARAMETRI URL
        // Se uno dei parametri richiesti non è inserito si viene reindirizzati alla pagina della struttura / home
        if (
            !query.get("idStruttura") ||
            !query.get("dataCheckIn") ||
            !query.get("dataCheckOut") ||
            !query.get("adulti") ||
            !query.get("bambini") ||
            !query.get("esenti")
        ) {
            if (!query.get("idStruttura")) history.push("/");
            else history.push(`/struttura/${query.get("idStruttura")}`);
        }

        // Aggiorna i valori dello stato
        const valori = {
            dataCheckIn: query.get("dataCheckIn"),
            orarioCheckIn: query.get("orarioCheckIn"),
            dataCheckOut: query.get("dataCheckOut"),
            orarioCheckOut: query.get("orarioCheckOut"),
            adulti: query.get("adulti"),
            bambini: query.get("bambini"),
            esenti: query.get("esenti"),
            idStruttura: query.get("idStruttura"),
            struttura: "Casa dolce vista mare",
            camere: [
                {tipologia: "singola", numero: 1},
                {tipologia: "doppia", numero: 1}
            ],
            prezzo: 42.00
        }

        // TODO: Verificare validità e disponibilità dati inseriti
        // nomeStruttura, prezzo per notte, etc.., modalità di pagamento accettate...
        // axios.get("/struttura")
        //     .then((res) => {
        //         // TODO: Aggiorna i dati (prezzo)
        //     })
        //     .catch((err) => {
        //         // TODO: Mostra messaggio di errore
        //     })

        setDatiRichiesta(valori);

        // GESTIONE DELLA SELEZIONE DELAL MODALITÀ DI PAGAMENTO
        const modPagamento = $("input[name='modPagamento']");
        const modPagamentoOnline = $("#online");

        const metodoPagamentoOnline = $("input[name='pagOnline']");
        const nuovoMetodoPagamento = $('#nuovoMetodo');

        // Gestione della selezione sulla tipologia di pagamento (in loco o online)
        modPagamento.on('change', () => {
            if (modPagamentoOnline[0]) {
                const stato = modPagamentoOnline[0].checked
                setStatoOnline(stato);

                if (!stato) {
                    setNuovoMetodo(false);
                }
            }
        });

        // Gestione della selezione sul metodo di pagamento online (vecchio o nuovo)
        metodoPagamentoOnline.on('change', () => {
            if (nuovoMetodoPagamento[0]) {
                const stato = nuovoMetodoPagamento[0].checked;
                setNuovoMetodo(stato);
            }
        })
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();

        // TODO: Ottenere id Utente e i metodi di pagamento
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
                    .catch((err) => (console.log(err)));

                history.push("/operazione-completata");
            })
            .catch(err => {
                mostraDialogErrore();
            });
    }

    return (
        <div className="container my-3">
            <div className="py-2">
                <Breadcrumb gerarchia={[
                    {testo: "Richiesta di prenotazione", stato: "active"},
                    {testo: "Pagamento", stato: "active"}
                ]} icona="bed"/>
            </div>

            <div className="d-lg-flex flex-row-reverse">
                {/* Riepilogo richiesta */}
                <div className="card col-12 col-lg-4 bg-dark text-light py-3 h-100">
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
                            { datiRichiesta.esenti && datiRichiesta.esenti > 0 && (
                                <span className="text-90">&nbsp;({datiRichiesta.esenti} esent{parseInt(datiRichiesta.esenti) === 1 ? "e" : "i"} da tasse)</span>
                            )}

                            { datiRichiesta.bambini && datiRichiesta.bambini > 0 && (
                                <Fragment>
                                    <br/>
                                    <span className="text-90">{datiRichiesta.bambini}x bambino</span>
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
                            { pagamentoOnLine && (
                                <div className="radio">
                                    <label><input id="online" className="mr-2" type="radio" name="modPagamento" value="online" required/>Pagamento online</label>

                                    { onLineAttivo && (
                                        <Fragment>
                                            <div className="ml-3">
                                                { metodiUtente.map((metodo, indice) => {
                                                    return (
                                                        <div key={indice} className="radio">
                                                            <label><input className="mr-2" type="radio" name="pagOnline" value={indice} required/>{metodo.nome} (termina con {metodo.numero.substr(metodo.numero.length - 4, 4)})</label>
                                                        </div>
                                                    )
                                                })}
                                                <div>
                                                    <div className="radio">
                                                        <label><input id="nuovoMetodo" className="mr-2" type="radio" name="pagOnline" value="nuovo" required/>Aggiungi nuovo metodo di pagamento</label>
                                                    </div>

                                                    { nuovoMetodo && (
                                                        <FormMetodoPagamento/>
                                                    )}

                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            )}

                            { pagamentoInLoco && (
                                <div className="radio">
                                    <label><input className="mr-2" type="radio" name="modPagamento" value="inLoco"/>Pagamento in loco</label>
                                </div>
                            )}

                            <div className="text-right">
                                <button className="btn btn-warning" type="submit" disabled={nuovoMetodo}>Effettua richiesta</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SchermataPagamento;
