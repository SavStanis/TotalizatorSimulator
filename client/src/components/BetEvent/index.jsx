import React from 'react';
import './BetEvent.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import {checkToken, deleteAccessToken, deleteRefreshToken, getAccessToken} from "../../modules/AuthFunctions";
import {API_URL} from "../../config";

class BetEvent extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            eventID: this.props.eventID,
        }
    }

    onFinishClick = async (event) => {
        event.preventDefault();
        const answerNumber = event.currentTarget.name;

        const data = {
            eventID: this.state.eventID,
            answerNumber: answerNumber
        };
        console.log(data);

        if(await checkToken()) {
            let headerAuth = "Bearer " + getAccessToken();

            try {
                await axios.delete(`${API_URL}/event/finish`,
                    {
                        headers: {Authorization: headerAuth},
                        data: data
                    }
                );
            } catch(error)  {
                console.log(error);
                deleteAccessToken();
                deleteRefreshToken();
                localStorage.removeItem('login');
                localStorage.removeItem('email');
                localStorage.removeItem('admin');
            }
        }
        window.location.reload();
    };
    render() {
        let Header = () => (<div className="betHeader">{this.props.date}</div>);

        if(localStorage.getItem('admin') === "true") {
            Header = () => (
                <div className="betHeader">
                    <input type="button" className="finishButton" name="1" onClick={this.onFinishClick} value="Finish with 1) answer"/>
                    <input type="button" className="finishButton" name="2" onClick={this.onFinishClick} value="Finish with 2) answer"/>
                    <div>{this.props.date}</div>
                </div>
            )

        }
        return (
            <div className="betEvent">
                <Header/>
                <div className="questionLabel">{this.props.question}</div>
                <div className="betEventInfo">
                    <div className="infoRow">
                        <div className="betEventLabel">Answer</div>
                        <div className="betEventLabel">Coefficient</div>
                    </div>
                    <div className="infoRow" id="answerInfo">
                        <div className="betEventLabel">1) {this.props.answer1}</div>
                        <div className="betEventLabel">{this.props.coefficient1}</div>
                    </div>
                    <div className="infoRow" id="answerInfo">
                        <div className="betEventLabel">2) {this.props.answer2}</div>
                        <div className="betEventLabel">{this.props.coefficient2}</div>
                    </div>
                </div>
                <Link className="betEventLink" to={`/make-a-bet/${this.state.eventID}`}>Make a bet</Link>
            </div>
        )
    };
}

export default BetEvent;