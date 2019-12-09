import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

import "../styles/Form.css"
import {Button} from "../../components";
import {getAccessToken, setAccessToken, setRefreshToken} from "../AuthFunctions";
import {API_URL} from "../../config";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        let email = "";
        let emailValid = this.validateEmail(email);
        let password = "";
        let passwordValid = this.validatePassword(password);

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.state = {
            email: email,
            password: password,
            emailValid: emailValid,
            passwordValid: passwordValid,
            redirect: false,

            errors: {},
        };
    }

    validateEmail = email => (email.indexOf("@") !== -1);
    validatePassword = password => (password.length >=8);

    onEmailChange = (event) => {
        let val = event.target.value;
        let valid = this.validateEmail(val);
        this.setState({email: val, emailValid: valid});
    };
    onPasswordChange = (event) => {
        let val = event.target.value;
        let valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if(this.state.emailValid && this.state.passwordValid) {
            const data = {
              email: this.state.email,
              password: this.state.password
            };

            try {
                const response =  await axios.post(`${API_URL}/user/login`, data);
                if(response.status === 200) {
                    setAccessToken(response.data.accessToken);
                    setRefreshToken(response.data.refreshToken);
                    localStorage.setItem('login', response.data.login);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('admin', response.data.admin);
                    this.setState({redirect: true});
                }
            }catch(error) {
                const errors = error.response.data.errors ? error.response.data.errors : {};
                this.setState({errors});
                if (this.state.errors.email) {
                    this.setState({
                            email: "",
                            password: "",
                            emailValid: false,
                            passwordValid: false,
                        }
                    )
                }
                if (this.state.errors.password) {
                    this.setState({
                            password: "",
                            passwordValid: false,
                        }
                    )
                }
            }
        }
    };

    render() {

        if(getAccessToken() || this.state.redirect) {
           return <Redirect to="/"/>;
        }

        let emailColor = this.state.emailValid ? "green" : "red";
        let passwordColor = this.state.passwordValid ? "green" : "red";

        return (
            <div className="authContent">
                <h1>Войдите в аккаунт</h1>
                <form onSubmit={this.handleSubmit} action="" className="authForm">
                    <input type="text" className="formTextBox" placeholder="Email" value={this.state.email}
                           onChange={this.onEmailChange} style={{borderColor: emailColor}}/>
                    <p className="error">{this.state.errors.email}</p>
                    <input type="password" className="formTextBox" placeholder="Password" value={this.state.password}
                           onChange={this.onPasswordChange} style={{borderColor: passwordColor}}/>
                    <p className="error">{this.state.errors.password}</p>
                    <div className="submitButton">
                        <Button>Войти</Button>
                    </div>
                    <Link className="authLink" to="/registration">Зарегистрироваться</Link>
                </form>
            </div>
        );
    }
}

export default LoginForm;