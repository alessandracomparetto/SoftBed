import React, {useState} from 'react';
import FormTipologiaStruttura from "./FormTipologiaStruttura";
import FormCamere from "./FormCamere";
import FormCaratteristicheB from "./FormCaratteristicheB";
import FormAmbienti from "./FormAmbienti";
import FormCaratteristicheC from "./FormCaratteristicheC";
import FormCondizioni from "./FormCondizioni";
import FormFotografie from "./FormFotografie";
import FormStruttura from "./FormStruttura";
import SchermataRisultati from "../Schermata Risultati/SchermataRisultati";
import SchermataRiepilogoRegistrazione from "./SchermataRiepilogoRegistrazione";


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
        if(!tmp["camere"]){
            tmp["camere"] =[];
        }
        let temp = tmp["camere"];
        temp.push({stringa:camera});
        tmp["camere"]=temp;
        setInfo(tmp);
    }

    //TODO : COME SOPRA
    function handleFoto(indice, fileName) {
            let tmp = info;
            let stringa = "foto"+indice;
            tmp[stringa]=fileName;
            setInfo(tmp);
        }

    const handleSubmit=(event)=>{
        event.preventDefault();
        /*.axios.*/
        console.log("hai finito");
    };

    function _next(){
        let currentStep=step+1;
        setStep(currentStep);
    }

    function _prev(){
        let currentStep=step-1;
        setStep(currentStep);
    }

    return(
            <div className="container col-sm-8 py-3">
                <div className="progress">
                    <div className="progress-bar" style={{width: (Math.round(step * 100 / 6)) + '%'}}>{Math.round(step * 100 / 6)}%</div>
                </div>

                <FormTipologiaStruttura currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
                <FormStruttura currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>

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
                <FormFotografie currentStep={step} handleFoto={handleFoto} dati={info} go={_next} goBack={_prev} />
                {/*<SchermataRiepilogoRegistrazione currentStep={step} dati={info}/>*/}
        </div>
    )
}

export default RegistrazioneStruttura;