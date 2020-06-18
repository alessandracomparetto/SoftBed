import React from "react";


function FormDatiAggiuntivi(){
    /* TODO: BACKEND
     * Cognome email e password già compilati
     */

    return(
        <form className="container pt-3 col-sm-10 col-md-6">
            <h6 className="mt-3 text-uppercase ">Dati anagrafici</h6>
                <div className="form-row">
                <div className="form-group col-sm-12 col-md-6">
                    <label htmlFor="Nome">Nome</label>
                    <input id="name" name="name" type="text" className="form-control" required/>
                </div>

                <div className="form-group col-sm-12 col-md-6">
                    <label htmlFor="Nome">Cognome</label>
                    <input id="name" name="name" type="text" className="form-control" required/>
                </div>

                <div className="form-group col-sm-12 col-md-6">
                    <label htmlFor="birthdate">Data di Nascita</label>
                    <input name="birthdate" id="birthdate" type="date" className="form-control"/>
                </div>

                <div className="form-group col-sm-12 col-md-6">
                    <label htmlFor="pass">Codice fiscale</label>
                    <input name="cf" id="cf" type="text" className="form-control"
                           pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$"  required/>
                    <div className="invalid-feedback">
                        Codice fiscale errato
                    </div>
                </div>

                <p>Nato a </p>
                <div className="input-group mb-3 col-sm-12">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                    </div>
                    <select id="region" className="custom-select" name="region">
                        <option value="" selected></option>
                        <option value="Abruzzo">Abruzzo</option>
                        <option value="Basilicata">Basilicata</option>
                        <option value="Calabria">Calabria</option>
                        <option value="Campania">Campania</option>
                        <option value="Emilia-Romagna">Emilia-Romagna</option>
                        <option value="Friuli-Venezia Giulia">Friuli-Venezia Giulia</option>
                        <option value="Lazio">Lazio</option>
                        <option value="Liguria">Liguria</option>
                        <option value="Lombardia">Lombardia</option>
                        <option value="Marche">Marche</option>
                        <option value="Molise">Molise</option>
                        <option value="Piemonte">Piemonte</option>
                        <option value="Puglia">Puglia</option>
                        <option value="Sardegna">Sardegna</option>
                        <option value="Sicilia">Sicilia</option>
                        <option value="Toscana">Toscana</option>
                        <option value="Trentino-Alto Adige">Trentino-Alto Adige</option>
                        <option value="Umbria">Umbria</option>
                        <option value="Valle d'Aosta">Valle d'Aosta</option>
                        <option value="Veneto">Veneto</option>
                    </select>
                </div>

                <div className="input-group mb-3 col-sm-12">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Provincia&nbsp;</span>
                    </div>
                    <select id="state" name="state" className="custom-select">
                        <option value="" selected></option>
                    </select>
                </div>

                <div className="input-group mb-3 col-sm-12">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                    </div>
                    <select id="town" name="town" className="custom-select" >
                        <option value="" selected></option>
                    </select>
                </div>

            </div>

            <h6 className="mt-4 text-uppercase ">Indirizzo</h6>
                <div className="form-row">
                    <div className="form-group col-sm-12 col-md-6">
                        <label htmlFor="address">Via/Piazza</label>
                        <input name="address" id="address" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control"/>
                    </div>

                    <div className="form-group col-sm-4 col-md-3">
                        <label htmlFor="addressnum">N.</label>
                        <input name="addressnum" id="addressnum" type="number" className="form-control" min="1" max="9999" disabled/>
                        <div className="invalid-feedback">
                            1 - 9999
                        </div>
                    </div>

                    <div className="form-group col-sm-8 col-md-3">
                        <label htmlFor="cap">CAP</label>
                        <input name="cap" id="cap" type="tel" className="form-control" pattern="^\d{5}$" placeholder="#####"
                               title="Inserire 5 cifre da 00100 a 98168" disabled/>
                        <div className="invalid-feedback">
                            00010 - 98168
                        </div>
                    </div>

                    <div className=" form-group col-sm-12 col-md-6">
                        <label htmlFor="city">Località</label>
                        <input name="city" id="city" type="text" className="form-control" pattern="^(\s*\w+\.*\s*)+" disabled/>
                        <div className="invalid-feedback">
                            Nome località
                        </div>
                    </div>

                    <div className="form-group col-sm-12 col-md-6">
                        <label htmlFor="Cellulare">Telefono</label>
                        <input name="tel" id="tel" type="tel" className="form-control" placeholder="(+/00)PPLLLNNNNNNN"
                               pattern="((((\+|00)[1-9]{2})|0)?([1-9]{2,3}))([0-9]{6,10})"
                               title="Inserire il numero di telefono nel formato (+|00)<pref. int.><pref. loc.><numero> oppure 0<pref. loc.><numero>" disabled/>
                        <div className="invalid-feedback">
                            ((+ / 00)(pref. int.) / 0)(pref. loc)(numero)
                        </div>
                    </div>
            </div>

            <h6 className="mt-4 text-uppercase ">Autenticazione</h6>
                <div className="form-row">
                    <div className="form-group col-sm-12">
                        <label htmlFor="email">E-mail</label>
                        <input name="email" id="email" type="email" className="form-control" required/>
                    </div>

                    <div className="form-group col-sm-12">
                        <label htmlFor="pass">Password</label>
                        <input name="pass" id="pass" type="password" className="form-control"
                               title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                               pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" required/>
                        <div className="invalid-feedback">
                            Almeno 8 caratteri di cui uno maiusciolo e un numero
                        </div>
                        <div className="valid-feedback text-warning">
                            Password media
                        </div>
                    </div>
                </div>
        </form>

    )
}

export default FormDatiAggiuntivi;