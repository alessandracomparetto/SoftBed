import React from 'react';
function Login(){
    return(
            //<div className="dropdown-menu">
                <form className="container was-validated col-sm-8 mt-3" method="POST" action="/users/login">
                    <div className="form-group">
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
                               pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"  required/>
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