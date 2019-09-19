import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';
import VerificaCode from "./components/common/VerificaCode";
import ComponseDemo from "./components/demo/ComponseDemo";
import ReduxThunk from "./components/demo/ReduxThunk";
import ReduxActions from "./components/demo/ReduxActions";
import ReduxPromise from "./components/demo/ReduxPromise";

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/promise" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="/demo" component={ReduxActions}/>
            <Route path="/promise" component={ReduxPromise}/>
            <Route component={NotFound} />
        </Switch>
    </Router>
)