import React, { Fragment, useState } from 'react'
import axios from 'axios';

function CaricamentoFoto(){
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Scegli l\'immagine');
    //al backend mando un oggetto con file name e file path
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = (event) =>{
        //per singolo file upload
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    }

    const onSubmit = async event =>{
        event.preventDefault();
        //per mandare il file:
       let formData = new FormData();
        formData.append('file', file);
        //uso axios per la richiesta

        axios.post('/upload', { formData})
            .then(res => {
                console.log("res frontend =>"+res);
                // console.log(res.data);
               /* const { fileName, filePath } = res.data;
                setUploadedFile({fileName, filePath});*/
                }).catch(err => console.log("STAMPA DI ERR\n"+err))
            //prendo dalla risposta quello che mi serve

        /*}catch (err) {
            console.log(err)
            /!*if(err.response.status && err.response.status === 500){
                console.log("Errore del server")
            }else{
                //intercetto il messaggio che arriva da backend
                console.log(err.response.data.msg);
            }*!/
        }*/
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input name="file" type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <input type="submit" value="caricamento" className="btn btn-primary btn-block mt-4"/>
            </form>
            { uploadedFile && (
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center"> {uploadedFile.fileName}</h3>
                        <img style={{ width:'100%'}} src={uploadedFile.filePath} alt=""/>
                    </div>
                </div>)}
        </Fragment>
    );
}
export default CaricamentoFoto;