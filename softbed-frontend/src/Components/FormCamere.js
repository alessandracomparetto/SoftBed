import React from 'react';
import ButtonForm from "./ButtonForm";

/*TODO: controllare bene i valori di default e required del form*/
function FormCamere(){
    const camera = "Camera ";
    let contatore = 0;

    function scriviCamera() {
        let lista = document.getElementById("listaCamere");
        let tipologia = document.getElementById("tipologia");
        let nlettiMatrimoniali = document.getElementById("nLettiMatrimoniali");
        let nlettiSingoli = document.getElementById("nLettiSingoli");
        let nCamere = document.getElementById("nCamere");
        let prezzo = document.getElementById("prezzo");
        let flag = false;

        if (tipologia.value === "") {
            tipologia.classList.add("border-warning");
            document.getElementById("indicazioneTipologia").classList.remove("collapse");
            flag=true;

        }
        if (nlettiMatrimoniali.value + nlettiSingoli.value < 1) {
            nlettiMatrimoniali.classList.add("border-warning");
            nlettiSingoli.classList.add("border-warning");
            let messaggio = document.getElementsByClassName("indicazioneLetti")
            for (let i = 0; i < messaggio.length; i++) {
                messaggio[i].classList.remove("collapse");
            }
            flag=true;
        }

        if (prezzo.checkValidity() === false) {
            prezzo.classList.add("border-warning");
            document.getElementById("indicazionePrezzo").classList.remove("collapse");
            flag=true;
        }

        if(!flag) {
            if (contatore===0) {
                //rimuovo lo spazio vuoto dentro lo scrollable
                lista.removeChild(lista.childNodes[0]);
            }
            for(let i = 0; i<nCamere.value; i++){
                contatore++
                let p = document.createElement("P");
                let info = ":\t "+ tipologia.value +", Letti Matrimoniali: " +nlettiMatrimoniali.value+", Letti Singoli: "+nlettiSingoli.value+", Prezzo: "+prezzo.value;
                let stringa = document.createTextNode(camera + contatore+ info);
                p.appendChild(stringa);
                lista.appendChild(p);
            }
            //azzero tutto dopo l'aggiunta
            tipologia.value = "";
            nlettiMatrimoniali.value = 0;
            nlettiSingoli.value = 0;
            nCamere.value = 1;
            prezzo.value = null;
            let listaCollapse = document.getElementsByClassName("messaggio");
            let listaWarning = document.getElementsByClassName("border-warning");
            for(let i=0; i<listaCollapse.length;i++ ){
                listaCollapse[0].classList.add("collapse")
            }
            while(listaWarning.length>0){
                listaWarning[0].classList.remove("border-warning")
            }
        }
    }
    return(
        <form className="container col-12 col-md-8 needs-validation" noValidate>
            <h6 className="mt-3 border-bottom border-primary">Camere presenti</h6>
            <div>
                <div id="listaCamere" className="mb-3 col-12 mx-auto border pre-scrollable" style={{maxHeight: 30 + 'vh'}}>
                    <p>
                        <br/>
                    </p>

                </div>
            </div>

            <div className="form-group bootstrap-select-wrapper">
                <label htmlFor="tipologiaCamera" >Tipologia di camera</label>
                <select className="form-control selectpicker" id="tipologia" defaultValue="" required>
                    <option value="">Scegli una opzione</option>
                    <option value="Singola">Singola</option>
                    <option value="Doppia">Doppia</option>
                    <option value="Tripla">Tripla</option>
                    <option value="Quadrupla">Quadrupla</option>
                </select>
                <small  id="indicazioneTipologia" className="form-text text-muted collapse messaggio">Per registrare la camera devi aver scelto la tipologia</small>
            </div>


            <div className="form-group">
                <label htmlFor="nLettiMatrimoniali">Numero letti matrimoniali</label>
                <input name="nLettiMatrimoniali" id="nLettiMatrimoniali" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" required/>
                <div className="invalid-feedback">1 - 10</div>
                <small  className="form-text text-muted collapse indicazioneLetti messaggio">Per registrare la camera devi aver inserito almeno un letto</small>

            </div>
            <div className="form-group">
                <label htmlFor="nLettiSingoli">Numero letti singoli </label>
                <input name="nLettiSingoli" id="nLettiSingoli" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" required/>
                <div className="invalid-feedback">1 - 10</div>
                <small className="form-text text-muted collapse indicazioneLetti messaggio">Per registrare la camera devi aver inserito almeno un letto</small>
            </div>
            <div className="form-group">
                <label htmlFor="nCamere">Numero di camere per questa tipologia </label>
                <input name="nCamere" id="nCamere" type="number" className="form-control" min="1" max="10" size="2" maxLength="2"  defaultValue="1"/>
                <div className="invalid-feedback">1 - 10</div>
            </div>

            <div className="form-group">
                <label htmlFor="prezzo">Prezzo base a notte</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">€</span>
                    </div>
                    <input name="prezzo" id="prezzo" type="number" className="form-control currency" min="0" step="0.01" max="10000" required/>
                </div>
                <div className="invalid-feedback">Inserire il prezzo base a notte</div>
                <small id="indicazionePrezzo" className="form-text text-muted collapse messaggio">Inserire il prezzo base a notte</small>
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary" type="button" onClick={scriviCamera}>
                    Aggiungi camera
                </button>
            </div>

            <ButtonForm/>

        </form>

    )
}
export default FormCamere
