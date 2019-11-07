import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

import "../styles/Form.css"
import {Block, Button} from "../../components";
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

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.emailValid && this.state.passwordValid) {
            const email = encodeURIComponent(this.state.email);
            const password = encodeURIComponent(this.state.password);
            const data = `email=${email}&password=${password}`;
            axios.post(`${API_URL}/user/login`, data)
                .then(response => {
                    if(response.status === 200) {
                       setAccessToken(response.data.accessToken);
                       setRefreshToken(response.data.refreshToken);
                       this.setState({redirect: true});
                    }
                })
                .catch(error => {
                    const errors = error.response.data.errors ? error.response.data.errors : {};
                    this.setState({errors});
                    if (this.state.errors) {
                        this.setState({
                                email: "",
                                password: "",
                                emailValid: false,
                                passwordValid: false,
                            }
                        )
                    }
                })
        }
    };

    render() {

        let error = "";

        if(getAccessToken() || this.state.redirect) {
           return <Redirect to="/"/>;
        }

        if(this.state.errors)
        {
            error = this.state.errors.message;
        }
        let emailColor = this.state.emailValid ? "green" : "red";
        let passwordColor = this.state.passwordValid ? "green" : "red";

        return (
            <form onSubmit={this.handleSubmit} action="" className="authForm">
                <div className="authBlock">
                    <div className="authContent">
                        <h1>Войдите в аккаунт</h1>
                        <Block>
                            <input type="text" className="authFormElem" placeholder="Email" value={this.state.email}
                                   onChange={this.onEmailChange} style={{borderColor: emailColor}}/>
                            <p/>
                            <input type="password" className="authFormElem" placeholder="Password" value={this.state.password}
                                   onChange={this.onPasswordChange} style={{borderColor: passwordColor}}/>
                            <p className="error">{error}</p>
                            <div className="submitButton">
                                <Button>Войти</Button>
                            </div>
                            <Link className="regLink" to="/registration">Зарегистрироваться</Link>
                        </Block>
                    </div>
                </div>
            </form>
        );
    }
}

export default LoginForm;