import React from 'react';
import "./Auth.css";
import {LoginForm, RegisterForm} from "../../modules";
import {Link,Route, Switch} from "react-router-dom";

const Auth = () => (
    <div className="auth">
        <div className="header"/>
        <Switch>
            <Route exact path={"/login"} component={LoginForm}/>
            <Route exact path={"/registration"} component={RegisterForm}/>
        </Switch>
        <Link className="headerText" to="/">Totalizator Simulator</Link>
    </div>
);

export default Auth;
