import React, {Fragment, useState} from 'react'
import axios from 'axios';
import $ from 'jquery';
import mostraDialogErrore from "../../Actions/errore";

function FormFotografie(props){
    const [file, setFile] = useState([]); //lista file prima di essere caricati
    const [numero, setNumero] = useState(0); //numero totale dei file caricati
    const [filename, setFilename] = useState([]); //lista dei nomi dei file
    let fileList = {}; //copia dei file

    //controlla che il numero di file inseriti sia minore di 5
    const maxSelectFile  = (fileList) => {
        let files = fileList;
        if (files.length + numero > 5){
            $("#troppi").removeClass("collapse");
            return true;
        }
        return false;
    };
    //controlla che tuti i file siano immagini
    const checkMimeType=(fileList)=>{
        let files = fileList;
        const types = ['image/png', 'image/jpeg', 'image/jpg'];

        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                $("#formato").removeClass("collapse");
                return true;
            }
        }
        return false;
    };
    //on change dell'input
    const browse = (event) =>{
        $("#troppi").addClass("collapse");
        $("#completo").addClass("collapse");
        $("#vuoto").addClass("collapse");
        $("#formato").addClass("collapse");

        //prendo la lista dei nuovi file caricati nell'input
        fileList = event.target.files;
        if(maxSelectFile(fileList) || checkMimeType(fileList)){
            //se non vengono rispettate le richieste scarto i file caricati
            setFile([]);
            return
        }
        setFile(fileList);
        setNumero(numero + fileList.length);
    };
    //on submit del form
    const carica = async e => {
        e.preventDefault();
        if(numero >= 5){
            $("#carica").prop('disabled', true);
            $("#completo").removeClass("collapse");
        }
        if (file.length === 0){
            $("#vuoto").removeClass("collapse");
            $("#troppi").addClass("collapse");
            $("#formato").addClass("collapse");
            return;
        }

        const data = new FormData();
        for(var i = 0; i<file.length; i++) {
            data.append('file', file[i]);
        }
        axios.post("/upload/foto", data)
            .then(res => { // then print response status
                var nomi = filename;
                var dimensione = filename.length;
                for(let i = 0; i<file.length; i++){
                    nomi.push({index: dimensione+i, name: file[i].name});
                }
                setFile([]);
                setFilename(nomi);
            }).then( res =>{
                for(let i = 0; i<numero; i++) {
                    let nomeFile = filename[i];
                    props.handleFoto(nomeFile.name);
            }})
            .catch(()=>mostraDialogErrore());
    };

    function vaiAvanti(event) {
        event.preventDefault();
        let copia = filename.length;
        if(numero===0 || copia === 0){
            $("#vuoto").removeClass("collapse");
        }
        else{
            props.go();
        }
    }

    function  vaiIndietro() {
        props.goBack();
    }

    if(props.currentStep !== 6){
        return null;
    }else return (
        <Fragment>
            <h6 className="mt-3 border-bottom border-primary">Foto della struttura</h6>
            <p>Inserisci qui le immagini della tua struttura, per un massimo di 5</p>
            <form encType="multipart/form-data" onSubmit={carica}>
                <div className="custom-file mt-3 ">
                    <input name="file" type="file" className="custom-file-input" id="customFile" lang="it" multiple onChange={browse}/>
                    <label className="custom-file-label" htmlFor="customFile">{numero} file selezionati</label>
                </div>
                <input id="carica" type="submit" value="Carica" className="btn btn-outline-primary btn-block mt-4" accept="image/png"/>
                <span id="vuoto" className="collapse small text-danger">Non hai selezionato nessun file o stai cercando di caricare file già inseriti</span>
                <span id="troppi" className="collapse small text-danger">Hai selezionato troppi file. Massimo 5.</span>
                <span id="completo" className="collapse small text-muted">Hai raggiunto il limite di file caricati.</span>
                <span id="formato" className="collapse small text-danger">Puoi caricare solo jpeg o png.</span>

            { filename &&(
                <div className="row mt-5">
                    {filename.map((f, indice) => {
                        return (
                            <div key={indice} className=" col-12 col-sm-6 col-md-4 col-lg-3">
                                <p className="text-center"> {f.name}</p>
                                <img style={{ width:'100%'}} src={`/uploads/foto/`+f.name} alt=""/>
                            </div>
                        )
                    })}
                </div>)
            }
                <div className="d-flex flex-row-reverse justify-content-around">
                    <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={vaiAvanti}>Continua</button>
                    <button id="indietro" className="btn btn-secondary mt-3 w-200px" onClick={vaiIndietro}>Indietro</button>
                </div>
            </form>
        </Fragment>
    )
}

export default FormFotografie;
