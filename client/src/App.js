import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import {Admin, Auth, Main, User} from "./pages";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Switch>
                    <Route exact path={"/"} component={Main}/>
                    <Route path={"/make-a-bet/:eventID"} component={Main}/>
                    <Route path={["/login", "/registration"]} component={Auth}/>
                    <Route path={"/user"} component={User}/>
                    <Route path={"/admin"} component={Admin}/>
                </Switch>
            </div>
      );
    }
}
export default App;
