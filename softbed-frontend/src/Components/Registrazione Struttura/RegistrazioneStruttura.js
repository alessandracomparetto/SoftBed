import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FormTipologiaStruttura from "./FormTipologiaStruttura";
import FormCamere from "./FormCamere";
import FormCaratteristicheB from "./FormCaratteristicheB";
import FormAmbienti from "./FormAmbienti";
import FormCaratteristicheC from "./FormCaratteristicheC";
import FormCondizioni from "./FormCondizioni";
import FormFotografie from "./FormFotografie";

function RegistrazioneStruttura () {

    return(
        <Router>
            <Switch>
                <Route exact path="/registrazioneStruttura">
                    {console.log("ciao")}
                    <FormTipologiaStruttura/>
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