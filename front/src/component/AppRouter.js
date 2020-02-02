import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from "react";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import RssPage from "./rss/RssPage";

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/rss" component={RssPage} />
            </Switch>
        </Router>
    );
}

export default AppRouter;