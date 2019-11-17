import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

import {API_URL} from '../../config';
import {getAccessToken, checkToken, deleteAccessToken, deleteRefreshToken} from '../AuthFunctions';
import './UserInfo.css';

class UserInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
            moneyAmount: "",

            redirectToLogin: false,
        }
    };

    async componentDidMount() {
        if(await checkToken()){
            let headerAuth = "Bearer " + getAccessToken();
            await axios.get(
                `${API_URL}/user/get-info`,
                {headers: {Authorization: headerAuth}}
                ).then((response) => {
                    if(response.status === 200) {
                        this.setState({
                            login: response.data.login,
                            email: response.data.email,
                            moneyAmount: response.data.moneyAmount
                        });
                    }
                }).catch((error) => {
                this.setState({redirectToLogin: true});
                deleteAccessToken();
                deleteRefreshToken();
                localStorage.removeItem('login');
                localStorage.removeItem('email');
                localStorage.removeItem('moneyAmount');
            })
        }else {
            this.setState({redirectToLogin: true});
        }
    }

    render() {

        if(this.state.redirectToLogin) {
            return (
                <Redirect to="/login"/>
            )
        }

        return(
        <div className="userInfo">
            <h1>{this.state.login}</h1>
            <div className="userContainer">
                <div className="labelContainer">
                    <div className="infoLabel">Email: {this.state.email}</div>
                    <div className="infoLabel">Ballance: {this.state.moneyAmount}</div>
                </div>
                <div className="infoButtons">
                    <Link className="infoLink" to="/user/replenishment">Пополнить счёт</Link>
                    <Link className="infoLink" to="">Поменять пароль</Link>
                </div>
            </div>
        </div>
        )
    }
}

export default UserInfo;