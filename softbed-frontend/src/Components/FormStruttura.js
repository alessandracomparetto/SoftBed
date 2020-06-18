import React, { useState } from "react";
import ButtomForm from "./ButtomForm";

function FormStruttura(){

    return(
    <form className="container was-validated col-sm-8 mt-3">
        <p className="lead text-uppercase">Registra la tua struttura</p>
        <div className="form-group">
            <label htmlFor="name">Come si chiama la tua struttura?</label>
            <input id="name" name="name" type="text" className="form-control" maxLength="60" required />
            <div className="invalid-feedback">
                Inserisci il nome della struttura
            </div>
        </div>
        <p>Hai scritto {nomeStruttura}</p>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Regione&nbsp;&nbsp;</span>
            </div>
            <select id="region" className="custom-select" name="region" required>
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
            <div className="invalid-feedback">
                Selezionare la regione
            </div>
        </div>

        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Provincia&nbsp;</span>
            </div>
            <select id="state" name="state" className="custom-select" required>
                <option value="" selected></option>
            </select>
            <div className="invalid-feedback">
                Selezionare la provincia
            </div>
        </div>

        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Comune&nbsp;&nbsp;</span>
            </div>
            <select id="town" name="town" className="custom-select" required>
                <option value="" selected></option>
            </select>
            <div className="invalid-feedback">
                Selezionare il comune
            </div>
        </div>

        <div className="form-row">
            <div className="col-12 col-sm-8 col-md-6 col-lg-6">
                <label htmlFor="address">Via/Piazza</label>
                <input name="address" id="address" type="text" pattern="^(\s*\w+\.*\s*)+" className="form-control"
                       maxLength="40"/>
            </div>
            <div className="col-3">
                <label htmlFor="addressnum">N.</label>
                <input name="addressnum" id="addressnum" type="number" className="form-control" min="1" max="9999" size="4"
                       maxLength="4" disabled/>
                <div className="invalid-feedback">
                    1 - 9999
                </div>
            </div>
            <div className="col-3">
                <label htmlFor="cap">CAP.</label>
                <input name="cap" id="cap" type="tel" className="form-control" pattern="^\d{5}$" placeholder="#####"
                       title="Inserire 5 cifre da 00100 a 98168" size="5" maxLength="5" disabled/>
                <div className="invalid-feedback">
                    00010 - 98168
                </div>
            </div>
            <ButtomForm/>
        </div>
    </form>
        )
    }
    export default FormStruttura
