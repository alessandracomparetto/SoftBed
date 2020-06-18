import React from "react";

function ButtonForm(){
    return(
    <div className="container-fluid p-0 mt-2 mb-5 d-flex justify-content-between">
        <button name="indietro" id="indietro" className="btn btn-secondary mt-3 float-left btn-lg w-200px ">Indietro</button>
        <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3  flaot-right btn-lg w-200px">Continua</button>
    </div>
    )
}
export default ButtonForm
