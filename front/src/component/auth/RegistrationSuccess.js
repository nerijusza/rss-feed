import React from 'react';
import {Redirect} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

class RegistrationSuccess extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            successMessage: props.successMessage,
            redirect: false
        }
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    render() {
        return this.state.redirect
            ? <Redirect to="/" />
            : <Alert severity="success">{this.state.successMessage}<br />Redirecting to login page..</Alert>
    }
}

export default RegistrationSuccess;
