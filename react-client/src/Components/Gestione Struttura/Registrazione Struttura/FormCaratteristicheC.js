import React from "react";

function FormCaratteristicheC(props){

    function verificaLunghezza(event){
        props.handleChange(event);
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
            <div onClick={props.handleChange}>
                <div className="form-row-group text-center offset-2">
                    <div className="form-check-inline col-12 col-md-5">
                        <input type="checkbox" className="form-check-input" id="Wifi" value={1} name="Wifi" defaultChecked={props.dati.wifi}/>
                        <label className="form-check-label" htmlFor="Wifi">Connessione Wi-fi</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5">
                        <input type="checkbox" className="form-check-input" id="riscaldamento" name="riscaldamento"
                               value={1} defaultChecked={props.dati.riscaldamento}/>
                        <label className="form-check-label" htmlFor="riscaldamento">Riscaldamento</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 ">
                        <input type="checkbox" className="form-check-input" id="strutturadisabili" name="strutturadisabili" value={1} defaultChecked={props.dati.strutturadisabili}/>
                        <label className="form-check-label" htmlFor="strutturadisabili">Strutture per disabili
                        </label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 ">
                        <input type="checkbox" className="form-check-input" id="ariacondizionata" name="ariacondizionata" value={1} defaultChecked={props.dati.ariacondizionata}/>
                        <label className="form-check-label" htmlFor="ariacondizionata">Aria condizionata</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 ">
                        <input type="checkbox" className="form-check-input" id="TV" name="TV" value={1} defaultChecked={props.dati.TV}/>
                        <label className="form-check-label" htmlFor="TV">TV</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 ">
                        <input type="checkbox" className="form-check-input" id="parcheggio" name="parcheggio"
                               value={1} defaultChecked={props.dati.parcheggio}/>
                        <label className="form-check-label" htmlFor="parcheggio">Parcheggio</label>
                    </div>
                </div>

                <h6 className="mt-3 border-bottom border-primary">Sugli ospiti</h6>
                <div className="form-row-group text-center offset-2">
                    <div className="form-check-inline col-12 col-md-5">
                        <input type="checkbox" className="form-check-input" id="animaliammessi" name="animaliammessi" value={1} defaultChecked={props.dati.animaliammessi}/>
                        <label className="form-check-label" htmlFor="animaliammessi">Animali ammessi</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 text-left p-0">
                        <input type="checkbox" className="form-check-input" id="festeammesse" name="festeammesse" value={1} defaultChecked={props.dati.festeammesse}/>
                        <label className="form-check-label" htmlFor="festeammesse" style={{minWidth : 290+'px'}}>Permesso per feste/eventi</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5">
                        <input type="checkbox" className="form-check-input" id="permessofumare" name="permessofumare" value={1} defaultChecked={props.dati.permessofumare}/>
                        <label className="form-check-label" htmlFor="permessofumare">Permesso di fumare</label>
                    </div>
                    <div className="form-check-inline col-12 col-md-5 p-0 text-left">
                        <input type="checkbox" className="form-check-input" id="bambini" name="bambini" value={1} defaultChecked={props.dati.bambini}/>
                        <label className="form-check-label " htmlFor="bambini" style={{minWidth : 290+'px'}}>Idoneità ad ospitare bambini</label>
                    </div>
                </div>
            </div>
            <h6 className="mt-3 border-bottom border-primary">Descrizione</h6>
            <div className="md-form amber-textarea active-amber-textarea">
                <textarea id="descrizione" name="descrizione" className="md-textarea form-control" rows="5"  maxLength={300} placeholder="Write something here..." onChange={verificaLunghezza} defaultValue={props.dati.descrizione}/>
                <p id="feedback" className="text-danger form-text text-muted collapse ">Hai raggiunto il massimo di 300 caratteri</p>
            </div>
        </div>
    )
}
export default FormCaratteristicheC;