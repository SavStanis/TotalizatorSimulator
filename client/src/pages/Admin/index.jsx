import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {CreateEventForm, PageHeader} from "../../modules";
import {AdminLinks} from "../../modules";

const Admin = () => {
    return (
        <div className="admin">
            <PageHeader type="blank"/>
            <Switch>
                <Route  exact path="/admin" component={AdminLinks}/>
                <Route  exact path="/admin/events/new" component={CreateEventForm}/>
            </Switch>
        </div>
    );
};

export default Admin;