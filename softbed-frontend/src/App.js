import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css';
import Navbar from "./Components/Navbar";
import FormRicerca from "./Components/FormRicerca";
import Carousel from "./Components/Carousel";
import RisultatoRicerca from "./Components/RisultatoRicerca";
import Paginazione from "./Components/Paginazione";

function App() {



    // TODO: da rimuovere, solo per test
    const descrizione = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac eleifend lacus." +
        " In sed interdum augue. Aliquam lacinia lectus pulvinar lacus feugiat commodo. Praesent suscipit quam a" +
        " ipsum luctus congue. Sed quis nibh mauris. Vivamus massa elit, rhoncus a velit non, suscipit elementum sem." +
        " Sed commodo lacus nulla, non placerat libero gravida a. Orci varius natoque penatibus et magnis dis" +
        " parturient montes, nascetur ridiculus mus. Aliquam nec justo at felis posuere laoreet."

    const [listaStrutture, setStrutture] = useState([
        {id: "img_avatar2.png", nome: "Struttura 1", descrizione: descrizione},
        {id: "img_avatar3.png", nome: "Struttura 2", descrizione: descrizione},
        {id: "img_avatar2.png", nome: "Struttura 3", descrizione: descrizione}
    ])

    return (
        <Router>
            <Navbar />

            <Route exact path="/">
                <Carousel />
                <FormRicerca />
            </Route>

            <Route path="/search">
                <FormRicerca />
                <div className="container">
                    {
                        listaStrutture.map((struttura, indice) => {
                            return <RisultatoRicerca key={indice} idStruttura={struttura.id} nomeStruttura={struttura.nome} descrizioneStruttura={struttura.descrizione} />
                        })
                    }
                    <Paginazione />
                </div>
            </Route>
        </Router>
    )
}

export default App;