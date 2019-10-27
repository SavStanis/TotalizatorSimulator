import React from 'react';
import './MainPageHeader.css'
import {checkToken} from "../AuthFunctions";
import {Link} from "react-router-dom";

class MainWindowHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLiggedIn: false,
        }
    }
    render() {
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
