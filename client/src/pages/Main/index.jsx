import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {MainPageHeader} from "../../modules";
import "./Main.css";
import MainWindowHeader from "../../modules/MainPageHeader";

const Main = () => {
    return (
        <div className="MainPage">
            <MainWindowHeader/>
        </div>
    );
};

export default Main;