import React, {useState} from 'react';
import FormTipologiaStruttura from "./FormTipologiaStruttura";
import FormCamere from "./FormCamere";
import InserimentoCaratteristicheB from "./InserimentoCaratteristicheB";
import FormAmbienti from "./FormAmbienti";
import InserimentoCaratteristicheC from "./InserimentoCaratteristicheC";
import InserimentoCondizioni from "./InserimentoCondizioni";
import FormFotografie from "./FormFotografie";
import FormStruttura from "./FormStruttura";
import SchermataRiepilogoRegistrazione from "./SchermataRiepilogoRegistrazione";
import axios from 'axios';


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
        printObject(tmp);
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
        printObject(tmp);
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
        printObject(tmp);
    }

    function correzione (nome, valore){
        console.log("aggiorno "+nome+ " a "+valore);
        let tmp = info;
        tmp[nome]=valore;
        setInfo(tmp);
    }

    const handleSubmit=()=>{
        try {
           let dati = info;
           console.log("DATI======= ");
           console.log(dati);
           axios.post('/struttura', dati)
               .then(res => { // then print response status
                   console.log(res.data);
                   console.log("hai finito");
                   //TODO PRENDO REF GESTORE DA SESSION STORAGE
                   let tmp = {idStruttura:res.data.refStruttura, nomeStruttura:info.nomeStruttura, tipologiaStruttura:info.tipologiaStruttura, refGestore:3, refIndirizzo:res.data.refIndirizzo, rendicontoEffettuato:  new Date().toISOString().slice(0,9)}
                   let lista = (JSON.parse(window.sessionStorage.getItem("strutture")) || []);
                   lista.push(tmp);
                   window.sessionStorage.setItem("strutture", JSON.stringify(lista));

               });
       } catch (e) {
            console.log(e);
       }
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
                <div className="progress-bar" style={{width: (Math.round(step * 100 / 6)) + '%'}}>{Math.min(Math.round(step * 100 / 6), 100)}%</div>
            </div>

            <FormTipologiaStruttura currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
            <FormStruttura currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>

            {
                (info.tipologiaStruttura==="cv")?
                    <FormAmbienti currentStep={step} handleChange={handleChange} handleCamere={handleCamere} dati={info} go={_next} goBack={_prev}/>
                    :
                    <FormCamere currentStep={step} handleChange={handleChange} handleCamere={handleCamere} dati={info} go={_next} goBack={_prev}/>
            }

            {
                (info.tipologiaStruttura==="cv")?
                    <InserimentoCaratteristicheC currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
                    :
                    <InserimentoCaratteristicheB currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
            }
            <InserimentoCondizioni currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev} correzione={correzione} />
            <FormFotografie currentStep={step} handleFoto={handleFoto} dati={info} go={_next} goBack={_prev} />
            <SchermataRiepilogoRegistrazione currentStep={step} struttura={info} handleSubmit={handleSubmit}  goBack={_prev}/>
    </div>
    )
}

export default RegistrazioneStruttura;