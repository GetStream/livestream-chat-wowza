import React from "react";
import { Redirect, Route } from "react-router-dom";

export default (props) => {
    if (!localStorage.getItem("token")) {
        return <Redirect to='/login' />;
    }
    return <Route {...props} />;
};
