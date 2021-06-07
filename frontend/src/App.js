import React, { Component } from 'react';
import './App.css';
//import Dashboard from './pages/Dashboard/index';

import logo from './assets/encontrei.svg';

import Routes from './routes';

class App extends Component {

  constructor(props) {
    super(props);
    this.widgetSrc = "https://vlibras.gov.br/app";
    this.scriptSrc = "https://vlibras.gov.br/app/vlibras-plugin.js";
  }

  init() {
    this.script = document.createElement("script");
    this.script.src = this.scriptSrc;
    this.script.async = true;
    this.script.onload = (load) => {
      new window.VLibras.Widget(this.widgetSrc);
    };
    document.head.appendChild(this.script);
  }

  componentDidMount() {
    this.init();
  }

  render (){
    return(
    <div className="container">
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
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
