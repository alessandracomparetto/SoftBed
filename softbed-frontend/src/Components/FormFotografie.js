import React, {Fragment, useEffect, useState} from 'react'
import ButtonForm from "./ButtonForm";
import axios from 'axios';
import $ from 'jquery';

function FormFotografie(){
    const [file, setFile] = useState([]);
    const [numero, setNumero] = useState(0);
    const [filename, setFilename] = useState([]);
    let fileList = {};

    const maxSelectFile  = (fileList) => {
        let files = fileList;
        if (files.length + numero > 6){
            $("#troppi").removeClass("collapse");
            return true;
        }
        return false;
    }
    const checkMimeType=(fileList)=>{
        let files = fileList;
        const types = ['image/png', 'image/jpeg', 'image/jpg']
        for(var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                $("#formato").removeClass("collapse");
                return true;
            }
            return false
        }
    }

    const onChange = (event) =>{
        $("#troppi").addClass("collapse");
        $("#completo").addClass("collapse");
        $("#vuoto").addClass("collapse");
        $("#formato").addClass("collapse");

        fileList = event.target.files;

        if(maxSelectFile(fileList) || checkMimeType(fileList)){
            setFile([]);
            return
        }
        setFile(fileList);
        setNumero(numero + fileList.length);
    }

    const onSubmit = async e => {
        e.preventDefault();
        if(numero >= 6){
            $("#carica").prop('disabled', true);
            $("#completo").removeClass("collapse");

        }
        if (file.length == 0){
            $("#vuoto").removeClass("collapse");
            $("#troppi").addClass("collapse");
            $("#formato").addClass("collapse");
            return;
        }
        const data = new FormData()
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
            })

    };

    return (
        <div className="col-10 mx-auto">
            <h6 className="mt-3 border-bottom border-primary">Foto della struttura</h6>
            <p>Inserisci qui le immagini della tua struttura, per un massimo di 6</p>
            <form encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="custom-file mt-3 ">
                    <input name="file" type="file" className="custom-file-input" id="customFile" lang="it"multiple onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{numero} file selezionati</label>
                </div>
                <input id="carica" type="submit" value="Carica" className="btn btn-outline-primary btn-block mt-4" accept="image/png"/>
                <span id="vuoto" className="collapse small text-danger">Non hai selezionato nessun file o stai cercando di caricare file già inseriti</span>
                <span id="troppi" className="collapse small text-danger">Hai selezionato troppi file. Massimo 6.</span>
                <span id="completo" className="collapse small text-muted">Hai raggiunto il limite di file caricati.</span>
                <span id="formato" className="collapse small text-danger">Puoi caricare solo jpeg o png.</span>
            </form>
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
        <ButtonForm/>
        </div>
    );
}
export default FormFotografie;
