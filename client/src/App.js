import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import  { Auth, Main } from "./pages";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Switch>
                    <Route exact path={"/"} component={Main}/>
                    <Route path={["/login", "/registration"]} component={Auth}/>
                </Switch>
            </div>
    );
    }
}
export default App;
