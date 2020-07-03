import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios';
import $ from 'jquery';

function FormDocumenti(props){
    const [file, setFile] = useState([]); //lista file prima di essere caricati
    const [numero, setNumero] = useState(0); //numero totale dei file caricati
    const [filename, setFilename] = useState([]); //lista dei nomi dei file
    let fileList = {}; //copia dei file

    useEffect(() => {
        setFilename([]);
        setNumero(0);
        setFile([]);
    }, [props.flag]);

    //controlla che tuti i file siano immagini
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
        $("#vuoto").addClass("collapse");
        $("#formato").addClass("collapse");
        fileList = event.target.files;
        if(checkMimeType(fileList)){
            setFile([]);
            return
        }
        setFile(fileList);
        setNumero(numero + fileList.length);
    }
    const onSubmit = async e => {
        e.preventDefault();

        if (file.length == 0){
            $("#vuoto").removeClass("collapse");
            $("#formato").addClass("collapse");
            return;
        }
        const data = new FormData()
        for(var i = 0; i<file.length; i++) {
            data.append('file', file[i]);
        }
        axios.post("/upload/documenti", data)
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

    };

    return (

        <div className="col-10 mx-auto mt-5">
            <h6 className="border-bottom border-warning">Documenti degli ospiti</h6>
            <p>Inserisci qui i documenti degli ospiti in formato jpeg, jpg, o png</p>
            <form encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="custom-file mt-3 ">
                    <input name="file" type="file" className="custom-file-input" id="customFile" lang="it"multiple onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{numero} file selezionati</label>
                </div>
                <input id="carica" type="submit" value="Carica" className="btn btn-outline-warning btn-block mt-4" accept="image/png"/>
                <span id="vuoto" className="collapse small text-danger">Non hai selezionato nessun file o stai cercando di caricare file già inseriti</span>
                <span id="formato" className="collapse small text-danger">Puoi caricare solo jpeg, jpg o png.</span>
            </form>
            { filename &&(
                <div className="row mt-5">
                    {filename.map((f, indice) => {
                        return (
                            <div key={indice} className=" col-12 col-sm-6 col-md-4 col-lg-3">
                                <p className="text-center"> {f.name}</p>
                                <img style={{ width:'100%'}} src={`/uploads/documenti/`+f.name} alt=""/>
                            </div>
                        )
                    })}
                </div>)
            }
        </div>

    );
}
export default FormDocumenti;
