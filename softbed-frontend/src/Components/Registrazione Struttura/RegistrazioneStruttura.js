import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FormTipologiaStruttura from "./FormTipologiaStruttura";
import FormCamere from "./FormCamere";
import FormCaratteristicheB from "./FormCaratteristicheB";
import FormAmbienti from "./FormAmbienti";
import FormCaratteristicheC from "./FormCaratteristicheC";
import FormCondizioni from "./FormCondizioni";
import FormFotografie from "./FormFotografie";
import FormStruttura from "./FormStruttura";

let datiC =[];
let datiB =[];

function RegistrazioneStruttura () {
    const [tipologia, setTipologia] = useState("");
    const [URL, setURL] = useState("");



    const aggiornaTipologia = (tipologiaStruttura)=>{
        setTipologia(tipologiaStruttura);
    }
    useEffect( () =>{
        console.log(tipologia)
    })
    return(
        <Router>
            <Switch>
                <Route exact path="/registrazioneStruttura">
                    <FormTipologiaStruttura aggiornaTipologia={aggiornaTipologia}/>
                </Route>
                <Route path="*/informazioniGenerali">
                    <FormStruttura/>
                </Route>

                <Route path="*/fotografie">
                    <FormFotografie/>
                </Route><Route path="*/condizioni">
                    <FormCondizioni/>
                </Route>
                <Route path="*/caratteristicheB">
                    <FormCaratteristicheB/>
                </Route>
                <Route path="*/caratteristicheC">
                    <FormCaratteristicheC/>
                </Route>
                <Route path="*/camere">
                    <FormCamere/>
                </Route>
                <Route path="*/ambienti">
                    <FormAmbienti/>
                </Route>

            </Switch>
        </Router>
    )
}

export default RegistrazioneStruttura;