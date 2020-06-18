import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar";
import FormDatiAggiuntivi from "./Components/FormDatiAggiuntivi";
import FormDatiOspite from "./Components/FormDatiOspite";
import SchermataDatoPagamento from "./Components/SchermataDatoPagamento";
import Login from "./Components/Login";
import Registration from "./Components/Registration";

function App() {

    return (
        <React.Fragment>
            <Navbar />
            <FormDatiOspite/>
        </React.Fragment>
    )
}

export default App;