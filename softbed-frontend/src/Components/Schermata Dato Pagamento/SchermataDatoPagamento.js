import React from "react";
import FormMetodoPagamento from "./FormMetodoPagamento";
import Prenotazione from "../Schermata prenotazione struttura/Prenotazione";
import RichiesteInAttesa from "../Schermata prenotazione struttura/RichiesteInAttesa";
import RichiesteConfermate from "../Schermata prenotazione struttura/RichiesteConfermate";
/*
TODO:
*Inserire pattern per la carta di credito
*/
/*
function scriviDato(){
    let listaDatiPagamento = document.getElementById("listaDatiPagamento");
    let nome = document.getElementById("name");
    let ncarta = document.getElementById("ncarta");
    let cvv = document.getElementById("cvv");
    let data = document.getElementById("data");

    let p = document.createElement("P");
    let info = nome.value + ncarta.value + cvv.value + data.value;
    let stringa = document.createTextNode(info);
    p.appendChild(stringa);
    listaDatiPagamento.appendChild(p);
}*/
function SchermataDatoPagamento(props){

    const GIORNO = 86400000;
    const dataAttuale = new Date();
    //la data di scadenza deve essere maggiore o uguale al mese attuale
    const primaData = new Date(dataAttuale.getTime());
    const minData = convertiData(primaData);

    // Converte la data da oggetto Date a stringa in formato "MM-GG"
    function convertiData (data) {
        // +1 poiché getMonth() restituisce valori da 0 (Gennaio) a 11 (Dicembre).
        const mese = (data.getMonth() + 1).toString().padStart(2, "0");
        const anno = data.getFullYear();
        return anno + "-" + mese;
    }

    let finestra=false;
    function visualizzaDatiPagamento(e){
        if(finestra==false){
            document.getElementById("datiPagamento").classList.add("collapse");
            finestra=true;
        }
        else{
            document.getElementById("datiPagamento").classList.remove("collapse");
            finestra=false;
        }
    }


    function eliminaDatoPagamento(e){
        {/*TODO inviare richiesta al beckend*/}
    }

    return(
        <div className="container" id="pagamento">
            <h4 className="mt-3 d-inline">Le tue carte di credito e di debito</h4>
            <img className="img-responsive  ml-3 mb-2" src="http://i76.imgup.net/accepted_c22e0.png"/>
            <ul className="list-group list-group-flush ">

                <li className="list-group-item list-group-item-warning">

                    <div className="row  d-flex justify-content-center">
                        <div className="col-6 col-md-4">
                            <strong>Carta termina con:</strong> {props.datoPagamento.numeroCarta.substring(12)}
                        </div >

                        <div className="col-6 col-md-4">
                            <strong>Scadenza:</strong> {props.datoPagamento.dataScadenza}
                        </div>
                        <div className=" col-12 col-md-3 btn-group d-flex justify-content-around">
                            <button type="button" className="btn btn-primary mt-2 mr-2 " style={{width: 170 + 'px'}} onClick={visualizzaDatiPagamento}>Visualizza</button>
                        </div>
                    </div>
                    <div id="datiPagamento" className="collapse">

                            <div className="row">
                                <p className="col-12 col-md-5"><strong>Intestatario carta:</strong> {props.datoPagamento.nomeIntestatario}</p>
                                <p className="col-12 col-md-5" ><strong>Numero carta: </strong> {props.datoPagamento.numeroCarta}</p>
                                <p className="col-12 col-md-2" ><strong>CVV: </strong>{props.datoPagamento.cvv}</p>
                            </div>

                            <div className="col-12 col-md-2 btn-group d-flex justify-content-around">
                                <button type="button " className="btn btn-danger mr-2" onClick={eliminaDatoPagamento}>Elimina</button>
                            </div>

                    </div>

                </li>
            </ul>

        </div>
    )
}


export default SchermataDatoPagamento;