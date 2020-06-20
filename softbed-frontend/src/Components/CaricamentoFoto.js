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

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
        } catch (err) {
            if (err.response.status === 500) {
               console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    };

    return (
        <Fragment>
            <form encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input name="file" type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <input type="submit" value="caricamento" className="btn btn-primary btn-block mt-4" accept="image/png"/>
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