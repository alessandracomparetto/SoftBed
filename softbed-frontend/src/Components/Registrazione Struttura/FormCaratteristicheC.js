import React from "react";

function FormCaratteristicheC(props){
    function vaiAvanti(event) {
        event.preventDefault();
        document.getElementById("form").classList.add("was-validated");
        if (document.getElementById("form").checkValidity()) {
            props.go();
        }
    }
    function  vaiIndietro() {
        props.goBack();
    }
    function verificaLunghezza(event){
        if(event.target.value.length>=200){
            document.getElementById("feedback").classList.remove("collapse");
            event.target.classList.add("border-warning");
        }
        else{
            document.getElementById("feedback").classList.add("collapse");
            event.target.classList.remove("border-warning");
        }
    }

    if(props.currentStep !== 4){
        return null;
    }

    return(
        <form id="form" className="w50  mt-3 needs-validation" onChange={props.handleChange} noValidate>
            <h6 className="mt-3 border-bottom border-primary">Servizi disponibili</h6>
            <div className="form-row-group text-center offset-2">
                <div className="form-check-inline col-12 col-md-5">
                    <input type="checkbox" className="form-check-input" id="connessione" value="true" name="connessione" defaultChecked={props.dati.connessione==="true"}/>
                    <label className="form-check-label" htmlFor="connessione">Connessione Wi-fi</label>
                </div>
                <div className="form-check-inline col-12 col-md-5">
                    <input type="checkbox" className="form-check-input" id="riscaldamento" name="riscaldamento"
                           value="true" defaultChecked={props.dati.riscaldamento==="true"}/>
                    <label className="form-check-label" htmlFor="riscaldamento">Riscaldamento</label>
                </div>
                <div className="form-check-inline col-12 col-md-5 ">
                    <input type="checkbox" className="form-check-input" id="disabili" name="disabili" value="true" defaultChecked={props.dati.disabili==="true"}/>
                    <label className="form-check-label" htmlFor="disabili">Strutture per disabili
                    </label>
                </div>
                <div className="form-check-inline col-12 col-md-5 ">
                    <input type="checkbox" className="form-check-input" id="aria" name="aria" value="true" defaultChecked={props.dati.aria==="true"}/>
                    <label className="form-check-label" htmlFor="aria">Aria condizionata</label>
                </div>
                <div className="form-check-inline col-12 col-md-5 ">
                    <input type="checkbox" className="form-check-input" id="tv" name="tv" value="true" defaultChecked={props.dati.tv==="true"}/>
                    <label className="form-check-label" htmlFor="tv">TV</label>
                </div>
                <div className="form-check-inline col-12 col-md-5 ">
                    <input type="checkbox" className="form-check-input" id="parcheggio" name="parcheggio"
                           value="true" defaultChecked={props.dati.parcheggio==="true"}/>
                    <label className="form-check-label" htmlFor="parcheggio">Parcheggio</label>
                </div>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Sugli ospiti</h6>
            <div className="form-row-group text-center offset-2">
                <div className="form-check-inline col-12 col-md-5 text-left p-0">
                    <input type="checkbox" className="form-check-input" id="feste" name="feste" value="true" defaultChecked={props.dati.feste==="true"}/>
                    <label className="form-check-label" htmlFor="feste" style={{minWidth : 290+'px'}}>Permesso per feste/eventi</label>
                </div>
                <div className="form-check-inline col-12 col-md-5">
                    <input type="checkbox" className="form-check-input" id="animali" name="animali" value="true" defaultChecked={props.dati.animali==="true"}/>
                    <label className="form-check-label" htmlFor="animali">Animali ammessi</label>
                </div>
                <div className="form-check-inline col-12 col-md-5">
                    <input type="checkbox" className="form-check-input" id="permessoFumo" name="permessoFumo" value="true" defaultChecked={props.dati.permessoFumo==="true"}/>
                    <label className="form-check-label" htmlFor="permessoFumo">Permesso di fumare</label>
                </div>
                <div className="form-check-inline col-12 col-md-5 p-0 text-left">
                    <input type="checkbox" className="form-check-input" id="bambini" name="bambini" value="true" defaultChecked={props.dati.bambini==="true"}/>
                    <label className="form-check-label " htmlFor="bambini" style={{minWidth : 290+'px'}}>Idoneità ad ospitare bambini</label>
                </div>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Descrizione</h6>
            <div className="md-form amber-textarea active-amber-textarea">
                <textarea id="descrizione" name="descrizione" className="md-textarea form-control" rows="5"  maxLength="500" placeholder="Write something here..." onChange={verificaLunghezza} defaultValue={props.dati.descrizione}/>
                <p id="feedback" className="text-danger form-text text-muted collapse ">Hai raggiunto il massimo di 500 caratteri</p>
            </div>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={vaiAvanti}>Continua</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={vaiIndietro}>Indietro</button>
            </div>
        </form>
    )
}

export default FormCaratteristicheC;