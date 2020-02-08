import * as React from "react"
import Button from "@material-ui/core/Button";
import ApiService from "../../service/ApiService";
import {Redirect} from "react-router-dom";

type State = {
    redirect: boolean
}

class LogOut extends React.Component<{}, State> {
    state = {redirect: false};

    logOut = () => {
        ApiService.logOut();
        this.setState({redirect: true})
    };

    render() {
        if (this.state.redirect) return <Redirect to="/" />;

        if (ApiService.isAuthorized()) {
            return <Button variant="contained" color="secondary" onClick={this.logOut}>Log Out</Button>;
        }

        return null;
    }
}

export default LogOut;
