import React, {useState} from "react";

function DatiPagamento(props){
    const [mostraContenuto, setMostraContenuto] = useState(false);
    const toggleContenuto = () => setMostraContenuto(!mostraContenuto);

    return(
        <div>
            <div className="row">
                <p className="col-6 col-md-4 mt-2"><strong>Carta termina con:</strong> {props.numeroCarta.substring(12)}</p>
                <p className="col-6 col-md-6 mt-2"><strong>Scadenza:</strong> {props.dataScadenza}</p>

                <div className=" col-12 col-md-2 btn-group d-flex justify-content-around">
                    <button type="button" className="btn btn-primary mb-2 " style={{width: 170 + 'px'}} onClick={toggleContenuto}>{mostraContenuto ? "Mostra meno" : "Visualizza"}</button>
                </div>
            </div>

            <div id="pagamento" className={"row my-3 py-3 border-top border-dark" + ((mostraContenuto) ? "" : " collapse")}>
                    <p className="col-12 col-md-4 "><strong>Intestatario carta:</strong> {props.nomeIntestatario} {props.cognomeIntestatario}</p>
                    <p className="col-12 col-md-4" ><strong>Numero carta: </strong> {props.numeroCarta}</p>
                    <p className="col-6 col-md-2" ><strong>CVV: </strong>{props.cvv}</p>
                    <div className="col-6 col-md-2 btn-group d-flex justify-content-around text-right">
                        <button type="button" className="btn btn-danger" onClick={() => props.eliminaDatoPagamento(props.indiceElemento)}>Elimina</button>
                    </div>
            </div>
        </div>
    )
}


export default DatiPagamento;
