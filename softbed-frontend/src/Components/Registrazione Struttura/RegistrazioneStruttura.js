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


function RegistrazioneStruttura () {
    /* const [tipologia, setTipologia] = useState("");
    const [URL, setURL] = useState(""); */
    const [step, setStep]= useState(1);
    const [info, setInfo]= useState({});

    function printObject(o) {
        var out = '';
        for (var p in o) {
            out += p + ': ' + o[p] + '\n';
        } console.log(out);
    }

    function handleChange(event){
        const{name,value}=event.target
        let tmp=info;
        tmp[name]=value;
        setInfo(tmp);
        console.log("tmp"+tmp.toString())
        printObject(tmp);
    }

    function handleCamere(contatore, camera) {
        let tmp = info;
        let stringa = "camera"+contatore;
        tmp[stringa]=camera;
        setInfo(tmp);
        console.log("Stampo lo stato ");
        console.log("tmp"+tmp.toString());
        console.log("stampo la camera: ")
        printObject(camera);
    }


    const handleSubmit=(event)=>{
        event.preventDefault();
        /*.axios.*/
        console.log("hai finito");
    }
    function _next(){
        let currentStep=step+1;
        setStep(currentStep);
    }
    function _prev(){
        let currentStep=step-1;
        setStep(currentStep);
    }
    {/*function previousButton(){
        let currentStep=step;
        {/*if(currentStep!=1){
            return(
                <button className="btn btn-secondary" type="button" onClick={_prev}>Indietro</button>
            )
        }
        return null; */}
    {/*function nextButton(){
        let currentStep=step;
        console.log(currentStep);
        if(currentStep<5){
            return(
                <button className="btn btn-primary" type="button" onClick={_next}>Continua</button>
            )
        }
        return null;
    } */}
    return(
        <React.Fragment>
            <div>
                <FormTipologiaStruttura currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
                <FormStruttura currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
                {console.log("tipologia "+info.tipologia)}
                {
                    (info.tipologia==="cv")?
                        <FormAmbienti currentStep={step} handleChange={handleChange} handleCamere={handleCamere} dati={info} go={_next} goBack={_prev}/>
                        :
                        <FormCamere currentStep={step} handleChange={handleChange} handleCamere={handleCamere} dati={info} go={_next} goBack={_prev}/>
                }
                {
                    (info.tipologia==="cv")?
                        <FormCaratteristicheC currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
                        :
                        <FormCaratteristicheB currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
                }
                <FormCondizioni currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
            </div>
        </React.Fragment>

        /*

            <Route path="*!/fotografie">
                <FormFotografie/>
            </Route><Route path="*!/condizioni">
                <FormCondizioni/>
            </Route>
            <Route path="*!/caratteristicheB">
                <FormCaratteristicheB/>
            </Route>
            <Route path="*!/caratteristicheC">
                <FormCaratteristicheC/>
            </Route>
            <Route path="*!/camere">
                <FormCamere/>
            </Route>
            <Route path="*!/ambienti">
                <FormAmbienti/>
            </Route>*/
    )
}

export default RegistrazioneStruttura;