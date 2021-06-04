import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Opportunity from './pages/Opportunity';
import LoginCompany from './pages/LoginCompany';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginCompany}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/opportunity" component={Opportunity}/>
                <Route path="/loginCompany" component={Login}/>
            </Switch>
        </BrowserRouter>
    );
}