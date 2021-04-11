import React from 'react';


function FormAmbienti(props) {

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
        <form id="form" className="p-3 needs-validation" onChange={props.handleChange}>
            <h6 className="mt-3 border-bottom border-primary">Ambienti presenti</h6>

                <div className="form-row-group text-center offset-5 offset-sm-3">
                    <div className="form-check-inline col-12 col-sm-5" >
                        <input type="checkbox" className="mr-1" name="salotto" id="salotto" value={1} defaultChecked={props.dati.salotto==="1"}/>
                        <label className="form-check-label text-center" htmlFor="salotto">Salotto</label>
                    </div>
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="terrazza" id="terrazza" value={1} defaultChecked={props.dati.terrazza==="1"}/>
                        <label className="form-check-label" htmlFor="terrazza">Terrazza</label>
                    </div>
                </div>
                <div className="form-row-group text-center offset-5 offset-sm-3">
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="giardino" id="giardino" value={1} defaultChecked={props.dati.giardino==="1"}/>
                        <label className="form-check-label" htmlFor="giardino">Giardino</label>
                    </div>
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="piscina" id="piscina" value={1} defaultChecked={props.dati.piscina==="1"}/>
                        <label className="form-check-label" htmlFor="piscina">Piscina</label>
                    </div>
                </div>
            <h6 className="mt-3 border-bottom border-primary">Camere presenti</h6>

                <div className="form-group">
                    <label htmlFor="ncamere">Numero di camere da letto</label>
                    <input name="ncamere" id="ncamere" type="number" className="form-control" min="1" max="10" size="2" maxLength="2"  defaultValue={props.dati.ncamere} required />
                    <small  className="invalid-feedback text-danger collapse messaggio">1 - 10</small>
                </div>
                <div className="form-group">
                    <label htmlFor="nlettimatrimoniali">Numero letti matrimoniali</label>
                    <input name="nlettimatrimoniali" id="nlettimatrimoniali" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" defaultValue={props.dati.nlettimatrimoniali} required/>
                    <div className="invalid-feedback">0 - 10</div>
                </div>
                <div className="form-group">
                    <label htmlFor="nlettisingoli">Numero letti singoli </label>
                    <input name="nlettisingoli" id="nlettisingoli" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" defaultValue={props.dati.nlettisingoli} required/>
                    <div className="invalid-feedback">0 - 10</div>
                </div>

                <h6 className="mt-3 border-bottom border-primary">Informazioni generali</h6>

                <div className="form-group">
                    <label htmlFor="nbagni">Numero bagni</label>
                    <input id="nbagni" type="number" name="nbagni" className="form-control" min={1} max={10}  size="2" maxLength="2" required defaultValue={props.dati.nbagni} onChange={props.handleChange}/>
                    <span className="invalid-feedback small text-danger">1 - 10</span>
                </div>
                <div className="input-group">
                    <label htmlFor="prezzonotte">Prezzo struttura (a notte)</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">€</span>
                        </div>
                        <input name="prezzonotte" type="number" id="prezzonotte" className="form-control currency" min="1" step="0.01" max="10000" defaultValue={props.dati.prezzonotte} required onChange={props.handleChange}/>
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

