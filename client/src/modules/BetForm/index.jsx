import React from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import {checkToken, getAccessToken} from "../../modules/AuthFunctions";
import {API_URL} from "../../config";
import {Button} from "../../components";
import './BetForm.css';

class BetForm extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            answer1: "",
            answer2: "",
            coefficient1: "",
            coefficient2: "",
            date: "",

            eventID: this.props.match.params.eventID,

            betAmount: "",
            betAmountValid: false,
            answerNumber: 0,
            answerNumberValid: false,
            redirect: false,

            error: "",
        };
    }

    async componentDidMount() {
        const headerAuth = 'Bearer ' + getAccessToken();

        if(await checkToken()) {
            try {
                const response = await axios.get(`${API_URL}/event/get-by-id`,
                    {
                        headers: {Authorization: headerAuth},
                        params: {eventID: this.props.match.params.eventID}
                    },);
                this.setState({
                    question: response.data.question,
                    answer1: response.data.answer1,
                    answer2: response.data.answer2,
                    coefficient1: response.data.coefficient1,
                    coefficient2: response.data.coefficient2,
                    date: response.data.date,
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    radioButtonHandler = (event) => {
        const value = event.currentTarget.value;
        this.setState({
            answerNumber: value,
            answerNumberValid: true,
        });
    };

    onBetAmountChange = (event) => {
        const value = event.target.value;
        if(value > 0) {
            this.setState({
                betAmount: value,
                betAmountValid: true,
            })
        } else {
            this.setState({
                betAmount: value,
                betAmountValid: false,
            })
        }
    };

    onSubmit = async (event) => {
        event.preventDefault();

        if(this.state.betAmountValid && this.state.answerNumberValid) {
            const headerAuth = 'Bearer ' + getAccessToken();

            const data = {
                eventID: this.state.eventID,
                answerNumber: this.state.answerNumber,
                betAmount: this.state.betAmount
            };
            if(await checkToken()) {
                try {
                    const response = await axios.post(`${API_URL}/bet/make-a-bet`,
                        data,
                        { headers: {Authorization: headerAuth}});
                    if(response.status === 200) {
                        this.setState({redirect: true});
                    }
                } catch (error) {
                    console.log("heeeeee");
                    this.setState({
                        error: error.response.data.message,
                        betAmount: "",
                        betAmountValid: false
                    });
                }
            }
        }
    };

    render() {
        if(!getAccessToken()) {
            this.setState({redirect:true});
        }

        if(this.state.redirect) {
            return <Redirect to="/login"/>
        }

        let betAmountBorderColor = (this.state.betAmountValid) ? "green" : "red";

        return (
            <div className="betModule">
                <Link className="betLink" to="/">Return</Link>
                <form className="betForm" onSubmit={this.onSubmit}>
                    <div className="betHeader">{this.state.date}</div>
                    <div className="questionLabel">{this.state.question}</div>
                    <div className="betEventInfo">
                        <div className="infoRow">
                            <div className="betLabel">Answer</div>
                            <div className="betLabel">Coefficient</div>
                        </div>
                        <div className="infoRow" id="answerInfo">
                            <div className="betLabel">
                                <input name="answer" type="radio" value="1" onChange={this.radioButtonHandler}/>
                                {this.state.answer1}
                            </div>
                            <div className="betLabel">{this.state.coefficient1}</div>
                        </div>
                        <div className="infoRow" id="answerInfo">
                            <div className="betLabel">
                                <input name="answer" type="radio" value="2" onChange={this.radioButtonHandler}/>
                                {this.state.answer2}
                            </div>
                            <div className="betLabel">{this.state.coefficient2}</div>
                        </div>
                    </div>
                    <input
                        type="number"
                        className="betFormInput"
                        placeholder="Input bet amount"
                        style={{borderColor: betAmountBorderColor}}
                        onChange={this.onBetAmountChange}
                        value={this.state.betAmount}
                    />
                    <p>{this.state.error}</p>
                    <Button>Make a bet</Button>
                </form>
            </div>
        )
    };
}

export default BetForm;