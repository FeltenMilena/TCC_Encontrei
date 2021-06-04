import React from 'react';
import './App.css';
import apiVLibras from './services/apiVLibras';
//import Dashboard from './pages/Dashboard/index';

import logo from './assets/encontrei.svg';

import Routes from './routes';
import { Component } from 'react';

class App extends Component {

  state = {
    vlibras: [],
  }

  async componentDidMount(){
    const response = await apiVLibras.get('');

    console.log(response.data);

  }

  render (){
    return(
    <div className="container">




      <img src={logo} alt="Encontrei"/>
      <div className="encontrei">
        <p>
          <strong>Encontrei !</strong>
        </p>
      </div>
      <div className="content">
        <Routes />
      </div>
    </div>
  )};
}

export default App;
