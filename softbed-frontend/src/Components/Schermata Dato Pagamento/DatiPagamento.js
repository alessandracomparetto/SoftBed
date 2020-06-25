import React, {useState} from "react";

function DatiPagamento(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    return(
        <li className="rounded list-group-item list-group-item-warning text-dark border border-dark">
            <div className="row">
                <div className="col-6 col-md-4 mt-2 h-100"><strong>Carta termina con:</strong>
                    <br/>
                    <span>{props.numeroCarta.substring(12)}</span>
                </div>

                <div className="col-6 col-md-5 mt-2 h-100"><strong>Scadenza:</strong>
                    <br/>
                    <span> {props.dataScadenza}</span>
                </div>
                <div className="col-12 col-md-3 h-100 my-2">
                    <button className="btn btn-warning btn-block btn-lg-inline" onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Mostra di più"}</button>
                </div>
            </div>

            <div className={"mt-3 pt-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                <div className="row mb-3 .no-gutters">
                    <div className="col-12 col-md-4"><strong>Intestatario carta:</strong>
                        <br/>
                        <span>{props.nomeIntestatario} {props.cognomeIntestatario}</span>
                    </div>

                    <div className="col-12 col-md-4 "><strong>Numero carta:</strong>
                        <br/>
                        <span>{props.numeroCarta}</span>
                    </div>

                    <div className="col-6 col-md-1"><strong>CVV:</strong>
                        <br/>
                        <span>{props.cvv}</span>
                    </div>

                    <div className="col-6 col-md-3 btn-group d-flex justify-content-around">
                        <button type="button" className="btn btn-danger" onClick={() => props.eliminaDatoPagamento(props.indiceElemento)}>Elimina</button>
                    </div>
                </div>

               {/* <div className="row">
                    <p className="col-12 col-md-4 "><strong>Intestatario carta:</strong> {props.nomeIntestatario} {props.cognomeIntestatario}</p>
                    <p className="col-12 col-md-4" ><strong>Numero carta: </strong> {props.numeroCarta}</p>
                    <p className="col-6 col-md-2" ><strong>CVV: </strong>{props.cvv}</p>

                </div>*/}
            </div>
        </li>
    )
}


export default DatiPagamento;
