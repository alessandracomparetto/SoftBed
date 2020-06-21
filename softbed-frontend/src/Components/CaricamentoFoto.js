import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios';

function CaricamentoFoto(){
    const [file, setFile] = useState([]);
    const [numero, setNumero] = useState(0);
    const [filename, setFilename] = useState([]);
    let fileList = {};


    const onChange = (event) =>{
        fileList = event.target.files;
        setFile(fileList);
        setNumero(numero + fileList.length);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData()
        for(var i = 0; i<file.length; i++) {
            data.append('file', file[i]);
        }

        axios.post("/upload", data)
            .then(res => { // then print response status
                var nomi = filename;
                var dimensione = filename.length;
                for(let i = 0; i<file.length; i++){
                    nomi.push({index: dimensione+i, name: file[i].name});
                }
                setFile([]);
                setFilename(nomi);
                console.log(nomi);
                console.log(res.statusText)
            })

    };

    return (
        <div className="col-10 mx-auto">
            <form encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input name="file" type="file" className="custom-file-input" id="customFile" multiple onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{numero} file caricati</label>
                </div>
                <input type="submit" value="caricamento" className="btn btn-primary btn-block mt-4" accept="image/png"/>
            </form>
            { filename &&(
                <div className="row mt-5">
                    {filename.map((f, indice) => {
                        console.log(f);
                        return (
                            <div key={indice} className=" col-12 col-sm-6 col-md-4 col-lg-3">
                                <p className="text-center"> {f.name}</p>
                                <img style={{ width:'100%'}} src={`/uploads/`+f.name} alt=""/>
                            </div>
                        )
                    })}
                </div>)
            }


        </div>
    );
}
export default CaricamentoFoto;