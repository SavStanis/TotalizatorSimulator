import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

import "./RegisterForm.css"
import {Block, Button} from "../../components";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        let login = "";
        let loginValid = this.validateLogin(login);
        let password = "";
        let passwordValid = this.validatePassword(password);

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.state = {
            login: login,
            password: password,
            loginValid: loginValid,
            passwordValid: passwordValid,
        };
    }

    validateLogin(login) {
        return login.length >= 4;
    }
    validatePassword(password) {
        return password.length >=8;
    }

    onLoginChange(e) {
        let val = e.target.value;
        let valid = this.validateLogin(val);
        this.setState({login: val, loginValid: valid});
    }
    onPasswordChange(e) {
        let val = e.target.value;
        let valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
    }

    render() {
        let loginColor = this.state.loginValid ? "green" : "red";
        let passwordColor = this.state.passwordValid ? "green" : "red";

        return (
            <form action="" className="authForm">
                <div className="header">
                    <div className="headerText">Totalizator Simulator</div>
                </div>
                <div className="authBlock">
                    <div className="authContent">
                        <h1>Регистрация аккаунта</h1>
                        <Block>
                            <input type="text" className="authFormElem" placeholder="Login" value={this.state.login}
                                   onChange={this.onLoginChange} style={{borderColor: loginColor}}/>
                            <p></p>
                            <input type="password" className="authFormElem" placeholder="Password" value={this.state.password}
                                   onChange={this.onPasswordChange} style={{borderColor: passwordColor}}/>
                            <div className="submitButton">
                                <Button>Зарегистрироваться</Button>
                            </div>
                            <Link className="regLink" to="/login">Войти в аккаунт</Link>
                        </Block>
                    </div>
                </div>
            </form>
        );
    }
}

export default RegisterForm;