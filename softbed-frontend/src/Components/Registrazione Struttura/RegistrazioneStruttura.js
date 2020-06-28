import React, {useState} from 'react';
import FormTipologiaStruttura from "./FormTipologiaStruttura";
import FormCamere from "./FormCamere";
import FormCaratteristicheB from "./FormCaratteristicheB";
import FormAmbienti from "./FormAmbienti";
import FormCaratteristicheC from "./FormCaratteristicheC";
import FormCondizioni from "./FormCondizioni";
import FormFotografie from "./FormFotografie";
import FormStruttura from "./FormStruttura";
import SchermataRiepilogoRegistrazione from "./SchermataRiepilogoRegistrazione";


function RegistrazioneStruttura () {
    /* const [tipologia, setTipologia] = useState("");
    const [URL, setURL] = useState(""); */
    const [step, setStep]= useState(1);
    const [info, setInfo]= useState({});

    function printObject(o) {
        let out = '';
        for (let p in o) {
            out += p + ': ' + o[p] + '\n';
        } console.log(out);
    }

    function handleChange(event){
        const{name,value}=event.target;
        let tmp=info;
        tmp[name]=value;
        setInfo(tmp);
    }

    function handleCamere(camera) {
        let tmp = info;
        if(!tmp["camere"]){
            tmp["camere"] =[];
        }
        let temp = tmp["camere"];
        temp.push(camera);
        tmp["camere"]=temp;
        setInfo(tmp);
    }

    function handleFoto(fileName) {
        let tmp = info;
        if(!tmp["foto"]){
            tmp["foto"]=[];
        }
        let temp = tmp["foto"];
        temp.push(fileName);
        tmp["foto"]=temp;
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