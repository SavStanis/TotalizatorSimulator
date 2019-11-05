import React from 'react';
import './MainPageHeader.css'
import {deleteAccessToken, deleteRefreshToken, getAccessToken} from "../AuthFunctions";
import {Link} from "react-router-dom";

class MainWindowHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(getAccessToken()) {
            const logOutHandler = () => {
              deleteAccessToken();
              deleteRefreshToken();
            };
            return (
            <div>
                <div className="mainPageHeader">
                    <div className="mainPageHeaderText">Totalizator Simulator</div>
                    <ul className="headerContent">
                        <li className="signOut"><Link onClick={logOutHandler} to="/">Sign out</Link></li>
                    </ul>
                </div>
            </div>
            )
        }
        return (
            <div>
                <div className="mainPageHeader">
                    <div className="mainPageHeaderText">Totalizator Simulator</div>
                    <ul className="headerContent">
                        <li className="signIn"><Link to="/login">Sign in</Link></li>
                        <li className="signUp"><Link to="/registration">Sing up</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MainWindowHeader;
