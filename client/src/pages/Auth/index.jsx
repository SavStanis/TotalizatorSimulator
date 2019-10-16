import React from 'react';
import "./Auth.css";
import { Block, Button } from "../../components";

const Auth = () => (
    <div className="auth">
        <div className="header">
            <div className="headerText">Totalizator Simulator</div>
        </div>
        <div className="authBlock">
            <div className="authContent">
                <h1>Войдите в аккаунт</h1>
                <Block>
                    <Button>Войти</Button>
                </Block>
            </div>
        </div>
    </div>
);

export default Auth;
