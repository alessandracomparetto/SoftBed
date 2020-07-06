import React, {useEffect, useState} from "react";
import axios from "axios";

function OspitiInseriti(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);


    return(
        <li className="rounded list-group-item list-group-item-warning text-dark border border-dark">
            <div className="row">
                <div className="col-6 col-md-3 mt-2 h-100"><strong>Nome:</strong>
                    <br/>
                    <span>{props.nome}</span>
                </div>

                <div className="col-6 col-md-3 mt-2 h-100"><strong>Cognome:</strong>
                    <br/>
                    <span> {props.cognome}</span>
                </div>

                <div className="col-6 col-md-3 mt-2 h-100"><strong>Codice fiscale:</strong>
                    <br/>
                    <span> {props.codiceFiscale}</span>
                </div>

                <div className="col-12 col-md-3 h-100 my-2">
                    <button className="btn btn-warning btn-block btn-lg-inline" onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Mostra di più"}</button>
                </div>
            </div>

            <div className={"mt-3 pt-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                <div className="row mb-3">

                    <div className="col-12 col-md-3 mt-2"><strong>Nato a :</strong>
                        <br/>
                        <span>{props.comune} ({props.provincia})</span>
                    </div>

                    <div className="col-6 col-md-9 mt-2 h-100"><strong>Data di nascita:</strong>
                        <br/>
                        <span> {props.dataNascita}</span>
                    </div>

                    <div className="col-12 col-md-3 mt-2"><strong>Residente a:</strong>
                        <br/>
                        <span>{props.comuneResidenza} ({props.provinciaResidenza})</span>
                    </div>

                    <div className="col-5 col-md-3 mt-2"><strong>Via:</strong>
                        <br/>
                        <span>{props.via}, N. {props.numero}</span>
                    </div>


                    <div className="col-7 col-md-6 mt-2"><strong>CAP:</strong>
                        <br/>
                        <span>{props.cap}</span>
                    </div>

                    <div className="col-5 col-md-3 mt-2 h-100"><strong>Data di arrivo:</strong>
                        <br/>
                        <span> {props.dataArrivo}</span>
                    </div>

                    <div className="col-5 col-md-3 mt-2 h-100"><strong>Permanenza:</strong>
                        <br/>
                        <span> {props.permanenza}</span>
                    </div>


                    <div className=" col-5 col-md-3 mt-2 h-100"><strong>Tassa di soggiorno:</strong>
                        <br/>
                        <span> {props.tassa}</span>
                    </div>

                    <div className="col-12 col-md-3">
                        <button id ="button" type="button" className="btn btn-danger btn-block mt-3"  disabled={((props.idOspite !== undefined) ? true : false)} onClick={() => props.eliminaOspite(props.indiceElemento)}>Elimina</button>
                    </div>
                </div>


            </div>
        </li>
    )
}


export default OspitiInseriti;
