import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../styles/Form.css';
import './CreateEventForm.css';

import {Button} from "../../components";
import {checkToken, deleteAccessToken, deleteRefreshToken, getAccessToken} from "../AuthFunctions";
import {API_URL} from "../../config";

export default class CreateEventForm extends React.Component {
    constructor(props) {
        super(props);
        let question = "";
        let questionValid = false;
        let answer1 = "";
        let answer1Valid = false;
        let answer2 = "";
        let answer2Valid = false;

        this.state = {
            question: question,
            questionValid: questionValid,
            answer1: answer1,
            answer1Valid: answer1Valid,
            answer2: answer2,
            answer2Valid: answer2Valid,

            redirect: false,
        };
    }

    validateField = field => (field.length >= 1);

    onQuestionChange = (event) => {
        let val = event.target.value;
        let valid = this.validateField(val);
        this.setState({question: val, questionValid: valid});
    };
    onAnswer1Change = (event) => {
        let val = event.target.value;
        let valid = this.validateField(val);
        this.setState({answer1: val, answer1Valid: valid});
    };
    onAnswer2Change = (event) =>  {
        let val = event.target.value;
        let valid = this.validateField(val);
        this.setState({answer2: val, answer2Valid: valid});
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if(this.state.questionValid && this.state.answer1Valid && this.state.answer2Valid) {
            const data = {
                question: this.state.question,
                answer1: this.state.answer1,
                answer2: this.state.answer2,
            };
            if(await checkToken()) {
                let headerAuth = "Bearer " + getAccessToken();

                try {
                    const response = await axios.post(`${API_URL}/event/create`, data,
                        {headers: {Authorization: headerAuth}}
                    );
                    if (response.status === 200)
                        this.setState({redirect: true});
                } catch(error) {
                    deleteAccessToken();
                    deleteRefreshToken();
                    localStorage.removeItem('login');
                    localStorage.removeItem('email');
                    localStorage.removeItem('admin');
                    this.setState({redirect: true});
                    }
            }
        }
    };

    render() {

        const redirect = this.state.redirect;
        if(redirect)
            return <Redirect to="/"/>;

        let questionColor = this.state.questionValid ? "green" : "red";
        let answer1Color = this.state.answer1Valid ? "green" : "red";
        let answer2Color = this.state.answer2Valid ? "green" : "red";

        return (
            <div className="authContent">
                <h1>Создать событие</h1>
                <form onSubmit={this.handleSubmit} className="createEventForm">
                    <input type="text" className="formTextBox" id="createEventTextBox" placeholder="Question" value={this.state.question}
                           onChange={this.onQuestionChange} style={{borderColor: questionColor}}/>
                    <input type="text" className="formTextBox" id="createEventTextBox" placeholder="First answer" value={this.state.answer1}
                           onChange={this.onAnswer1Change} style={{borderColor: answer1Color}}/>
                    <input type="text" className="formTextBox" placeholder="Second answer" value={this.state.answer2}
                           onChange={this.onAnswer2Change}  id="createEventTextBox" style={{borderColor: answer2Color}}/>
                    <div className="submitButton">
                        <Button>Создать</Button>
                    </div>
                </form>
            </div>
        );
    }
}