import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {PageHeader} from '../../modules';
import {BetEvents} from '../../modules';
import BetForm from "../../modules/BetForm";

class Main extends React.Component {


    render() {
        return (
        <div className="MainPage">
            <PageHeader/>
            <Switch>
              <Route exact path={"/"} component={BetEvents}/>
              <Route path={"/events/:eventID"} component={BetForm}/>
            </Switch>
        </div>
    );}
}

export default Main;