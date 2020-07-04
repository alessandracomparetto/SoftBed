import React, {useEffect, useState} from "react";
import FormMetodoPagamento from "./FormMetodoPagamento";
import DatiPagamento from "./DatiPagamento";
import axios from "axios";
import SidebarUtente from "../SchermataPersonaleUtente/SidebarUtente";


/*
TODO:
*Inserire pattern per la carta di credito
*/

function SchermataDatoPagamento(props){
    const[listaDatiPagamento, setDatiPagamento] = useState([]);

  useEffect(() => {
      let utente = window.sessionStorage.getItem("utente");
      if(!utente || utente.length==0){
          window.location.href="/accedi";
      }
      //TODO GESTIRE ID UTENTE
      let data = {"idUtente":1}
      /*props.idUtente*/
        axios.post(`/utente/listaPagamenti`, data).then(res => {
            console.log("DATI PAGAMENTO RECUPERATI=======");
            console.log(res.data);
            setDatiPagamento(res.data);
        })
            .catch(err => console.log(err));
    }, []);


  const aggiungiDatoPagamento = (dato) => {
      //TODO: PASSARE ID UTENTE
      console.log(dato);
          try {
              axios.post("/utente/aggiungiDatoPagamento", dato)
                  .then(res => { // then print response status
                      console.log("DATO AGGIUNTO ======= ");
                      console.log(res.data);
                      console.log("Dati aggiunti");
                      let tmp = [...listaDatiPagamento];
                      tmp.push(dato);
                      console.log(tmp);
                      setDatiPagamento(tmp);
                  });
          }catch(err){
              if (err.response.status === 400) {
                  console.log('There was a problem with the server');
              } else {
                  console.log(err.response.data.msg);
              }
          }

    }

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
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }

    }


    return(
        <div className="d-block">
            <div className="row mx-auto">
                <SidebarUtente></SidebarUtente>
                <div className="container my-3 col-12 col-md-9" >
                    <div className="my-3">
                        <h4 className="mt-3 d-inline">Le tue carte di credito e di debito</h4>
                        <img className="img-responsive  ml-3 mb-2" src="http://i76.imgup.net/accepted_c22e0.png"/>
                        <ul className="list-group list-group-flush ">
                            {
                                listaDatiPagamento.map((pagamenti, indice) => {
                                    return <DatiPagamento key={indice} indiceElemento={indice} nomeIntestatario={pagamenti.nomeIntestatario} cognomeIntestatario={pagamenti.cognomeIntestatario} numeroCarta={pagamenti.numeroCarta} cvv = {pagamenti.cvv} dataScadenza={pagamenti.dataScadenza} eliminaDatoPagamento={eliminaDatoPagamento}/>
                                })
                            }
                        </ul>
                    </div>
                    <FormMetodoPagamento aggiungiDatoPagamento={aggiungiDatoPagamento}/>
                </div>
            </div>
        </div>
    )
}


export default SchermataDatoPagamento;