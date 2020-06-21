import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './App.css';
import Navbar from "./Components/Navbar";
import FormRicerca from "./Components/FormRicerca";
import Carousel from "./Components/Carousel";
import PaginaNonTrovata from "./Components/PaginaNonTrovata";
import SchermataRisultati from "./Components/SchermataRisultati";
import CaricamentoFoto from "./Components/CaricamentoFoto";
import Registration from "./Components/Registration";
import FormStruttura from "./Components/FormStruttura";

function App() {

    return (
        <Registration/>
    )
}

export default App;