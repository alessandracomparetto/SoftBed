import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar";
import FormRicerca from "./Components/FormRicerca";

function App() {

    return (
        <React.Fragment>
            <Navbar />
            <div className="w100 bg-secondary">
                <FormRicerca />
            </div>
        </React.Fragment>
    )
}

export default App;