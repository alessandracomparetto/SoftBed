import React, { useState } from "react";

function ButtomForm(){
    return(
    <div className="btn-group">
        <button name="indietro" id="indietro" className="btn btn-secondary mt-3 float-left">Indietro</button>
        <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3 float-right" >Invia</button>
    </div>
    )
}
export default ButtomForm
