import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';
import VerificaCode from "./components/common/VerificaCode";
import ComponseDemo from "./components/demo/ComponseDemo";

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/money/all" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="/demo" component={ComponseDemo}/>
            <Route component={NotFound} />
        </Switch>
    </Router>
)