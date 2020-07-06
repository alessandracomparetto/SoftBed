import React, {useEffect, useState} from "react";
import jsPDF from 'jspdf';
import axios from 'axios';

let doc = new jsPDF();



function RiepilogoRendiconto(props) {
    const handleInvia = (e) => {
        e.preventDefault();
        let data ={
            email:"softengineers44@gmail.com",
            allegato:doc.output('datauristring')
        }

        try{
            axios.post("/mail", data)
                .then(res => console.log(res.status));
        }
        catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    const handleScarica = (e) => {
        /*   e.preventDefault();
           doc.save("documentoQuestura.pdf");*/
        console.log(props.ospiti);
    }

    return(  <div className="container mh-100 p-3 w-80" style={{height: 500 + 'px'}}  >
                <div className="row">
                    <button name="ok" id="ok" type="button" className=" col-12 col-md-5 btn btn-warning mt-3 float-left " style={{width: 250 + 'px'}} onClick={handleScarica}>Visualizza dichiarazione</button>
                </div>

                <div className="row">
                    <button name="ok" id="ok" type="button" className=" col-12 col-md-5 btn btn-success mt-3 float-right" style={{width: 250 + 'px'}} onClick={handleInvia}>Invia dichiarazione</button>
                </div>
            </div>
        )
}

export default RiepilogoRendiconto;