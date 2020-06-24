import React,{useState} from "react";
import FormMetodoPagamento from "./FormMetodoPagamento";
import DatiPagamento from "./DatiPagamento";


/*
TODO:
*Inserire pattern per la carta di credito
*/

function SchermataDatoPagamento(props){
    const[listaDatiPagamento, setDatiPagamento] = useState([
        {nomeIntestatario: "Mario", cognomeIntestatario: "Rossi",numeroCarta: "0000000000000011", cvv: "123", dataScadenza: "22-08-20"},
        {nomeIntestatario: "Luigi", cognomeIntestatario: "Verdi",numeroCarta: "0000000000001111", cvv: "234", dataScadenza: "23-08-20"},
        {nomeIntestatario: "Paolo", cognomeIntestatario: "Bianchi",numeroCarta: "0000000000000021", cvv: "456", dataScadenza: "22-08-20"}
        ])

    const eliminaDatoPagamento = (indice) => {
        {/*TODO inviare richiesta al beckend*/}
        // Rimuovere dalla lista
        let tmp = [...listaDatiPagamento];
        tmp.splice(indice, 1);
        setDatiPagamento(tmp);
    }

  const aggiungiDatoPagamento = (dato) => {
        // Aggiungere alla lista
        console.log(dato);
        let tmp = [...listaDatiPagamento];
        tmp.push(dato);
        setDatiPagamento(tmp);
        console.log(tmp);
    }

    return(
        <div className="container" >
            <h4 className="mt-3 d-inline">Le tue carte di credito e di debito</h4>
            <img className="img-responsive  ml-3 mb-2" src="http://i76.imgup.net/accepted_c22e0.png"/>
            <ul className="list-group list-group-flush ">
                {
                    listaDatiPagamento.map((pagamenti, indice) => {
                        return <li className="list-group-item list-group-item-warning"><DatiPagamento key={indice} indiceElemento={indice} nomeIntestatario={pagamenti.nomeIntestatario} cognomeIntestatario={pagamenti.cognomeIntestatario} numeroCarta={pagamenti.numeroCarta} cvv = {pagamenti.cvv} dataScadenza={pagamenti.dataScadenza} eliminaDatoPagamento={eliminaDatoPagamento}/></li>
                    })

                }
            </ul>

            <FormMetodoPagamento aggiungiDatoPagamento={aggiungiDatoPagamento}/>
        </div>
    )
}


export default SchermataDatoPagamento;