import React, {useEffect, useState} from "react";
import FormMetodoPagamento from "./FormMetodoPagamento";
import DatiPagamento from "./DatiPagamento";
import axios from "axios";
import SidebarUtente from "../SchermataPersonaleUtente/SidebarUtente";
import {useHistory, useLocation} from "react-router-dom";
import reindirizza from "../../Actions/reindirizzamento";
import mostraDialogErrore from "../../Actions/errore";


/*
TODO:
*Inserire pattern per la carta di credito
*/

function SchermataDatoPagamento(props){
    const[listaDatiPagamento, setDatiPagamento] = useState([{nomeIntestatario:"", cognomeIntestatario:"", numeroCarta:"", cvv:"", dataScadenza:""}]);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        let utente = JSON.parse(window.sessionStorage.getItem("utente"));
        if(!utente || utente.length==0){
            reindirizza(history, {
                pathname: '/accedi',
                state: {
                    provenienza: 'Schermata Dato Pagamento',
                    urlProvenienza: location.pathname
                }
            }, 3000, "Qualcosa è andato storto. Effettua nuovamente l'accesso");
        }
        axios.post(`/utente/listaPagamenti`, {"idUtente":utente.idUtente}).then(res => {
            console.log("DATI PAGAMENTO RECUPERATI=======");
            console.log(res.data);
            setDatiPagamento(res.data);
        }).catch(err =>{
            if(err.response.status === 401){
                reindirizza(history, {
                    pathname: '/accedi',
                    state: {
                        provenienza: "Schermata Dato Pagamento",
                        urlProvenienza: location.pathname
                    }

                }, 3000, "Devi effettuare nuovamente l'accesso per accedere ai tuoi dati");
            }else{
                mostraDialogErrore();
            }
        });
    }, []);

    const eliminaDatoPagamento = (numeroCarta, indice) => {
        let data = {"numeroCarta":numeroCarta};
        try {
            axios.post("/utente/eliminaDatoPagamento", data)
                .then(res => { // then print response status
                    console.log("DATO ELIMINATO ======= ");
                    console.log(res.data);
                    let tmp = [...listaDatiPagamento];
                    tmp.splice(indice, 1);
                    setDatiPagamento(tmp);
                });
        }catch(err){
            mostraDialogErrore();
        }
    };


    return(
        <div className="d-block">
            <div className="row mx-auto">
                <SidebarUtente/>
                <div className="container my-3 col-12 col-md-9" >
                    <div className="my-3">
                        <h4 className="mt-3 d-inline">Le tue carte di credito e di debito</h4>
                        <img className="img-responsive  ml-3 mb-2" src="http://i76.imgup.net/accepted_c22e0.png" alt="metodi di pagamento accettati"/>
                        <ul className="list-group list-group-flush ">
                            {listaDatiPagamento &&
                                listaDatiPagamento.map((pagamenti, indice) => {
                                    return <DatiPagamento key={indice} indiceElemento={indice} nomeIntestatario={pagamenti.nomeIntestatario} cognomeIntestatario={pagamenti.cognomeIntestatario} numeroCarta={pagamenti.numeroCarta} cvv = {pagamenti.cvv} dataScadenza={pagamenti.dataScadenza} eliminaDatoPagamento={eliminaDatoPagamento}/>
                                })
                            }
                        </ul>
                    </div>
                    <FormMetodoPagamento listaDatiPagamento={listaDatiPagamento} setDatiPagamento={setDatiPagamento}/>
                </div>
            </div>
        </div>
    )
}


export default SchermataDatoPagamento;