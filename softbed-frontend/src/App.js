import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar";
import FormDatiAggiuntivi from "./Components/FormDatiAggiuntivi";

function App() {

    return (
        <React.Fragment>
            <Navbar />
            <FormDatiAggiuntivi />
        </React.Fragment>
    )
}

export default App;