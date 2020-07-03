import React, {useState} from 'react';
import $ from "jquery";
import axios from "axios";
import {Redirect} from "react-router-dom";

const crypto = require('crypto');

function Registrazione() {
    const[redirect, setRedirect] = useState(false);

    function onSubmit(e){
        e.preventDefault();
        var form = document.getElementById("form");
        form.classList.add('was-validated');

        if(form.checkValidity()){
            let pass = document.getElementById("pass").value;
            let passhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
            passhash.update(pass); // cifriamo la password
            let encpass = passhash.digest('hex'); // otteniamo la stringa esadecimale

            const utenteRegistrato = {
                nome: document.getElementById("name").value,
                cognome: document.getElementById("surname").value,
                dataNascita: document.getElementById("dataNascita").value,
                email: document.getElementById("email").value ,
                pass: encpass,
                gestore: $( "input:checked" ).val(),
            }
            try{
                axios.post("/utente/utenteRegistrato", utenteRegistrato)
                    .then((res) => {
                        window.sessionStorage.setItem("utente", JSON.stringify(res.data));
                        setRedirect(true)}
                    );
            }
            catch(err){
                if (err.response.status === 400) {
                    console.log('There was a problem with the server');
                } else {
                    console.log(err.response.data.msg);
                }
            }

        }


    }
    function verificaPass(event) {
        const strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}");
            if (strongPass.test(event.target.value)) {
               document.getElementById("mdPass").classList.remove('text-warning');
               document.getElementById("mdPass").innerHTML="Password forte";
            }
            else{
                document.getElementById("mdPass").classList.add('text-warning');
                document.getElementById("mdPass").innerHTML="Password media";
            }
        }

    function confermaPass(event){
        const mdPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$");
        if(mdPass.test(event.target.value)) {
            if ($('#pass').val() === $('#repass').val()) {
                $('#message').html('Password coincidenti').css('color', 'green');
            } else
                $('#message').html('Password non coincidenti').css('color', 'red');
        }
    }

    if (redirect){
        return <Redirect to='/utente'/>;
    }

    return(

        <div className="container">
            <div style={{height:10+'vh'}}/>
            <div className="col-12 col-lg-8 mb-3 rounded shadow border border-secondary bg-light mx-auto">
                <div className="d-flex justify-content-center">
                    <div className="container rounded-cicle text-center" style={{position: "absolute", top: -45+'px'}}>
                        <i className="fa fa-user-circle fa-5x text-warning bg-white rounded-circle" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="text-center mt-4 pt-2"><h3>Registrati</h3></div>
                <form id="form" className="container col-12 col-lg-8 mt-3" style={{ top: -15+'px'}} noValidate onSubmit={onSubmit} action="/registrati">

                    <div className="form-group" >
                        <label htmlFor="name">Nome</label>
                        <div className="input-group" style={{ top: -8 +'px'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user fa"></i></span>
                            </div>
                            <input id="name" name="name" type="text" className="form-control" pattern = "^[A-z]+[éèùàòì]?[\s[A-z]+[éèùàòì]?]?$" maxLength="40" required/>
                            <div className="invalid-feedback">Inserire nome</div>
                        </div>
                    </div>

                    <div className="form-group mt-3" >
                        <label htmlFor="surname">Cognome</label>
                        <div className="input-group" style={{ top: -8 +'px'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user fa"></i></span>
                            </div>
                            <input id="surname" name="surname" type="text" className="form-control" pattern = "^[A-z]+[éèùàòì]?[\s[A-z]+[éèùàòì]?]?$" maxLength="40" required/>
                            <div className="invalid-feedback">Inserire cognome</div>
                        </div>
                    </div>

                    <div className="form-group mt-3" >
                        <label htmlFor="dataNascita">Data di nascita</label>
                        <div className="input-group" style={{ top: -8 +'px'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-birthday-cake"></i></span>
                            </div>
                            <input id="dataNascita" name="dataNascita" type="date" className="form-control" required/>
                            <div className="invalid-feedback">Inserire la data di nascita</div>
                        </div>
                    </div>

                    <div className="form-group mt-3" >
                        <label htmlFor="email">E-mail</label>
                        <div className="input-group" style={{ top: -8 +'px'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope fa" ></i></span>
                            </div>
                            <input id="email" name="email" type="email" className="form-control" size="32" maxLength="40" required/>
                            <div className="invalid-feedback">Inserire indirizzo e-mail</div>
                        </div>
                    </div>
                    <div className="form-group mt-3" >
                        <label htmlFor="pass">Password</label>
                        <div className="input-group" style={{ top: -8 +'px'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"/></span>
                            </div>
                            <input id="pass" name="pass" type="password" className="form-control"
                                   title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" size="32" maxLength="40" onChange={verificaPass} required/>
                            <div className="invalid-feedback">Almeno 8 caratteri di cui uno maiuscolo e un numero</div>
                            <div id="mdPass" className="valid-feedback text-warning">Password media</div>
                        </div>

                    </div>

                    <div className="form-group mt-3" >
                        <label htmlFor="repass">Conferma password</label>
                        <div className="input-group" style={{ top: -8 +'px'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"/></span>
                            </div>
                            <input id="repass" name="repass" type="password" className="form-control"
                                   size="32" maxLength="40" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" onKeyUp={confermaPass} required/>
                        </div>
                        <div>
                            <span id="message"></span>
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="account">Tipo di account</label>
                        <br/>
                        <div className="form-check form-check-inline" style={{ top: -8 +'px'}}>
                            <input className="form-check-input" type="radio" name="account" id="gestore" value={1} required/>
                            <label className="form-check-label" htmlFor="gestore">Gestore</label>
                        </div>
                        <div className="form-check form-check-inline" style={{ top: -8 +'px'}}>
                            <input className="form-check-input" type="radio" name="account" id="ospite" value={0} required/>
                            <label className="form-check-label" htmlFor="ospite">Ospite</label>
                            <div className="invalid-feedback ml-2">
                                Inserire il tipo di account
                            </div>
                        </div>
                    </div>

                    <button name="ok" id="ok" type="submit" className="btn btn-warning rounded-pill text-dark mt-4 col-6">Continua</button>
                </form>
            </div>
            </div>


    );
}

export default Registrazione;


