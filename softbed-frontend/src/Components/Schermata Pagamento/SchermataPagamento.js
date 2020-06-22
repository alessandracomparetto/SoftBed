import React, { useState, Fragment } from "react";
import Breadcrumb from "../Breadcrumb";
import $ from "jquery"
import FormMetodoPagamento from "../Schermata Dato Pagamento/FormMetodoPagamento";

function SchermataPagamento() {
    // TODO: utilizzate per test, da sostituire
    const pagamentoOnLine = true;
    const pagamentoInLoco = true;
    const metodiUtente = [
        {nome: "Mastercard", numero: "0000 1111 2222 3333"},
        {nome: "Poste", numero: "3333 4444 5555 6666"}
    ]
    const richiesta = {
        struttura: "Nome struttura",
        checkIn: "29-05-2020",
        checkOut: "30-05-2020",
        camere: [
            {tipologia: "singola", numero: 1},
            {tipologia: "doppia", numero: 1}
        ],
        persone: 2,
        bambini: 1,
        esenti: 1,
        prezzo: 42.00
    }

    const [onLineAttivo, setStatoOnline] = useState(false);
    const [nuovoMetodo, setNuovoMetodo] = useState(false);


    $(document).ready(() => {
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
        })

        // Gestione della selezione sul metodo di pagamento online (vecchio o nuovo)
        metodoPagamentoOnline.on('change', () => {
            if (nuovoMetodoPagamento[0])
                setNuovoMetodo(nuovoMetodoPagamento[0].checked);
        })
    })

    // TODO: Aggiungere controllo su selezione

    return (
        <div className="container mb-3">
            <div className="row">
                {/* Selezione metodo di pagamento */}
                <div className="col-12 col-lg-8 py-2">
                    <Breadcrumb gerarchia={[
                        {testo: "Richiesta di prenotazione", stato: "active"},
                        {testo: "Pagamento", stato: "active"}
                    ]} icona="bed"/>
                    <h2>Seleziona il metodo di pagamento</h2>
                    <div className="form">
                        <form>
                            { pagamentoOnLine && (
                                <div className="radio">
                                    <label><input id="online" className="mr-2" type="radio" name="modPagamento" value="online"/>Pagamento online</label>

                                    { onLineAttivo && (
                                        <Fragment>
                                            <div className="ml-3">
                                                { metodiUtente.map((metodo, indice) => {
                                                    return (
                                                        <div key={indice} className="radio">
                                                            <label><input className="mr-2" type="radio" name="pagOnline" value={indice}/>{metodo.nome} (termina con {metodo.numero.substr(metodo.numero.length - 4, 4)})</label>
                                                        </div>
                                                    )
                                                })}
                                                <div>
                                                    <div className="radio">
                                                        <label><input id="nuovoMetodo" className="mr-2" type="radio" name="pagOnline" value="nuovo"/>Aggiungi nuovo metodo di pagamento</label>
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
                                <button className="btn btn-primary" type="submit">Effettua richiesta</button>
                            </div>
                        </form>
                    </div>

                </div>

                {/* Riepilogo richiesta */}
                <div className="card col-12 col-lg-4 bg-dark text-light py-3 h-100">
                    <h3 className="card-title">Riepilogo richiesta</h3>
                    <div className="ml-2">
                        <div className="mb-3">
                            <h5 className="mb-0">Struttura</h5>
                            <span className="text-90">{richiesta.struttura}</span>
                        </div>

                        <div className="mb-3">
                            <h5 className="mb-0">Periodo</h5>
                            <span className="text-90">dal <strong>{richiesta.checkIn}</strong> al <strong>{richiesta.checkOut}</strong></span>
                        </div>

                        { richiesta.camere[0] && (
                            <div className="mb-3">
                                <h5 className="mb-0">Camere selezionate</h5>
                                {
                                    richiesta.camere.map((camera, indice) => {
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
                    </div>

                    {/* Prezzo */}
                    <div className="text-right">
                        <span className="display-4 d-inline-block border-top border-warning w-100">{richiesta.prezzo}€</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SchermataPagamento;