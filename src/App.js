import React from "react"; // eslint-disable-line no-unused-vars
import "./App.css";
import "stream-chat-react/dist/css/index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Screens //
import Login from "screens/Login";
import LiveStream from "screens/LiveStream";

// Components //
import AuthedRoute from "components/AuthedRoute";

const App = () => (
    <Router>
        <Switch>
            <Route path='/login' component={Login} />
            <AuthedRoute path='/' component={LiveStream} />
        </Switch>
    </Router>
);

export default App;
