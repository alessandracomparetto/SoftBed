import React, {useState} from "react";
import Breadcrumb from "../Breadcrumb";
import Servizio from "../Schermata Risultati/Servizio";
import Mappa from "../Schermata Risultati/Mappa";
import $ from "jquery";


function SchermataStruttura(props) {

    const [numeroAdulti, setNumeroAdulti] = useState(props.ospiti || 2)

    $(document).ready(() => {
        const adulti = $('#adulti')

        adulti.on('change', () => {
            console.log(adulti.val());
            setNumeroAdulti(adulti.val());
        })
    });

    return (
        <div className="container px-3 mt-3">
            {/* Nome e località */}
            <div className="shadow mt-3 card bg-white p-3">
                <h3>{props.struttura.nome}</h3>
                <Breadcrumb gerarchia={[
                    {url: "/search?destinazione=" + props.struttura.regione, testo: props.struttura.regione},
                    {url: "/search?destinazione=" + props.struttura.provincia, testo: props.struttura.provincia},
                    {url: "/search?destinazione=" + props.struttura.comune, testo: props.struttura.comune}
                ]} icona="map"/>
            </div>

            {/* Immagini */}
            <div className="m-3 row">
                {/* Immagine principale */}
                <div className="col-12 col-md-7 pr-md-0">
                    <figure className="figure overflow-hidden h-100" style={{height: 30 + "vw", maxHeight: 450 + "px"}}>
                        <img className="img h-100 m-auto img-cover img-fluid"
                             src={"/uploads/" + props.struttura.id + "/1.jpg"} alt={props.struttura.nome} />
                    </figure>
                </div>

                {/* Altre immagini */}
                <div className="col-12 col-md-5 mt-3 mt-md-0">
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 15 + "vw", maxHeight: 214 + "px"}}>
                        <img className="img h-100 w-100 m-auto d-block img-cover img-fluid"
                             src={"/uploads/" + props.struttura.id + "/2.jpg"} alt={props.struttura.nome} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 15 + "vw", maxHeight: 214 + "px"}}>
                        <img className="img h-100 w-100 m-auto d-block img-cover img-fluid"
                             src={"/uploads/" + props.struttura.id + "/3.jpg"} alt={props.struttura.nome} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 15 + "vw", maxHeight: 214 + "px"}}>
                        <img className="img h-100 w-100 m-auto d-block img-cover img-fluid"
                             src={"/uploads/" + props.struttura.id + "/4.jpg"} alt={props.struttura.nome} />
                    </figure>
                    <figure className="figure overflow-hidden w-100 col-3 col-md-6 px-2" style={{height: 15 + "vw", maxHeight: 214 + "px"}}>
                        <img className="img h-100 w-100 m-auto d-block img-cover img-fluid"
                             src={"/uploads/" + props.struttura.id + "/5.jpg"} alt={props.struttura.nome} />
                    </figure>
                </div>
            </div>

            <div className="d-lg-flex flex-lg-row-reverse">
                {/* Form dati di soggiorno */}
                <div className="shadow mt-3 card bg-dark text-light p-3 col-12 col-lg-6">
                    <form id="formRichiestaPrenotazione">
                        <div className="my-3">
                            <h5>Calendario</h5>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="dataCheckIn">Check-in</label>
                                <div className="col-sm-4">
                                    <input name="dataCheckIn" type="date" className="form-control" id="dataCheckIn"
                                           aria-describedby="Data check-in" required/>
                                </div>
                                <label className="sr-only" htmlFor="orarioCheckIn">Orario</label>
                                <div className="col-sm-4">
                                    <input name="orarioCheckIn" type="time" className="form-control" id="orarioCheckIn"
                                           defaultValue="11:00" min="06:00" max="15:00" required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="dataCheckOut">Check-out</label>
                                <div className="col-sm-4">
                                    <input name="dataCheckIn" type="date" className="form-control" id="dataCheckOut"
                                           aria-describedby="Data check-out" required/>
                                </div>
                                <label className="sr-only" htmlFor="orarioCheckOut">Orario</label>
                                <div className="col-sm-4">
                                    <input name="orarioCheckOut" type="time" className="form-control" id="orarioCheckOut"
                                           defaultValue="11:00" min="06:00" max="15:00" required/>
                                </div>
                            </div>
                        </div>

                        {
                            // TODO: props.struttura.tipologia && props.struttura.tipologia === "b&b" &&
                            (
                                <div className="my-3">
                                    <h5>Seleziona camere</h5>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="singole">Singole</label>
                                        <div className="col-sm-4">
                                            <input name="singole" type="number" className="form-control" id="singole"
                                                   aria-describedby="Numero camere singole" min={0} max={10}
                                                   defaultValue={0}/>
                                        </div>

                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" htmlFor="doppie">Doppie</label>
                                        <div className="col-sm-4">
                                            <input name="doppie" type="number" className="form-control" id="doppie"
                                                   aria-describedby="Numero camere doppie" min={0} max={10}
                                                   defaultValue={1}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div className="my-3">
                            <h5>Ospiti</h5>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="adulti">Adulti</label>
                                <div className="col-sm-3">
                                    <input name="adulti" type="number" className="form-control" id="adulti"
                                           aria-describedby="Numero di adulti" min={1} max={100}
                                           defaultValue={props.ospiti || 2} required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="bambini">Bambini</label>
                                <div className="col-sm-3">
                                    <input name="bambini" type="number" className="form-control" id="numeroSingole"
                                           aria-describedby="Numero di bambini" min={0} max={100}
                                           defaultValue={0} required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="esenti">Esenti</label>
                                <div className="col-sm-3">
                                    <input name="esenti" type="number" className="form-control" id="esenti"
                                           aria-describedby="Numero di esenti" min={0} max={numeroAdulti}
                                           defaultValue={0} />
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <button type="submit" className="btn btn-warning">Richiedi prenotazione</button>
                        </div>
                    </form>
                </div>

                {/* Informazioni struttura */}
                <div className="shadow mt-3 card bg-white p-3 col-12 col-lg-6">
                    <div>
                        <h6>Informazioni sulla struttura</h6>
                        <p>{props.struttura.descrizione}</p>
                    </div>
                    <div>
                        <h6>Servizi</h6>
                    </div>
                    {
                        props.struttura.servizi && props.struttura.servizi.map((servizio) => {
                            return (
                                <Servizio key={servizio.servizio} icona={servizio.icona}/>
                            )
                        })
                    }
                </div>
            </div>

            {/* Mappa */}
            <div className="shadow mt-3 card bg-white p-3">
                <h6>Esplora la zona</h6>
                <div className="shadow-sm w-100" style={{height: 250 + "px"}}>
                    <Mappa destinazione={props.struttura.comune}/>
                </div>
            </div>

        </div>
    )
}

export default SchermataStruttura;