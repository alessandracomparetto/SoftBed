import React from 'react';
function Registration() {
    return(

        <form className="container was-validated col-sm-8 mt-3" method="POST" action="/users/utenteregistrato">

            <div className="form-group">
                <label htmlFor="name">Nome *</label>
                <input id="name" name="name" type="text" className="form-control" maxLength="40" required/>
                <div className="invalid-feedback">
                    Inserire nome
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="name">Cognome *</label>
                <input id="cognome" name="cognome" type="text" className="form-control" maxLength="40" required/>
                <div className="invalid-feedback">
                    Inserire cognome
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40"
                       required/>
                <div className="invalid-feedback">
                    Inserire indirizzo e-mail
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="pass">Password *</label>
                <input name="pass" id="pass" type="password" className="form-control"
                       title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" size="32" maxLength="40" required/>
                <div className="invalid-feedback">
                    Almeno 8 caratteri di cui uno maiusciolo e un numero
                </div>
                <div className="valid-feedback text-warning">
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
                    <input className="form-check-input" type="radio" name="account" id="gestore" value="Gestore" required/>
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
    )
}

export default Registration;


