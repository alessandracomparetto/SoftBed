import React from "react";
import ButtomForm from "./ButtomForm";


function FormCamere(){
    return(

        <form className="container col-sm-10 col-md-6">
            <h6 className="mx-5 mt-3">Camere presenti</h6>
            <div className="form-group">
                <select multiple className="form-control col-10 col-sm-6 mx-auto">
                    <option>Camera 1</option>
                    <option>Camera 2</option>
                    <option>Camera 3</option>
                    <option>Camera 4</option>
                    <option>Camera 5</option>
                </select>
            </div>

            <div className="form-group was-validated">
                <label htmlFor="tipologiaCamera">Tipologia di camera</label>
                <select className="form-control" id="tipologiaCamera">
                    <option>Singola</option>
                    <option>Doppia</option>
                    <option>Tripla</option>
                    <option>Quadrupla</option>
                </select>
                <div className="was-validated">
                    <label htmlFor="nLettiMatrimoniali">Numero letti matrimoniali </label>
                    <input name="nLettiMatrimoniali" id="nLettiMatrimoniali" type="number" className="form-control" min="1" max="10" size="2"
                           maxLength="2" required/>
                    <div className="invalid-feedback">
                        1 - 10
                    </div>

                    <label htmlFor="nLettiSingoli">Numero letti singoli </label>
                    <input name="nLettiSingoli" id="nLettiSingoli" type="number" className="form-control" min="1" max="10" size="2"
                           maxLength="2" required />
                    <div className="invalid-feedback">
                        1 - 10
                    </div>
                </div>

                <label htmlFor="nCamere">Numero di camere per questa tipologia </label>
                <input name="nCamere" id="nCamere" type="number" className="form-control" min="1" max="10" size="2"
                       maxLength="2" required />
                <div className="invalid-feedback">
                    1 - 10
                </div>

                <div className="">
                    <label htmlFor="prezzo">Prezzo base a notte</label>
                    <input name="prezzo" id="prezzo" type="text" placeholder="€€" className="form-control" size="32" maxLength="10" required/>
                    <div className="invalid-feedback">
                        Inserire il prezzo base a notte
                    </div>
                </div>

                <button type="button" className="btn btn-secondary float-right">Aggiungi camera</button>
            </div>
            <ButtomForm/>

        </form>

    )
}
export default FormCamere
