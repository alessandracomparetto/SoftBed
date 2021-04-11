import React from 'react';
import axios from "axios";
import $ from 'jquery';
import mostraDialogErrore from "../../../Actions/errore";
import {useHistory, useLocation} from "react-router-dom";
const crypto = require('crypto');

function Login(){
    const history = useHistory();
    const location = useLocation();

    function onSubmit(e){
        e.preventDefault();
        $("#errore-pass").addClass("collapse");
        $("#errore-email").addClass("collapse");
        let form = document.getElementById("form");
        form.classList.add('was-validated');

        if(form.checkValidity()) {
            let email = document.getElementById("email").value;
            let pass = document.getElementById("pass").value;

            let passhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
            passhash.update(pass); // cifriamo la password
            let encpass = passhash.digest('hex'); // otteniamo la stringa esadecimale

            const utenteLogin = {
                email: email,
                pass: encpass,
            };

            try {
                axios.post("/user/login", utenteLogin)
                    .then((res) => {
                        window.sessionStorage.setItem("utente", JSON.stringify(res.data));
                        if (location.state && location.state.urlProvenienza) history.push(location.state.urlProvenienza)
                        else window.location.href="/utente";
                    }).catch(err =>{
                        if (err.response.status === 400){
                            $("#errore-pass").removeClass("collapse");
                        }
                        else if (err.response.status === 404){
                            $("#errore-email").removeClass("collapse");
                        }
                        else {
                            mostraDialogErrore();
                        }
                    });
            } catch (err) {
                console.log(err.response.data.msg);
            }
        }
    }

    return(
        <div className="container">
            <div className="empty-pre-login"/>
            <div className="col rounded shadow bg-light mx-auto login border border-warning">
                <div className="d-flex justify-content-center">
                     <div className="d-flex justify-content-center" style={{position: "absolute", top: -50 +'px'}}>
                        <i className="fa shadow fa-user-circle fa-6x text-warning bg-light rounded-circle"
                           aria-hidden="true"/>
                    </div>
                </div>
                <div className="text-center mt-5 pt-3 text-dark"><h3>Accedi</h3></div>
                <form className="mb-4" id="form" onSubmit={onSubmit} noValidate action="/">
                    <div className="form-group" >
                        <div className="input-group pt-2 mt-4 pb-2">
                            <label className="sr-only" htmlFor="email"/>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"/></span>
                            </div>
                            <input name="email" id="email" type="email" className="form-control" placeholder="email" required/>
                            <div className="invalid-feedback">Inserire indirizzo e-mail</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="password"/>
                        <div className="input-group  mt-4 show-hide-password">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"/></span>
                            </div>
                            <input name="pass" id="pass" type="password" className="form-control input_pass was-validated" placeholder="password" autoComplete="current-password" required/>
                            <div className="invalid-feedback">Inserire password</div>
                        </div>
                    </div>
                    <div id="errore-email" className="collapse text-danger small">Non risulta alcun account associato a questa e-mail.</div>
                    <div id="errore-pass" className="collapse text-danger small">La password inserita è errata!</div>
                    <div className="d-flex justify-content-center mt-4">
                        <button id="ok" type="submit" className="btn btn-primary btn btn-warning rounded-pill text-dark minw-200px">Accedi</button>
                    </div>

                </form>
            </div>
            <div className="empty-post-login"/>
        </div>
    )
}

export default Login;

