import React, {useEffect, useState} from "react";
import axios from "axios";
import $ from 'jquery';
import FormMetodoPagamento from "../../Gestione Account/Modifica Account/Schermata Dato Pagamento/FormMetodoPagamento";

function FormPagamentoStruttura(props) {
    const [listaDatiPagamento, setDatiPagamento] = useState([]);

    useEffect(() => {
        let utente = JSON.parse(window.sessionStorage.getItem("utente"));
        axios.post(`/utente/listaPagamenti`, {"idUtente":utente.idUtente}).then(res => {
            setDatiPagamento(res.data);
        }).catch(err =>{
            console.log(err);
        });
    }, []);

    function vaiAvanti(event){
        $("#formPagamento").addClass("was-validated");
        if(props.dati.refNumeroCarta==undefined){
            event.preventDefault();
            $("#feedbackPagamento").removeClass("collapse")
        }
        else{
            $("#feedbackPagamento").addClass("collapse");
            props.go();
        }
    }

    if (props.currentStep !== 6) {
        return null;
    }
    else if(props.currentStep === 6 && (props.dati.pagamentoOnline==0 || props.dati.pagamentoOnline==undefined)){
        props.go();
        return null;
    }
    else if(props.currentStep === 6 && props.dati.pagamentoOnline==1) {
        return (
            <div>
                <p>Inserisci il metodo di pagamento associato alla tua struttura</p>
                <form id="formPagamento" className="p-3 needs-validation" noValidate onClick={props.handleChange}>
                    <div className="ml-3">
                        { listaDatiPagamento && listaDatiPagamento.map((metodo, indice) => {
                            return (
                                <div key={indice} className="custom-control custom-radio mt-2">
                                    <input type="radio" className="custom-control-input pr-3" id={metodo.numeroCarta} name="refNumeroCarta"  value={metodo.numeroCarta} defaultChecked={props.dati.refNumeroCarta=== metodo.numeroCarta} onClick={props.handleChange}  required/>
                                    <label className="custom-control-label" htmlFor={metodo.numeroCarta}>{metodo.nomeIntestatario} {metodo.cognomeIntestatario} (termina con {metodo.numeroCarta.substr(metodo.numeroCarta.length - 4, 4)})</label>
                                </div>
                            )
                        })}
                    </div>
                    <div id="feedbackPagamento" className="col-12 text-danger text-center collapse">
                        Selezionare il metodo di pagamento
                    </div>
                </form>
                    <div className="form mt-3 card shadow">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#formNuovoMetodo" aria-expanded="false" aria-controls="formNuovoMetodo">
                                Aggiungi un nuovo metodo di pagamento
                            </button>
                        </h5>
                        <div id="formNuovoMetodo" className="collapse">
                            <FormMetodoPagamento setDatiPagamento={setDatiPagamento} listaDatiPagamento={listaDatiPagamento}/>
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse justify-content-around">
                        <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={vaiAvanti}>Continua</button>
                        <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={props.goBack}>Indietro</button>
                    </div>
            </div>
        )
    }
}
export default FormPagamentoStruttura;