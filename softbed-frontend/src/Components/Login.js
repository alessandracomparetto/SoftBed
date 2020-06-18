import React from 'react';
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

    return(
                <form className="container needs-validation col-sm-8 mt-3 " method="POST" action="/users/login" noValidate>
                    <div className="form-group" >
                        <label htmlFor="email">E-mail *</label>
                        <input name="email" id="email" type="email" className="form-control" placeholder="mario.rossi@example.com" required/>
                        <div className="invalid-feedback">
                            Inserire indirizzo e-mail
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="pass">Password *</label>
                        <input name="pass" id="pass" type="password" className="form-control"
                               title="Almeno 8 caratteri, una lettera maiuscola e un numero" placeholder="Password"
                               pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" required/>
                        <div className="invalid-feedback">
                            Almeno 8 caratteri di cui uno maiuscolo e un numero
                        </div>
                        <div className="valid-feedback text-warning">
                            Password media
                        </div>
                    </div>

                    <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3">Accedi</button>
                </form>
            //
        // </div>
    )
}

export default Login;