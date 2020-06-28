import React from "react";

function FormCaratteristicheC(props){
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
    return(
        <div>
            <h6 className="mt-3 border-bottom border-primary">Servizi disponibili</h6>
            <div className="form-row-group text-center offset-2">
                <div className="form-check-inline col-12 col-md-5">
                    <input type="checkbox" className="form-check-input" id="Wifi" value={1} name="Wifi" defaultChecked={props.dati.Wifi==="1"}/>
                    <label className="form-check-label" htmlFor="Wifi">Connessione Wi-fi</label>
                </div>
                <div className="form-check-inline col-12 col-md-5">
                    <input type="checkbox" className="form-check-input" id="riscaldamento" name="riscaldamento"
                           value={1} defaultChecked={props.dati.riscaldamento==="1"}/>
                    <label className="form-check-label" htmlFor="riscaldamento">Riscaldamento</label>
                </div>
                <div className="form-check-inline col-12 col-md-5 ">
                    <input type="checkbox" className="form-check-input" id="strutturaDisabili" name="strutturaDisabili" value={1} defaultChecked={props.dati.strutturaDisabili==="1"}/>
                    <label className="form-check-label" htmlFor="strutturaDisabili">Strutture per disabili
                    </label>
                </div>
                <div className="form-check-inline col-12 col-md-5 ">
                    <input type="checkbox" className="form-check-input" id="ariaCondizionata" name="ariaCondizionata" value={1} defaultChecked={props.dati.ariaCondizionata==="1"}/>
                    <label className="form-check-label" htmlFor="ariaCondizionata">Aria condizionata</label>
                </div>
                <div className="form-check-inline col-12 col-md-5 ">
                    <input type="checkbox" className="form-check-input" id="TV" name="TV" value={1} defaultChecked={props.dati.TV==="1"}/>
                    <label className="form-check-label" htmlFor="TV">TV</label>
                </div>
                <div className="form-check-inline col-12 col-md-5 ">
                    <input type="checkbox" className="form-check-input" id="parcheggio" name="parcheggio"
                           value={1} defaultChecked={props.dati.parcheggio==="1"}/>
                    <label className="form-check-label" htmlFor="parcheggio">Parcheggio</label>
                </div>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Sugli ospiti</h6>
            <div className="form-row-group text-center offset-2">
                <div className="form-check-inline col-12 col-md-5 text-left p-0">
                    <input type="checkbox" className="form-check-input" id="festeAmmesse" name="festeAmmesse" value={1} defaultChecked={props.dati.festeAmmesse==="1"}/>
                    <label className="form-check-label" htmlFor="festeAmmesse" style={{minWidth : 290+'px'}}>Permesso per feste/eventi</label>
                </div>
                <div className="form-check-inline col-12 col-md-5">
                    <input type="checkbox" className="form-check-input" id="animaliAmmessi" name="animaliAmmessi" value={1} defaultChecked={props.dati.animaliAmmessi==="1"}/>
                    <label className="form-check-label" htmlFor="animaliAmmessi">Animali ammessi</label>
                </div>
                <div className="form-check-inline col-12 col-md-5">
                    <input type="checkbox" className="form-check-input" id="permessoFumare" name="permessoFumare" value={1} defaultChecked={props.dati.permessoFumare==="1"}/>
                    <label className="form-check-label" htmlFor="permessoFumare">Permesso di fumare</label>
                </div>
                <div className="form-check-inline col-12 col-md-5 p-0 text-left">
                    <input type="checkbox" className="form-check-input" id="bambini" name="bambini" value={1} defaultChecked={props.dati.bambini==="1"}/>
                    <label className="form-check-label " htmlFor="bambini" style={{minWidth : 290+'px'}}>Idoneità ad ospitare bambini</label>
                </div>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Descrizione</h6>
            <div className="md-form amber-textarea active-amber-textarea">
                <textarea id="descrizione" name="descrizione" className="md-textarea form-control" rows="5"  maxLength="500" placeholder="Write something here..." onChange={verificaLunghezza} defaultValue={props.dati.descrizione}/>
                <p id="feedback" className="text-danger form-text text-muted collapse ">Hai raggiunto il massimo di 500 caratteri</p>
            </div>
        </div>
    )
}
export default FormCaratteristicheC;