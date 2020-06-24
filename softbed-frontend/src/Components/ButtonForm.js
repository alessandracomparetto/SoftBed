import React from "react";
import { Link} from "react-router-dom";
function ButtonForm(){

    return(
    <div className="container-fluid p-0 mt-2 mb-5 d-flex justify-content-between">
        <Link to="../">
            <button id="indietro" className="btn btn-secondary mt-3 float-left btn-lg w-200px">Indietro</button>
        </Link>
        <button id="ok" type="submit" className="btn btn-primary mt-3  float-right btn-lg w-200px">Continua</button>

    </div>
    )
}
export default ButtonForm
