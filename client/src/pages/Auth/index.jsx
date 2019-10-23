import React from 'react';
import "./Auth.css";
import {LoginForm, RegisterForm} from "../../modules";
import { Route } from "react-router-dom";

const Auth = () => (
    <div className="auth">
        <Route exact path={["/","/login"]} component={LoginForm}/>
        <Route exact path={"/register"} component={RegisterForm}/>
    </div>
);

export default Auth;
