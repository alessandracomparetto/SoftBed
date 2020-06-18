import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";

function App() {

    return (
        <React.Fragment>
            <Navbar />
            <div className="w100">
                <Login/>
            </div>
        </React.Fragment>
    )
}

export default App;