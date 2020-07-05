import React, {useState} from 'react';
import $ from "jquery";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import mostraDialogErrore from "../Actions/errore";
import {convertiData} from "../Actions/gestioneDate";
const crypto = require('crypto');

function Registrazione() {

    const mostraDialogEmail = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui text-center">
                        <h3>Ti sei già registrato con questa email!</h3>
                        <button className="btn btn-warning px-3 py-2 m-2 minw-200px"><a className="text-dark text-decoration-none" href={"/accedi/"}>Effettua il Login</a></button>
                    </div>
                )
            }
        })
    };

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
                dataNascita: document.getElementById("birthdate").value,
                email: document.getElementById("email").value ,
                pass: encpass,
                gestore: 0,
            };
            try {
                axios.post("/utente/utenteRegistrato", utenteRegistrato)
                    .then((res) => {
                        window.sessionStorage.setItem("utente", JSON.stringify(res.data));
                        window.location.href="/utente"
                        }
                    ).catch(err => {
                        if(err.response.status === 400){mostraDialogEmail();
                        }else{
                            mostraDialogErrore()
                        }
                });
            }
            catch(err){
                console.log(err.response.data.msg);
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
                            <input id="name" name="name" type="text" className="form-control" pattern = "^[A-z\sàèìòùÀÈÌÒÙéÉ]+$" maxLength="40" required/>
                            <div className="invalid-feedback">Inserire nome</div>
                        </div>
                    </div>

                    <div className="form-group mt-3" >
                        <label htmlFor="surname">Cognome</label>
                        <div className="input-group" style={{ top: -8 +'px'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user fa"></i></span>
                            </div>
                            <input id="surname" name="surname" type="text" className="form-control" pattern = "^[A-z\sàèìòùÀÈÌÒÙéÉ]+$" maxLength="40" required/>
                            <div className="invalid-feedback">Inserire cognome</div>
                        </div>
                    </div>

                    <div className="form-group mt-3" >
                        <label htmlFor="dataNascita">Data di nascita</label>
                        <div className="input-group" style={{ top: -8 +'px'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-birthday-cake"></i></span>
                            </div>
                            <input id="birthdate" name="dataNascita" type="date" className="form-control" min={convertiData(new Date(), 0,0,-100)} max={convertiData(new Date(), 0,0,-18)}/>
                            <div className="invalid-feedback r">Data di nascita non valida</div>
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
                    <button name="ok" id="ok" type="submit" className="btn btn-warning rounded-pill text-dark mt-4 col-6">Continua</button>
                </form>
            </div>
            </div>


    );
}

export default Registrazione;


