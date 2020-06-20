import React, {useState} from "react"
import FormRicerca from "./FormRicerca";
import RisultatoRicerca from "./Schermata Risultati/RisultatoRicerca";
import Paginazione from "./Schermata Risultati/Paginazione";
import Mappa from "./Schermata Risultati/Mappa";

function SchermataRisultati() {
    // Per la navigazione fra le varie pagine
    const [pagina, setPagina] = useState(1);

    // TODO: da rimuovere, solo per test
    const descrizione = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac eleifend lacus." +
        " In sed interdum augue. Aliquam lacinia lectus pulvinar lacus feugiat commodo. Praesent suscipit quam a" +
        " ipsum luctus congue. Sed quis nibh mauris. Vivamus massa elit, rhoncus a velit non, suscipit elementum sem." +
        " Sed commodo lacus nulla, non placerat libero gravida a. Orci varius natoque penatibus et magnis dis" +
        " parturient montes, nascetur ridiculus mus. Aliquam nec justo at felis posuere laoreet."

    const [listaStrutture] = useState([
        {id: "img_avatar2.png",
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

        {id: "img_avatar3.png", nome: "Struttura 2", descrizione: descrizione, servizi: []},
        {id: "img_avatar2.png", nome: "Struttura 3", descrizione: descrizione, servizi: []}
    ])

    return (
        <React.Fragment>
            <FormRicerca />
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        {
                            listaStrutture.map((struttura, indice) => {
                                return <RisultatoRicerca key={indice} idStruttura={struttura.id} nomeStruttura={struttura.nome} descrizioneStruttura={struttura.descrizione} servizi={struttura.servizi}/>
                            })
                        }
                        <Paginazione paginaAttuale={pagina} numPagine={20} setPagina={setPagina} />


                    </div>
                    <div className="col-4">
                        <Mappa />
                    </div>
                </div>
                </div>
        </React.Fragment>
    )
}

export default SchermataRisultati;