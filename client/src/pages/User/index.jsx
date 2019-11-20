import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PageHeader, Replenishment, UserInfo} from "../../modules";

const User = () => {
    return (
        <div className="User">
            <PageHeader type="blank"/>
            <Switch>
                <Route  exact path="/user" component={UserInfo}/>
                <Route  exact path="/user/replenishment" component={Replenishment}/>
            </Switch>
        </div>
    );
};

export default User;