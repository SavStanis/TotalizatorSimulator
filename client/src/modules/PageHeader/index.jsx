import React from 'react';
import './PageHeader.css'
import {deleteAccessToken, deleteRefreshToken, getAccessToken} from "../AuthFunctions";
import {Link} from "react-router-dom";

const PageHeader = (props) => {

    if(props.type === "auth") {
           return (
            <div className="pageHeader">
                <Link className="pageHeaderText" to="/">Totalizator Simulator</Link>
            </div>
        );
    }

    if(getAccessToken()) {
        const logOutHandler = () => {
          deleteAccessToken();
          deleteRefreshToken();
        };
        return (
            <div className="pageHeader">
                <div className="pageHeaderText">Totalizator Simulator</div>
                <Link className="signUp" onClick={logOutHandler} to="/">Sign out</Link>
            </div>
        )
    }
    return (
        <div className="pageHeader">
            <div className="pageHeaderText">Totalizator Simulator</div>
            <Link class="signIn" to="/login">Sign in</Link>
            <Link class="signUp" to="/registration">Sign up</Link>
        </div>
    );
};

export default PageHeader;
