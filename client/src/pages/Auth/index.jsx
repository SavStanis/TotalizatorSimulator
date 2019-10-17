import React from 'react';
import "./Auth.css";
import { Block, Button,AuthForm } from "../../components";
import { Link, Route } from "react-router-dom";

const Auth = () => (
    <div className="auth">
        <div className="header">
            <div className="headerText">Totalizator Simulator</div>
        </div>
        <div className="authBlock">
            <div className="authContent">
                <h1>Войдите в аккаунт</h1>
                <Block>
                    <AuthForm login="" pswd=""/>
                    <Link className="regLink" to="/register">Зарегистрироваться</Link>
                </Block>
            </div>
        </div>
    </div>
);

export default Auth;
