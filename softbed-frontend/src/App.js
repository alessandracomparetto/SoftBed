import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: [] }
    }

    callAPI() {
        fetch("/test")
            .then(res => res.json())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        console.log(this.state.apiResponse);

        return (
            <div className="App">
            </div>
        );
    }
}

export default App;