import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar";
import FormRicerca from "./Components/FormRicerca";

function App() {

    return (
        <React.Fragment>
            <Navbar />
            <div className="w100">
                <FormRicerca />
            </div>
        </React.Fragment>
    )
}

export default App;