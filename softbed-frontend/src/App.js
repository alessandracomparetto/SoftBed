import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css';
import Navbar from "./Components/Navbar";
import FormRicerca from "./Components/FormRicerca";
import Carousel from "./Components/Carousel";
import RisultatoRicerca from "./Components/RisultatoRicerca";
import Paginazione from "./Components/Paginazione";
import FormDatiAggiuntivi from "./Components/FormDatiAggiuntivi";
import Registration from "./Components/Registration";
import FormDatiOspite from "./Components/FormDatiOspite";
import SchermataDatoPagamento from "./Components/SchermataDatoPagamento";

function App() {



    // TODO: da rimuovere, solo per test

    return (
        <SchermataDatoPagamento/>
    )
}

export default App;