import React, {Component} from 'react';
import axios from 'axios';

import "./Messages.css";
import {checkToken, getAccessToken} from "../AuthFunctions";
import {API_URL} from "../../config";
import {Link} from "react-router-dom";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: []
        }
    }

    async componentDidMount() {
        if (await checkToken()) {
            const authHeader = "Bearer " + getAccessToken();
            try {
                const response = await axios.get(`${API_URL}/user/messages`, { headers: {Authorization: authHeader}});
                if(response.status === 200) {
                    this.setState({messageList: response.data});
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        return (
            <div className="messageList">
                <Link to="/user" className="returnLink">Return</Link>
                {
                    this.state.messageList.map((message, i) => {
                        return (
                            <div className="message" id={"message_" + i}>
                                <div className="messageHeader">{message.date}</div>
                                <div className="mainText">{message.mainText}</div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Messages;