import React from "react";

function FormTipologiaStruttura(props) {

    function vaiAvanti(event){
        event.preventDefault();
        document.getElementById("form").classList.add("was-validated");
        if(document.getElementById("cv").checked || document.getElementById("B&B").checked) {
            document.getElementById("feedback").classList.add("collapse");
            if (document.getElementById("form").checkValidity()) {
                props.go();
            }
        }

        else {
            event.preventDefault();
            document.getElementById("feedback").classList.remove("collapse");
        }
    }
        /*if(document.getElementById("cv").checked || document.getElementById("B&B").checked){
            document.getElementById("feedback").classList.add("collapse"); */
           /* let tip;
            if(document.getElementById("cv").checked === true){
                tip = {tipologia : document.getElementById("cv").value}
            }else{
               tip = {tipologia : document.getElementById("B&B").value}
            }
            try{
                axios.post("/struttura/tipologia", tip)
                    .then( res => console.log(res.status))
            } catch (err) {
                if (err.response.status === 400) {
                    console.log('There was a problem with the server');
                } else {
                    console.log(err.response.data.msg);
                }
            } */
        /*}
        else{
            document.getElementById("feedback").classList.remove("collapse");
        } */

    if(props.currentStep !== 1){
        return null;
    }
    else return(
        <form id="form" className="container needs-validation p-3" onChange={props.handleChange} noValidate>
            <h6 className="mt-3 border-bottom border-primary">Scegli la tipologia di struttura</h6>
            <div className=" container d-flex justify-content-around">
                <i className="fa fa-bed  fa-8x " aria-hidden="true"/>
                <i className="fa fa-home fa-8x" aria-hidden="true"/>
            </div>
            <div className="form-row ">
                <div className="col-6 text-center">
                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input type="radio" className="custom-control-input pr-3" id="B&B" name="tipologiaStruttura" value="B&B" defaultChecked={props.dati.tipologia === "B&B"} required/>
                        <label className="custom-control-label" htmlFor="B&B">B&B</label>
                    </div>
                </div>
                <div className="col-6 text-center">
                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input type="radio" className="custom-control-input" id="cv" name="tipologiaStruttura" value="cv" defaultChecked={props.dati.tipologia === "cv"} required/>
                        <label className="custom-control-label" htmlFor="cv">Casa vacanze</label>
                    </div>
                </div>
                <div id="feedback" className="col-12 text-danger text-center collapse">
                    Inserire la tipologia di struttura
                </div>
            </div>
            <div className="d-flex flex-row-reverse justify-content-around">
                <button id="ok" type="submit" className="btn btn-primary mt-3 w-200px" onClick={vaiAvanti}>Continua</button>
                <button id="indietro" className="btn btn-secondary mt-3 w-200px disabled">Indietro</button>
            </div>
    </form>
    )
}

export default FormTipologiaStruttura;
