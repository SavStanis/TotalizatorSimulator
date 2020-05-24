import React from 'react';
import './PageHeader.css'
import {deleteAccessToken, deleteRefreshToken, getAccessToken} from "../AuthFunctions";
import {Link} from "react-router-dom";

const PageHeader = (props) => {

    if(props.type === "blank") {
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
          localStorage.removeItem('login');
          localStorage.removeItem('email');
          localStorage.removeItem('admin');
        };
        if(localStorage.getItem('admin') === "true") {
            return (
                <div className="pageHeader">
                    <div className="pageHeaderText">Totalizator Simulator</div>
                    <Link className="adminLink" to="/admin">Admin's page</Link>
                    <Link className="info" to="/user">{localStorage.getItem('login')}</Link>
                    <Link className="signOut" onClick={logOutHandler} to="/">Sign out</Link>
                </div>
            )
        }
        return (
            <div className="pageHeader">
                <div className="pageHeaderText">Totalizator Simulator</div>
                <Link className="info" to="/user">{localStorage.getItem('login')}</Link>
                <Link className="signOut" onClick={logOutHandler} to="/">Sign out</Link>
            </div>
        )
    }
    return (
        <div className="pageHeader">
            <div className="pageHeaderText">Totalizator Simulator</div>
            <Link class="signIn" to="/login">Sign in</Link>
            <Link class="signUp" to="/register">Sign up</Link>
        </div>
    );
};

export default PageHeader;
