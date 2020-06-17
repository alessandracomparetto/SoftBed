import React from 'react';

function Ambienti() {
    return(
    <div>
        <form className="w50 justify-content-center mt-3">
            <h6 className="mx-5 mt-3 border-bottom border-primary">Ambienti presenti</h6>
            <div className="container pl-md-5">
                <div className= "form-group">
                    <div className="checkbox col-12 col-sm-6 text-center float-left ">
                        <label className="mr-2 mt-2">Salotto</label>
                        <input type="checkbox" name="salotto"/>

                    </div>
                    <div className="checkbox col-12 col-sm-6 text-center float-right">
                        <label className="mr-2 mt-2">Terrazza</label>
                        <input type="checkbox" name="terrazza"/>
                    </div>
                </div>

                <div className= "form-group">
                    <div className="checkbox col-12 col-sm-6 text-center float-left ">
                        <label className="mr-2 mt-2">Giardino</label>
                        <input type="checkbox" name="giardino"/>

                    </div>
                    <div className="checkbox col-12 col-sm-6 text-center float-right">
                        <label className="mr-2 mt-2">Piscina</label>
                        <input type="checkbox" name="giardino"/>
                    </div>
                </div>
            </div>
            <h6 className="mx-5 mt-3 border-bottom border-primary">Camere presenti</h6>
            <div className="form-group">
                <select multiple className="form-control col-10 col-sm-6 mx-auto">
                    <option>Camera 1</option>
                    <option>Camera 2</option>
                    <option>Camera 3</option>
                    <option>Camera 4</option>
                    <option>Camera 5</option>
                </select>
            </div>

            <div className="form-group d-flex col-10 col-sm-6 mx-auto justify-content-between p-0">
                <label className="mb-0 p-0 my-auto col-7 col-sm-6">Numero letti matrimoniali</label>
                <input name="nLettiMatrimoniali" type="number" className="form-control col-3 col-sm-6 mx-auto my-auto " min={0} max={99} defaultValue={0} required/>
            </div>
            <div className="form-group d-flex col-10 col-sm-6 mx-auto justify-content-between p-0">
                <label className="mb-0 p-0 my-auto col-7 col-sm-6">Numero letti singoli</label>
                <input name="nLettiSingoli" type="number" className="form-control col-3 col-sm-6 mx-auto my-auto " min={0} max={99} defaultValue={0} required/>
            </div>
            <div className="form-group d-flex col-10 col-sm-6 mx-auto justify-content-between p-0">
                <label className="mb-0 p-0 my-auto col-7 col-sm-6 pr-1">Numero camere per questa tipologia</label>
                <input name="numeroPerCamera" type="number" className="form-control col-3 col-sm-6 mx-auto my-auto " min={0} max={99} defaultValue={0} required/>
            </div>
            <div className="col-10 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-primary">Aggiungi camera</button>
            </div>

            <h6 className="mx-5 mt-3 border-bottom border-primary">Informazioni generali</h6>
            <div className="form-group d-flex col-10 col-sm-6 mx-auto justify-content-between p-0">
                <label className="mb-0 p-0 my-auto col-7 col-sm-6">Numero bagni</label>
                <input name="nBagni" type="number" className="form-control col-3 col-sm-6 mx-auto my-auto " min={0} max={3} defaultValue={0} required/>
            </div>
            <div className="input-group mb-3 d-flex col-10 col-sm-6 mx-auto justify-content-between p-0">
                <label className="mb-0 p-0 col-7 col-sm-6 my-auto">Prezzo struttura (a notte)</label>
                <div className="input-group-prepend h-100 my-auto">
                    <span className="input-group-text">€</span>
                </div>
                <input name="prezzoNotte" type="number" className="form-control my-auto currency" min="0" step="0.01" max="99999,99" data-number-stepfacto="1" required/>
            </div>
        </form>
        <div className="d-flex col-12 col-sm-10 mx-auto justify-content-between m-5">
            <button type="button" className="btn btn-outline-danger btn-lg">Indietro</button>
            <button type="submit" className="btn btn-primary col-3 btn-block">Continua</button>
        </div>
    </div>

    )
}

export default Ambienti;

