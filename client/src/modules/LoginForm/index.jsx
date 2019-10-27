import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "../styles/Form.css"
import {Block, Button} from "../../components";

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
    }

    render() {
        let emailColor = this.state.emailValid ? "green" : "red";
        let passwordColor = this.state.passwordValid ? "green" : "red";

        return (
            <form action="" className="authForm">
                <div className="authBlock">
                    <div className="authContent">
                        <h1>Войдите в аккаунт</h1>
                        <Block>
                            <input type="text" className="authFormElem" placeholder="Email" value={this.state.email}
                                   onChange={this.onEmailChange} style={{borderColor: emailColor}}/>
                            <p/>
                            <input type="password" className="authFormElem" placeholder="Password" value={this.state.password}
                                   onChange={this.onPasswordChange} style={{borderColor: passwordColor}}/>
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