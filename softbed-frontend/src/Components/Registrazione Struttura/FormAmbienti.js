import React from 'react';

let contatore = 0;

function FormAmbienti(props) {
    const camera = "Camera ";

    function vaiAvanti(event){
        let flag = 0;
        //controlla che sia stata aggiunta almeno una camera, quando si clicca su continua bisogna vedere la lista delle camere non sia vuota
        if(contatore === 0){
            document.getElementById("inserisciCamera").classList.remove("collapse");
            event.preventDefault();
            flag = true;
        }
        if(!document.getElementById("prezzo").checkValidity() || !document.getElementById("nBagni").checkValidity()){
            document.getElementById("validazione").classList.add("was-validated");
            event.preventDefault();
            flag = true;
        }
        if(!flag){
            props.go();
        }
    }
    function vaiIndietro(){
        props.goBack();
    }

    function scriviCamera() {
        let lista = document.getElementById("listaCamere");
        let nlettiMatrimoniali = document.getElementById("nLettiMatrimoniali");
        let nlettiSingoli = document.getElementById("nLettiSingoli");
        let nCamere = document.getElementById("nCamere");
        let flag = false;

        //pulisco i residui prima di iniziare (succede se il precedente inserimento camera va male
        let listaCollapse = document.getElementsByClassName("messaggio");
        let listaWarning = document.getElementsByClassName("border-danger");
        let validi = document.getElementsByClassName("controlla");

        for(let i=0; i<listaCollapse.length;i++ ){
            //la lista dei messaggi che devono scomparire è fissa
            listaCollapse[i].classList.add("collapse");
        }
        while(listaWarning.length>0){
            //la lista delle classi da eliminare si riduce ad ogni elemento eliminato, necessario il while
            listaWarning[0].classList.remove("border-danger")
        }

        //controllo la validità dell'inserimento
        if(!nlettiMatrimoniali.checkValidity() || !nlettiSingoli.checkValidity()){
            let validi = document.getElementsByClassName("controlla");
            for (let i = 0; i < validi.length; i++) {
                validi[i].classList.add("was-validated");
            }
            flag=true;
        }
        //questo vuol dire che non ha inserito letti
        if (nlettiMatrimoniali.value + nlettiSingoli.value < 1) {
            nlettiMatrimoniali.classList.add("border-danger");
            nlettiSingoli.classList.add("border-danger");
            let messaggio = document.getElementsByClassName("indicazioneLetti");
            for (let i = 0; i < messaggio.length; i++) {
                messaggio[i].classList.remove("collapse");
            }
            flag=true;
        }
        //flag falso se tutti i dati sono ok
        if(!flag) {
            if (contatore===0) {
                //rimuovo lo spazio vuoto dentro lo scrollable
                lista.removeChild(lista.childNodes[0]);
            }
            if (nCamere.value<1){
                nCamere.value=1;
            }
            if(nlettiSingoli.value === "") nlettiSingoli.value=0;
            if(nlettiMatrimoniali.value === "") nlettiMatrimoniali.value=0;

            for(let i = 0; i<nCamere.value; i++){
                contatore++;
                let p = document.createElement("P");
                let info = ":\t Letti Matrimoniali: " +nlettiMatrimoniali.value+", Letti Singoli: "+nlettiSingoli.value;
                let stringa = document.createTextNode(camera + contatore+ info);
                p.appendChild(stringa);
                lista.appendChild(p);

                //aggiorno lo stato
                let tmp = ({nLettiMatrimoniali: nlettiMatrimoniali.value, nLettiSingoli: nlettiSingoli.value});
                console.log(tmp);
                props.handleCamere(contatore,tmp);
            }


            //azzero tutto dopo l'aggiunta
            nlettiMatrimoniali.value = "";
            nlettiSingoli.value = "";
            nCamere.value = 1;
            for(let i=0; i<listaCollapse.length;i++ ){
                //la lista dei messaggi che devono scomparire è fissa
                listaCollapse[i].classList.add("collapse");
            }
            while(listaWarning.length>0){
                //la lista delle classi da eliminare si riduce ad ogni elemento eliminato, necessario il while
                listaWarning[0].classList.remove("border-danger")
            }
            for(let i = 0; i<validi.length; i++) {
                validi[i].classList.remove("was-validated");
            }
        }
    }

    //****************************************************RETURN
    if(props.currentStep !== 3){
        return null;
    }
    return(
        <form className="container col-12 col-md-8">
            <h6 className="mt-3 border-bottom border-primary">Ambienti presenti</h6>
            <div  onChange={props.handleChange}>
                <div className="form-row-group text-center offset-5 offset-sm-3">
                    <div className="form-check-inline col-12 col-sm-5" >
                        <input type="checkbox" className="mr-1" name="salotto" id="salotto" defaultChecked={props.dati.salotto==="on"}/>
                        <label className="form-check-label text-center" htmlFor="salotto">Salotto</label>
                    </div>
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="terrazza" id="terrazza" defaultChecked={props.dati.terrazza==="on"}/>
                        <label className="form-check-label" htmlFor="terrazza">Terrazza</label>
                    </div>
                </div>
                <div className="form-row-group text-center offset-5 offset-sm-3">
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="giardino" id="giardino" defaultChecked={props.dati.giardino==="on"}/>
                        <label className="form-check-label" htmlFor="giardino">Giardino</label>
                    </div>
                    <div className="form-check-inline col-12 col-sm-5">
                        <input type="checkbox" className="mr-1" name="piscina" id="piscina" defaultChecked={props.dati.piscina==="on"}/>
                        <label className="form-check-label" htmlFor="piscina">Piscina</label>
                    </div>
                </div>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Camere presenti</h6>
            <div>
                <div id="listaCamere" className="mb-3 col-12 mx-auto border pre-scrollable bg-white" style={{maxHeight: 30 + 'vh'}}>
                    <p>
                        <br/>
                    </p>

                </div>
            </div>
            <small  id="inserisciCamera" className="form-text text-danger collapse messaggio">Per continuare devi inserire almeno una camera</small>


            <div className="form-group controlla">
                <label htmlFor="nLettiMatrimoniali">Numero letti matrimoniali</label>
                <input name="nLettiMatrimoniali" id="nLettiMatrimoniali" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" placeholder="0" />
                <small  className="form-text text-danger collapse indicazioneLetti messaggio">Per registrare la camera devi aver inserito almeno un letto</small>
                <div className="invalid-feedback">1 - 10</div>
            </div>
            <div className="form-group controlla">
                <label htmlFor="nLettiSingoli">Numero letti singoli </label>
                <input name="nLettiSingoli" id="nLettiSingoli" type="number" className="form-control" min="0" max="10" size="2" maxLength="2" placeholder="0" />
                <small className="form-text text-danger collapse indicazioneLetti messaggio">Per registrare la camera devi aver inserito almeno un letto</small>
                <div className="invalid-feedback">1 - 10</div>
            </div>
            <div className="form-group">
                <label htmlFor="nCamere">Numero di camere per questa tipologia </label>
                <input name="nCamere" id="nCamere" type="number" className="form-control" min="1" max="10" size="2" maxLength="2"  defaultValue="1" />
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary" type="button" onClick={scriviCamera}>
                    Aggiungi camera
                </button>
            </div>

            <h6 className="mt-3 border-bottom border-primary">Informazioni generali</h6>
            <div  id="validazione" >
                <div className="form-group">
                    <label htmlFor="nBagni">Numero bagni</label>
                    <input id="nBagni" type="number" name="nBagni" className="form-control" min={1} max={10}  size="2" maxLength="2" required defaultValue={props.dati.nBagni} onChange={props.handleChange}/>
                    <span className="invalid-feedback small text-danger">1 - 10</span>
                </div>
                <div className="input-group">
                    <label htmlFor="prezzo">Prezzo struttura (a notte)</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">€</span>
                        </div>
                        <input name="prezzo" type="number" id="prezzo" className="form-control currency" min="1" step="0.01" max="10000" defaultValue={props.dati.prezzo} required onChange={props.handleChange}/>
                        <span className="invalid-feedback small text-danger">1 - 10000</span>
                    </div>
                </div>
            </div>
            <button id="indietro" className="btn btn-secondary mt-3 float-left btn-lg w-200px" onClick={vaiIndietro}>Indietro</button>
            <button id="ok" type="submit" className="btn btn-primary mt-3  float-right btn-lg w-200px" onClick={vaiAvanti}>Continua</button>
        </form>



    )
}

export default FormAmbienti;

