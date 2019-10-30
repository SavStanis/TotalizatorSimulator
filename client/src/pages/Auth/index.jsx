import React from 'react';
import { Link, Route, Switch} from "react-router-dom";
import {LoginForm, RegisterForm} from "../../modules";
import "./Auth.css";

const Auth = () => (
    <div className="auth">
        <div className="header">
            <Link className="headerText" to="/">Totalizator Simulator</Link>
        </div>
        <Switch>
            <Route  path="/login" component={LoginForm}/>
            <Route  path="/registration" component={RegisterForm}/>
        </Switch>
    </div>
);

export default Auth;
