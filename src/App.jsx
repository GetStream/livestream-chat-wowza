import React from "react"; // eslint-disable-line no-unused-vars
import "./App.scss";
import "stream-chat-react/dist/css/index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Screens //
import Login from "./screens/Login";
import LiveStream from "./screens/LiveStream";

// Components //
import LivestreamProvider from "./components/LivestreamProvider";
import AuthedRoute from "./components/AuthedRoute";

const App = () => (
    <LivestreamProvider>
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                <AuthedRoute path='/' component={LiveStream} />
            </Switch>
        </Router>
    </LivestreamProvider>
);

export default App;
