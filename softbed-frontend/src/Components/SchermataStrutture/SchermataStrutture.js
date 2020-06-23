import React, {useState} from "react";
import CalcoloGuadagno from "./CalcoloGuadagno"
function SchermataStrutture(){
    const [listaStrutture] = useState([
        {   idStruttura: "3333",
            nomeStruttura: "Struttura 1",
            refGestore: "5555",
            refIndirizzo: "1",
            renditontoEffettuato: "true",
            idIndirizzo :"1",
            via : "Carlo Magno",
            cap : "90011",
            refComune : "5",
            idComune :"5",
            nomeComune : "CHISSA",
            refProvincia : "90",
            tipologia: "B&B"
        },
        {    idStruttura: "4444",
            nomeStruttura: "Struttura 2",
            refGestore: "6666",
            refIndirizzo: "2",
            renditontoEffettuato: "true",
            idIndirizzo :"2",
            via : "Carlo Magno",
            cap : "90011",
            refComune : "6",
            idComune :"6",
            nomeComune : "Why",
            refProvincia : "81",
            tipologia: "Casa vacanze"
        }
    ]);

    function apri() {

    }
    /*TODO: toggle calcolo guadagno, pulsanti, mettere margin top e completare*/

    return(
        <div className="container">
            <h4>Strutture registrare</h4>
            <ul className="list-group list-group-flush ">
                {
                    listaStrutture.map((struttura, indice) => {
                        return(
                            <li className={"list-group-item border border-dark border-top-"+ ((indice === 0)? "" : 0)} key="indice">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-4 col-md-3 my-auto text-center">
                                        <strong>{struttura.nomeStruttura}</strong>
                                    </div>
                                    <div className="col-4 col-md-3 my-auto text-center">
                                        <strong>{struttura.nomeComune} </strong>
                                    </div>
                                    <div className="col-4 col-md-3 my-auto text-center">
                                        <strong>{struttura.tipologia}</strong>
                                    </div>
                                    <div  className=" col-12 col-lg-3">
                                        <button type="button" className="btn btn-block btn-primary mt-2 mr-2 ">Visualizza</button>
                                        <button type="button" className="btn btn-block btn-outline-primary mt-2 mr-2" onClick={apri}>Calcolo Guadagni</button>
                                    </div>

                                </div>
                                <CalcoloGuadagno/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default SchermataStrutture;