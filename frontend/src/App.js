import React from 'react';
import './App.css';
//import Dashboard from './pages/Dashboard/index';

import logo from './assets/encontrei.svg';

import Routes from './routes';

function App() {

  return (
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
  );
}

export default App;
