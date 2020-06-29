import React from "react";

function FormCaratteristicheB(props){
    function printObject(o) {
        let out = '';
        for (let p in o) {
            out += p + ': ' + o[p] + '\n';
        } console.log("Datix2  "+out);
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
    return(
        <div>
            <h6 className="mt-3 border-bottom border-primary">Servizi disponibili</h6>
            {console.log(props.dati.wifi=="1")}
            <div className="form-row-group text-center offset-1">
                <div className="form-check-inline col-12  col-sm-5  col-lg-3">
                    <input type="checkbox" className="form-check-input " id="wifi" value={1} name="wifi" defaultChecked={props.dati.wifi}/>
                    <label className="form-check-label" htmlFor="wifi">Connessione Wi-fi</label>
                </div>
                <div className="form-check-inline col-12  col-sm-5 col-lg-3">
                    <input type="checkbox" className="form-check-input" id="riscaldamento" name="riscaldamento" value={1} defaultChecked={props.dati.riscaldamento}/>
                    <label className="form-check-label" htmlFor="riscaldamento">Riscaldamento</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                    <input type="checkbox" className="form-check-input" id="cucinaCeliaci" name="cucinaCeliaci" value={1} defaultChecked={props.dati.cucinaCeliaci}/>
                    <label className="form-check-label" htmlFor="cucinaCeliaci">Cucina per celiaci</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5 col-lg-3 text-left">
                    <input type="checkbox" className="form-check-input" id="strutturaDisabili" name="strutturaDisabili" value={1} defaultChecked={props.dati.strutturaDisabili}/>
                    <label className="form-check-label" htmlFor="strutturaDisabili" style={{minWidth : 200+'px'}}>Strutture per disabili</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                    <input type="checkbox" className="form-check-input" id="ariaCondizionata" name="ariaCondizionata" value={1} defaultChecked={props.dati.ariaCondizionata}/>
                    <label className="form-check-label" htmlFor="ariaCondizionata">Aria condizionata</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                    <input type="checkbox" className="form-check-input" id="TV" name="TV" value={1} defaultChecked={props.dati.TV}/>
                    <label className="form-check-label" htmlFor="TV">TV</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                    <input type="checkbox" className="form-check-input" id="parcheggio" name="parcheggio" value={1} defaultChecked={props.dati.parcheggio}/>
                    <label className="form-check-label" htmlFor="parcheggio">Parcheggio</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5 col-lg-3 p-0">
                    <input type="checkbox" className="form-check-input" id="servizioInCamera" name="servizioInCamera" value={1} defaultChecked={props.dati.servizioInCamera}/>
                    <label className="form-check-label " htmlFor="servizioInCamera">Servizio in camera</label>
                </div>
                <div className="form-check-inline col-12 col-sm-5 col-lg-3">
                    <input type="checkbox" className="form-check-input" id="navettaAeroportuale" name="navettaAeroportuale" value={1} defaultChecked={props.dati.navettaAeroportuale}/>
                    <label className="form-check-label " htmlFor="navettaAeroportuale" style={{minWidth : 155 + 'px'}}>Navetta aeroportuale</label>
                </div>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Sugli ospiti</h6>
            <div className="form-group text-center offset-1">
                <div className="form-check-inline  col-12 col-sm-5 col-lg-3 ">
                    <input type="checkbox" className="form-check-input" id="animaliAmmessi" name="animaliAmmessi" value={1} defaultChecked={props.dati.animaliAmmessi}/>
                    <label className="form-check-label" htmlFor="animaliAmmessi">Animali ammessi</label>
                </div>
                <div className="form-check-inline  col-12 col-sm-5 col-lg-3 text-left">
                    <input type="checkbox" className="form-check-input" id="permessoFumare" name="permessoFumare" value={1} defaultChecked={props.dati.permessoFumare}/>
                    <label className="form-check-label" htmlFor="permessoFumare" style={{minWidth : 200+'px'}}>Permesso di fumare</label>
                </div>
                <div className="form-check-inline col-12 col-sm-7 col-lg-3 text-left p-0">
                    <input type="checkbox" className="form-check-input" id="bambini" name="bambini" value={1} defaultChecked={props.dati.bambini}/>
                    <label className="form-check-label" htmlFor="bambini" style={{minWidth : 300+'px'}}>Idoneità ad ospitare bambini </label>
                </div>
            </div>
            <h6 className="mt-3 border-bottom border-primary">Descrizione</h6>
            <div className="md-form amber-textarea active-amber-textarea">
                <textarea id="descrizione" name="descrizione" className="md-textarea form-control" rows="5"  maxLength={500} placeholder="Write something here..." onChange={verificaLunghezza} defaultValue={props.dati.descrizione}/>
                <p id="feedback" className="text-danger form-text text-muted collapse" >Hai raggiunto il massimo di 500 caratteri</p>
            </div>
        </div>
    )
}
export default FormCaratteristicheB;