import React from 'react';
import $ from "jquery";
import axios from "axios";
const crypto = require('crypto');

(function() {
    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function Login(){
    function onSubmit(e){
        e.preventDefault();
        let email =  document.getElementById("email").value;
        let pass = document.getElementById("pass").value;

        let passhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
        passhash.update(pass); // cifriamo la password
        let encpass = passhash.digest('hex'); // otteniamo la stringa esadecimale

        const utenteLogin= {
            email: email,
            pass: encpass,
        }

        console.log(utenteLogin);
        {/*
        TODO: Aggiungere i controlli per inserimento nel db
        */}
        try{
            axios.post("/utente/login", utenteLogin);
        }
        catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }
    return(
            <div className="container text-center">
                <div style={{height:20+'vh'}}/>
                <div className="col-12 col-md-6 pb-3 mr-0 rounded shadow border border-secondary bg-light mx-auto" style={{minHeight:60+'vh'}}>
                    <div className="d-flex justify-content-center">
                         <div className="container rounded-cicle" style={{position: "absolute", top: -58+'px'}}>
                            <i className="fa fa-user-circle fa-6x text-warning bg-white rounded-circle" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="text-center mt-5 pt-3"><h3>Accedi</h3></div>
                    <form className="needs-validation" onSubmit={onSubmit} noValidate action="/">
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
                            <label className="sr-only" htmlFor="password"></label>
                            <div className="input-group  mt-4 show-hide-password">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"/></span>
                                </div>
                                <input name="pass" id="pass" type="password" className="form-control input_pass was-validated" placeholder="password" autoComplete="current-password" required/>
                                <div className="invalid-feedback">Inserire password</div>
                            </div>
                        </div>
                        <button id="ok" type="submit" className="btn btn-primary btn btn-warning rounded-pill text-dark mt-5 col-12 col-sm-6">Accedi</button>
                    </form>

                </div>
            </div>
    )
}

export default Login;

