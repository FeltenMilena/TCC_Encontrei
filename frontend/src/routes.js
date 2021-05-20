import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';
import Opportunity from './pages/Opportunity';
import LoginCompany from './pages/LoginCompany';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/new" component={New}/>
                <Route path="/opportunity" component={Opportunity}/>
                <Route path="/loginCompany" component={LoginCompany}/>
            </Switch>
        </BrowserRouter>
    );
}