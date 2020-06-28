import React, {useState} from 'react';

let contatore = 0;

function FormAmbienti(props) {
    const camera = "Camera ";
    let [listaCamere, setListaCamere] = useState([]);
    let [lunghezzaLista, setLunghezzaLista] = useState(0);

    function vaiAvanti(event){
        event.preventDefault();
        if(!document.getElementById("form").checkValidity()){
            document.getElementById("form").classList.add("was-validated");
        }
        else{
            props.go();
        }
    }

    function vaiIndietro(){
        props.goBack();
    }


    if(props.currentStep !== 3){
        return null;
    }
    return(
        <form id="form" className="container col-12 col-md-8" onChange={props.handleChange}>
            <h6 className="mt-3 border-bottom border-primary">Ambienti presenti</h6>

                <div className="form-row-group text-center offset-5 offset-sm-3">
                    <div className="form-check-inline col-12 col-sm-5" >
                        <input type="checkbox" className="mr-1" name="salotto" id="salotto" value="true" defaultChecked={props.dati.salotto==="on"}/>
                        <label className="form-check-label text-center" htmlFor="salotto">Salotto</label>
                    </div>
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="terrazza" id="terrazza" value="true" defaultChecked={props.dati.terrazza==="on"}/>
                        <label className="form-check-label" htmlFor="terrazza">Terrazza</label>
                    </div>
                </div>
                <div className="form-row-group text-center offset-5 offset-sm-3">
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="giardino" id="giardino" value="true" defaultChecked={props.dati.giardino==="on"}/>
                        <label className="form-check-label" htmlFor="giardino">Giardino</label>
                    </div>
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="piscina" id="piscina" value="true" defaultChecked={props.dati.piscina==="on"}/>
                        <label className="form-check-label" htmlFor="piscina">Piscina</label>
                    </div>
                </div>
            <h6 className="mt-3 border-bottom border-primary">Camere presenti</h6>

                <div className="form-group">
                    <label htmlFor="nCamere">Numero di camere da letto</label>
                    <input name="nCamere" id="nCamere" type="number" className="form-control" min="1" max="10" size="2" maxLength="2"  defaultValue={props.dati.nCamere} required />
                    <small  className="invalid-feedback text-danger collapse messaggio">1 - 10</small>
                </div>
                <div className="form-group">
                    <label htmlFor="nLettiMatrimoniali">Numero letti matrimoniali</label>
                    <input name="nLettiMatrimoniali" id="nLettiMatrimoniali" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" defaultValue={props.dati.nLettiMatrimoniali} required/>
                    <div className="invalid-feedback">1 - 10</div>
                </div>
                <div className="form-group">
                    <label htmlFor="nLettiSingoli">Numero letti singoli </label>
                    <input name="nLettiSingoli" id="nLettiSingoli" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" defaultValue={props.dati.nLettiSingoli} required/>
                    <div className="invalid-feedback">1 - 10</div>
                </div>

                <h6 className="mt-3 border-bottom border-primary">Informazioni generali</h6>

                <div className="form-group">
                    <label htmlFor="nBagni">Numero bagni</label>
                    <input id="nBagni" type="number" name="nBagni" className="form-control" min={1} max={10}  size="2" maxLength="2" required defaultValue={props.dati.nBagni} onChange={props.handleChange}/>
                    <span className="invalid-feedback small text-danger">1 - 10</span>
                </div>
                <div className="input-group">
                    <label htmlFor="prezzo">Prezzo struttura (a notte)</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">€</span>
                        </div>
                        <input name="prezzo" type="number" id="prezzo" className="form-control currency" min="1" step="0.01" max="10000" defaultValue={props.dati.prezzo} required onChange={props.handleChange}/>
                        <span className="invalid-feedback small text-danger">1 - 10000</span>
                    </div>
                </div>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3  btn-lg w-200px" onClick={vaiAvanti}>Continua</button>
                <button id="indietro" className="btn btn-secondary mt-3 btn-lg w-200px" onClick={vaiIndietro}>Indietro</button>
            </div>
        </form>



    )
}

export default FormAmbienti;

