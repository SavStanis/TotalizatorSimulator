import React from 'react';
import {Route, Switch} from "react-router-dom";
import {LoginForm, RegisterForm, PageHeader} from "../../modules";

const Auth = () => (
    <div className="auth">
        <PageHeader type="blank"/>
        <Switch>
            <Route  path="/login" component={LoginForm}/>
            <Route  path="/registration" component={RegisterForm}/>
        </Switch>
    </div>
);

export default Auth;
