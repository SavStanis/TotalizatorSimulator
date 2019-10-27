import React from 'react';
import {Route} from 'react-router-dom';
import {MainPageHeader} from "../../modules";
import "./Main.css";

const Main = () => {
    return (
        <div className="MainPage">
            <MainPageHeader />
        </div>
    );
};

export default Main;