import React from 'react';
import $ from "jquery";
import axios from "axios";
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

function Registration() {
    function onSubmit(e){
        e.preventDefault();
        const utenteRegistrato= {
            nome: document.getElementById("name").value,
            cognome: document.getElementById("surname").value,
            data_nascita: document.getElementById("birthdate").value,
            email: document.getElementById("email").value ,
            pass: document.getElementById("pass").value ,
            gestore: $( "input:checked" ).val(),
        }
        console.log(utenteRegistrato);
        try{
            axios.post("/utente/utenteRegistrato", utenteRegistrato);
        }
        catch(err){
            if (err.response.status === 400) {
                console.log('There was a problem with the server');
            } else {
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

    return(

        <form className="container needs-validation col-sm-8 mt-3" noValidate onSubmit={onSubmit}>

            <div className="form-group">
                <label htmlFor="name">Nome *</label>
                <input id="name" name="name" type="text" className="form-control" maxLength="40" required/>
                <div className="invalid-feedback">
                    Inserire nome
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="surname">Cognome *</label>
                <input id="surname" name="surname" type="text" className="form-control" maxLength="40" required/>
                <div className="invalid-feedback">
                    Inserire cognome
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40" required/>
                <div className="invalid-feedback">
                    Inserire indirizzo e-mail
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="pass">Password *</label>
                <input name="pass" id="pass" type="password" className="form-control"
                       title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" size="32" maxLength="40" onChange={verificaPass} required/>
                <div className="invalid-feedback">
                    Almeno 8 caratteri di cui uno maiuscolo e un numero
                </div>
                <div id="mdPass" className="valid-feedback text-warning">
                    Password media
                </div>
            </div>


            <div className="form-group">
                <label htmlFor="birthdate">Data di Nascita *</label>
                <input name="birthdate" id="birthdate" type="date" className="form-control" required/>
                <div className="invalid-feedback">
                    Selezionare la data di nascita
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="account">Tipo di account *</label>
                <br/>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="account" id="gestore" value="gestore" required/>
                        <label className="form-check-label" htmlFor="gestore">Gestore</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="account" id="ospite" value="ospite" required/>
                        <label className="form-check-label" htmlFor="ospite">Ospite</label>
                    <div className="invalid-feedback ml-2">
                        Inserire il tipo di account
                    </div>
                </div>
            </div>

            <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3">Continua</button>
        </form>
    );
}

export default Registration;


