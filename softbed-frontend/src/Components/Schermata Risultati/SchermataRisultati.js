import React, {useState} from "react"
import FormRicerca from "../FormRicerca";
import RisultatoRicerca from "./RisultatoRicerca";
import Paginazione from "./Paginazione";
import Mappa from "./Mappa";
import FormFiltri from "./FormFiltri/FormFiltri";

function SchermataRisultati() {
    // Per la navigazione fra le varie pagine
    const [pagina, setPagina] = useState(1);
    const [destinazione, setDestinazione] = useState("");

    // TODO: da rimuovere, solo per test
    const descrizione = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac eleifend lacus." +
        " In sed interdum augue. Aliquam lacinia lectus pulvinar lacus feugiat commodo. Praesent suscipit quam a" +
        " ipsum luctus congue. Sed quis nibh mauris. Vivamus massa elit, rhoncus a velit non, suscipit elementum sem." +
        " Sed commodo lacus nulla, non placerat libero gravida a. Orci varius natoque penatibus et magnis dis" +
        " parturient montes, nascetur ridiculus mus. Aliquam nec justo at felis posuere laoreet."

    const [listaStrutture] = useState([
        {id: "1",
            nome: "Struttura 1",
            descrizione: descrizione,
            servizi: [
                {servizio: "Aria condizionata", icona: "snowflake"},
                {servizio: "Riscaldamento", icona: "fire"},
                {servizio: "TV", icona: "tv"},
                {servizio: "Wi-Fi", icona: "wifi"},
                {servizio: "Piscina", icona: "water"},
                {servizio: "Idonea per bambini", icona: "child"}
            ]
        },

        {id: "2", nome: "Struttura 2", descrizione: descrizione, servizi: []},
        {id: "3", nome: "Struttura 3", descrizione: descrizione, servizi: []}
    ])

    return (
        <React.Fragment>
            <FormRicerca setDestinazione={setDestinazione}/>
            <div className="container">
                <div className="row">
                    <div className="shadow d-none d-lg-block col-lg-4 h-100 p-3 card mt-3">
                        <div className="shadow-sm" style={{height: 250 + "px"}}>
                            <Mappa destinazione={destinazione}/>
                        </div>
                        <FormFiltri servizi={[
                            {nome: "Cucina per celiaci", id: "cucinaPerCeliaci"},
                            {nome: "TV", id: "tv"}
                            ]}/>
                    </div>
                    <div className="col-12 col-lg-8">
                        {
                            listaStrutture.map((struttura, indice) => {
                                return <RisultatoRicerca key={indice} idStruttura={struttura.id} nomeStruttura={struttura.nome} descrizioneStruttura={struttura.descrizione} servizi={struttura.servizi}/>
                            })
                        }
                        <Paginazione paginaAttuale={pagina} numPagine={20} setPagina={setPagina} />


                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SchermataRisultati;