import React, {Component} from 'react';
import axios from 'axios';

import {Button} from "../../components";
import './Replenishment.css'
import {checkToken, getAccessToken} from "../AuthFunctions";
import {API_URL} from "../../config";
import {Redirect} from "react-router";

class Replenishment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            amountValid: false,
            redirect: false,
        }
    }

    validateAmount = (amount) => (amount > 0);

    onAmountChange = (event) => {
        let val = event.target.value;
        let valid = this.validateAmount(val);
        this.setState({amount: val, amountValid: valid})
    };

    onSubmit = async (event) => {
        event.preventDefault();

        if(this.state.amountValid) {
            const data = {moneyAmount: this.state.amount};
            if(await checkToken()){
                let headerAuth = "Bearer " + getAccessToken();
                await axios.post(
                    `${API_URL}/user/balance-replenishment`, data,
                    {headers: {Authorization: headerAuth}}
                ).then().catch();
            }else {
                this.setState({redirectToLogin: true});
            }
            this.setState({redirect: true});
        }
    };

    render() {
        let amountColor = (this.state.amountValid) ? "green" : "red";

        if(this.state.redirect) {
            return (
              <Redirect to="/user"/>
            );
        }

        return (
            <div className="replBlock">
                <h1>Введите нужную сумму</h1>
                <form className="replForm" onSubmit={this.onSubmit}>
                    <input type="number" className="replFormElem" onChange={this.onAmountChange} value={this.state.amount}
                           style={{borderColor: amountColor}}/>
                    <Button>Пополнить</Button>
                </form>
            </div>
        );
    }
}


export default Replenishment;