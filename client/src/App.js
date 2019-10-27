import React, { Component } from "react";
import {Route} from "react-router-dom";
import  { Auth, Main } from "./pages";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Route exact path={["/login", "/registration"]} component={Auth}/>
                <Route exact path={"/"} component={Main}/>
            </div>
    );
    }
}
export default App;
