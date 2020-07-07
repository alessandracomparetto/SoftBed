import React, {useState, useEffect} from 'react';
import FormSceltaTipologiaStruttura from "./FormSceltaTipologiaStruttura";
import FormCamere from "./FormCamere";
import InserimentoCaratteristicheB from "./InserimentoCaratteristicheB";
import FormAmbienti from "./FormAmbienti";
import InserimentoCaratteristicheC from "./InserimentoCaratteristicheC";
import InserimentoCondizioni from "./InserimentoCondizioni";
import FormFotografie from "./FormFotografie";
import FormRegistrazionePreliminare from "./FormRegistrazionePreliminare";
import SchermataRiepilogoRegistrazione from "./SchermataRiepilogoRegistrazione";
import OperazioneCompletataRegistrazioneStruttura from "./OperazioneCompletataRegistrazioneStruttura";
import axios from 'axios';
import mostraDialogErrore from "../../../Actions/errore";

function RegistrazioneStruttura () {
    const [step, setStep]= useState(1);
    const [info, setInfo]= useState({});

    useEffect(()=>{
       let utente = window.sessionStorage.getItem("utente");
       if(!utente || utente.length==0) {
           window.location.href = "/accedi"
       }
    },[]);

    function handleChange(event){
        const{name,value}=event.target;
        let tmp=info;
        if(event.target.type === "checkbox"){
            if(event.target.checked === true){
                tmp[name]=1;
            }
            if(event.target.checked ===false){
                tmp[name]=0;
            }
        }else{
            tmp[name]=value;
        }
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

    function correzione (nome, valore){
        let tmp = info;
        tmp[nome]=valore;
        setInfo(tmp);
    }

    const handleSubmit=()=>{
        try {
           let dati = info;
           let idUtente = JSON.parse(window.sessionStorage.getItem("utente")).idUtente;
           dati["idUtente"]=idUtente;
           axios.post('/struttura', dati)
               .then(res => { // then print response status
                   console.log("hai finito");
                    let ok = res.data;
                   window.sessionStorage.setItem("strutture", JSON.stringify(ok));
                    _next()

               }).catch(()=>{mostraDialogErrore()});
       } catch (e) {
            console.log(e)
            mostraDialogErrore();
       }
    };

    function _next(){
        let currentStep=step+1;
        setStep(currentStep);
    }

    function _prev(){
        let currentStep;
        if(step===7 && (info.pagamentoOnline==0 || info.pagamentoOnline==undefined)){
            currentStep=step-2;
        }
        else{
            currentStep=step-1;
        }
        setStep(currentStep);
    }

    return(
        <div className="container col-sm-8 py-3">
            <div className="progress">
                <div className="progress-bar" style={{width: (Math.round(step * 100 / 7)) + '%'}}>{Math.min(Math.round(step * 100 / 7), 100)}%</div>
            </div>

            <FormSceltaTipologiaStruttura currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>
            <FormRegistrazionePreliminare currentStep={step} handleChange={handleChange} dati={info} go={_next} goBack={_prev}/>

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
            <SchermataPagamentoStruttura currentStep={step} dati={info} go={_next} e goBack={_prev} handleChange={handleChange} />
            <FormFotografie currentStep={step} handleFoto={handleFoto} dati={info} go={_next} goBack={_prev} />
            <SchermataRiepilogoRegistrazione currentStep={step} struttura={info} handleSubmit={handleSubmit}  goBack={_prev}/>
            <OperazioneCompletataRegistrazioneStruttura currentStep={step}/>
    </div>
    )
}

export default RegistrazioneStruttura;