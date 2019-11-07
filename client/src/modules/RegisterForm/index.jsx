import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

import "../styles/Form.css"

import {Block, Button} from "../../components";
import {getAccessToken} from "../AuthFunctions";
import {API_URL} from "../../config";

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        let login = "";
        let loginValid = this.validateLogin(login);
        let email = "";
        let emailValid = this.validateEmail(email);
        let password = "";
        let passwordValid = this.validatePassword(password);
        let confirmPassword = "";
        let confirmPasswordValid = this.validateConfirmPassword(confirmPassword);

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onConfrimPasswordChange = this.onConfrimPasswordChange.bind(this);

        this.state = {
            email: email,
            login: login,
            password: password,
            confirmPassword: confirmPassword,
            loginValid: loginValid,
            emailValid: emailValid,
            passwordValid: passwordValid,
            confirmPasswordValid: confirmPasswordValid,

            redirect: false,
            errors: {},
        };
    }

    validateLogin = login => (login.length >= 4);
    validateEmail = email => (email.indexOf("@") !== -1);
    validatePassword = password => (password.length >= 8);
    validateConfirmPassword = (password,confirmPasswordPassword) => (
        password === confirmPasswordPassword && this.validatePassword(password)
    );

    onLoginChange = (event) => {
        let val = event.target.value;
        let valid = this.validateLogin(val);
        this.setState({login: val, loginValid: valid});
    };
    onEmailChange = (event) => {
        let val = event.target.value;
        let valid = this.validateEmail(val);
        this.setState({email: val, emailValid: valid});
    };
    onPasswordChange = (event) =>  {
        let val = event.target.value;
        let valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
    };
    onConfrimPasswordChange = (event) => {
        let val = event.target.value;
        let valid = this.validateConfirmPassword(val, this.state.password);
        this.setState({confirmPassword: val, confirmPasswordValid: valid});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.passwordValid && this.state.loginValid && this.state.emailValid && this.state.confirmPasswordValid) {

            const email = encodeURIComponent(this.state.email);
            const login = encodeURIComponent(this.state.login);
            const password = encodeURIComponent(this.state.password);
            const data = `email=${email}&login=${login}&password=${password}`;

            axios.post(`${API_URL}/user/registration`, data)
                .then((response) => {
                    if (response.status === 200)
                        this.setState({redirect: true});
                })
                .catch((error) => {
                    const errors = error.response.data.errors ? error.response.data.errors : {};
                    this.setState({errors});
                    if(this.state.errors.login)
                        this.setState({
                            login: "",
                            loginValid: false,
                        });
                    if(this.state.errors.email)
                        this.setState({
                            email: "",
                            emailValid: false,
                        });
                    if(this.state.errors.password)
                        this.setState({
                            password: "",
                            confirmPassword: "",
                            passwordValid: false,
                            confirmPasswordValid: false,
                        });

        })
        }
    };

    render() {

        if (getAccessToken())
            return <Redirect to="/"/>;
        const redirect = this.state.redirect;
        if(redirect)
            return <Redirect to="/login"/>;

        let errors = {
            loginError: "",
            emailError: "",
            passwordError: "",
        };

        if(this.state.errors.login)
            errors.loginError = this.state.errors.login;
        if(this.state.errors.email)
            errors.emailError = this.state.errors.email;
        if(this.state.errors.password)
            errors.passwordError = this.state.errors.password;

        let loginColor = this.state.loginValid ? "green" : "red";
        let emailColor = this.state.emailValid ? "green" : "red";
        let passwordColor = this.state.passwordValid ? "green" : "red";
        let confirmPasswordColor = this.state.confirmPasswordValid ? "green" : "red";

        return (
            <form onSubmit={this.handleSubmit} className="authForm">
                <div className="authBlock">
                    <div className="authContent">
                        <h1>Регистрация аккаунта</h1>
                        <Block>
                            <input type="text" className="authFormElem" placeholder="Login" value={this.state.login}
                                   onChange={this.onLoginChange} style={{borderColor: loginColor}}/>
                            <p className="error">{errors.loginError}</p>
                            <input type="text" className="authFormElem" placeholder="E-mail" value={this.state.email}
                                   onChange={this.onEmailChange} style={{borderColor: emailColor}}/>
                            <p className="error">{errors.emailError}</p>
                            <input type="password" className="authFormElem" placeholder="Password" value={this.state.password}
                                   onChange={this.onPasswordChange} style={{borderColor: passwordColor}}/>
                            <p className="error">{errors.passwordError}</p>
                            <input type="password" className="authFormElem" placeholder="Confirm Password" value={this.state.confirmPassword}
                                   onChange={this.onConfrimPasswordChange} style={{borderColor: confirmPasswordColor}}/>
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