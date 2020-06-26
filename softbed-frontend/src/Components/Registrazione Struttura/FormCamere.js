import React, {useState} from 'react';
import ButtonForm from "../ButtonForm";

/*
*  TODO: VALIDAZIONE NON CORRETTA
* */


let contatore = 0;
function FormCamere(props){
    const [camere, setCamere] = useState([]);
    const camera = "Camera ";
    //let contatore = 0; //indica il numero di camere inserite
    function vaiAvanti(e){
        //controlla che sia stata aggiunta almeno una camera, quando si clicca su continua bisogna vedere la lista delle camere non sia vuota
        if(contatore == 0){
            document.getElementById("inserisciCamera").classList.remove("collapse");
            e.preventDefault();
        }
        else{
            props.go();
        }
    }
    function vaiIndietro(){
        props.goBack();
    }
    function scriviCamera() {
        let lista = document.getElementById("listaCamere");
        let tipologia = document.getElementById("tipologia");
        let nlettiMatrimoniali = document.getElementById("nLettiMatrimoniali");
        let nlettiSingoli = document.getElementById("nLettiSingoli");
        let nCamere = document.getElementById("nCamere");
        let prezzo = document.getElementById("prezzo");
        let flag = false;

        //pulisco i residui prima di iniziare (succede se il precedente inserimento camera va male
        let listaCollapse = document.getElementsByClassName("messaggio");
        let listaWarning = document.getElementsByClassName("border-warning");
        let validi = document.getElementsByClassName("controlla")
        for(let i=0; i<listaCollapse.length;i++ ){
            //la lista dei messaggi che devono scomparire è fissa
            listaCollapse[i].classList.add("collapse");
        }
        while(listaWarning.length>0){
            //la lista delle classi da eliminare si riduce ad ogni elemento eliminato, necessario il while
            listaWarning[0].classList.remove("border-warning")
        }

        //questo vuol dire che non ha selezionato nessuna tipologia
        if (tipologia.value === "") {
            tipologia.classList.add("border-warning");
            document.getElementById("indicazioneTipologia").classList.remove("collapse");
            flag=true;

        }
        //controllo la validità dell'inserimento
        if(!nlettiMatrimoniali.checkValidity() || !nlettiSingoli.checkValidity()){
            let validi = document.getElementsByClassName("controlla")
            for (let i = 0; i < validi.length; i++) {
                validi[i].classList.add("was-validated");
            }
            flag=true;
        }
        //questo vuol dire che non ha inserito letti
        if (nlettiMatrimoniali.value + nlettiSingoli.value < 1) {
            nlettiMatrimoniali.classList.add("border-warning");
            nlettiSingoli.classList.add("border-warning");
            let messaggio = document.getElementsByClassName("indicazioneLetti")
            for (let i = 0; i < messaggio.length; i++) {
                messaggio[i].classList.remove("collapse");
            }
            flag=true;
        }
        let nPosti=parseInt(nlettiSingoli.value)+2*parseInt(nlettiMatrimoniali.value);
        //questo vuol dire che non ha fatto la combinazione giusta
        if((tipologia.value=="Singola" && !(nPosti==1)) || (tipologia.value=="Doppia" && !(nPosti==2))
            || (tipologia.value=="Tripla" && !(nPosti=3)) || (tipologia.value=="Quadrupla" && !(nPosti==4)))
        {
            nlettiMatrimoniali.classList.add("border-warning");
            nlettiSingoli.classList.add("border-warning");
            document.getElementById("sceltaTipologia").classList.remove("collapse");
            flag = true;
        }
        //questo vuol dire che non ha inserito il prezzo
        if (prezzo.checkValidity() === false) {
            prezzo.classList.add("border-warning");
            document.getElementById("indicazionePrezzo").classList.remove("collapse");
            flag=true;
        }


        //flag falso se tutti i dati sono ok
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
                p.appendChild(stringa)
                lista.appendChild(p);
            }
            //aggiorno lo stato
            let tmp = [...camere];
            for(let i=0; i<nCamere;i++){
                tmp.push({nLettiMatrimoniali: nlettiMatrimoniali.value, nLettiSingoli: nlettiSingoli.value , prezzoCamere: prezzo.value});
            }
            setCamere(tmp);
            //azzero tutto dopo l'aggiunta
            tipologia.value = "";
            nlettiMatrimoniali.value = 0;
            nlettiSingoli.value = 0;
            nCamere.value = 1;
            prezzo.value = null;
            for(let i=0; i<listaCollapse.length;i++ ){
                //la lista dei messaggi che devono scomparire è fissa
                listaCollapse[i].classList.add("collapse");
            }
            while(listaWarning.length>0){
                //la lista delle classi da eliminare si riduce ad ogni elemento eliminato, necessario il while
                listaWarning[0].classList.remove("border-warning")
            }
            for(let i = 0; i<validi.length; i++) {
                validi[i].classList.remove("was-validated");
            }
        }
    }

    //****************************************************RETURN
    if(props.currentStep != 3){
        return null;
    }
    return(
        <form className="container col-12 col-md-8 needs-validation"  oChange={props.handleChange} action={"camere/caratteristicheB"} noValidate>
            <h6 className="mt-3 border-bottom border-primary">Camere presenti</h6>
            <div>
                <div id="listaCamere" className="mb-3 col-12 mx-auto border pre-scrollable bg-white" style={{maxHeight: 30 + 'vh'}}>
                    <p>
                        <br/>
                    </p>

                </div>
            </div>
            <small  id="inserisciCamera" className="form-text text-danger collapse messaggio">Per continuare devi inserire almeno una camera</small>
            <div className="form-group bootstrap-select-wrapper">
                <label htmlFor="tipologiaCamera" >Tipologia di camera</label>
                <select className="form-control selectpicker" id="tipologia" defaultValue="" required>
                    <option value="">Scegli una opzione</option>
                    <option value="Singola">Singola</option>
                    <option value="Doppia">Doppia</option>
                    <option value="Tripla">Tripla</option>
                    <option value="Quadrupla">Quadrupla</option>
                </select>
                <small  id="indicazioneTipologia" className="form-text text-danger collapse messaggio">Per registrare la camera devi aver scelto la tipologia</small>
                <small  id="sceltaTipologia" className="form-text  text-danger collapse messaggio">Le informazioni che hai inserito sono incoerenti</small>
            </div>


            <div className="form-group controlla">
                <label htmlFor="nLettiMatrimoniali">Numero letti matrimoniali</label>
                <input name="nLettiMatrimoniali" id="nLettiMatrimoniali" type="number" className="form-control" min="0" max="2" size="2" maxLength="2" defaultValue="0"/>
                <small  className="form-text  text-danger collapse indicazioneLetti messaggio">Per registrare la camera devi aver inserito almeno un letto</small>
                <div className="invalid-feedback">1 - 10</div>
            </div>
            <div className="form-group controlla">
                <label htmlFor="nLettiSingoli">Numero letti singoli </label>
                <input name="nLettiSingoli" id="nLettiSingoli" type="number" className="form-control" min="0" max="4" size="2" maxLength="2" defaultValue="0"/>
                <small className="form-text text-danger collapse indicazioneLetti messaggio">Per registrare la camera devi aver inserito almeno un letto</small>
                <div className="invalid-feedback">1 - 10</div>
            </div>
            <div className="form-group">
                <label htmlFor="nCamere">Numero di camere per questa tipologia </label>
                <input name="nCamere" id="nCamere" type="number" className="form-control" min="1" max="10" size="2" maxLength="2"  defaultValue="1"/>
            </div>

            <div className="form-group">
                <label htmlFor="prezzo">Prezzo base a notte</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">€</span>
                    </div>
                    <input name="prezzo" id="prezzo" type="number" className="form-control currency" min="1" step="0.01" max="10000" required/>
                    <span className="invalid-feedback small text-danger">1 - 10000</span>
                </div>
                <small id="indicazionePrezzo" className="form-text collapse text-danger messaggio">Per registrare la camera devi aver inserito il prezzo base a notte</small>
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary" type="button" onClick={scriviCamera}>
                    Aggiungi camera
                </button>
            </div>
            <button id="indietro" className="btn btn-secondary mt-3 float-left btn-lg w-200px" onClick={vaiIndietro}>Indietro</button>
            <button id="ok" type="submit" className="btn btn-primary mt-3  float-right btn-lg w-200px" onClick={vaiAvanti}>Continua</button>
        </form>
    )
}
export default FormCamere



