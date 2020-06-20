import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios';

function CaricamentoFoto(){
    const [file, setFile] = useState([]);
    const [numero, setNumero] = useState(0);
    const [filename, setFilename] = useState([]);
    let fileList = {};

    useEffect(() => {
      console.log(filename);
    }, [filename]);
    //quando viene modificato filename lo stampa


    const onChange = (event) =>{
        fileList = event.target.files;
        setFile(fileList);
        setNumero(fileList.length);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData()
        for(var i = 0; i<file.length; i++) {
            data.append('file', file[i])
        }

        axios.post("/upload", data)
            .then(res => { // then print response status
                var nomi = [];
                for(let i = 0; i<file.length; i++){
                    nomi.push({index: i, name: file[i].name});
                    console.log(file[i].name);
                }
                setFilename(nomi);
                console.log(res.statusText)
            })
    };

    return (
        <Fragment>
            <form encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input name="file" type="file" className="custom-file-input" id="customFile" multiple onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{numero} file caricati</label>
                </div>
                <input type="submit" value="caricamento" className="btn btn-primary btn-block mt-4" accept="image/png"/>
            </form>
            { filename&&(
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        {filename.map((f, indice) => {
                            console.log(f);
                            return (
                                <React.Fragment key={indice}>
                                    <h3 className="text-center"> {f.name}</h3>
                                    <img style={{ width:'100%'}} src={`/uploads/`+f.name} alt=""/>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>)
            }


        </Fragment>
    );
}
export default CaricamentoFoto;