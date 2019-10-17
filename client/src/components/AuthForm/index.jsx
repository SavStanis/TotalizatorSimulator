import React, {Component} from 'react';
import "./AuthForm.css"
import {Block, Button} from "../index";

class AuthForm extends Component {
    constructor(props) {
        super(props);
        let login = props.login;
        let loginValid = this.validateLogin(login);
        let password = props.pswd;
        let passwordValid = this.validatePassword(password);

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPaswdordChange = this.onPaswdordChange.bind(this);

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
    onPaswdordChange(e) {
        let val = e.target.value;
        let valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
    }

    render() {
        let loginColor = this.state.loginValid ? "green" : "red";
        let passwordColor = this.state.passwordValid ? "green" : "red";

        return (
            <form action="" className="authForm">
                <input type="text" className="authFormElem" placeholder="Login" value={this.state.login}
                       onChange={this.onLoginChange} style={{borderColor: loginColor}}/>
                <p></p>
                <input type="password" className="authFormElem" placeholder="Password" value={this.state.password}
                       onChange={this.onPaswdordChange} style={{borderColor: passwordColor}}/>
               <div className="submitButton">
                    <Button>Войти</Button>
               </div>
            </form>
        );
    }
}

export default AuthForm;