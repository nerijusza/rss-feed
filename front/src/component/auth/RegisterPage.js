import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import RegistrationSuccess from "./RegistrationSuccess";
import AppHeader from "../AppHeader";
import ApiService from "../../service/ApiService";
import {Box} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import {Alert} from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";

class RegisterPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            success: '',
            emailNotValid: false,
            inProgress: false
        }
    }

    componentDidMount() {
        ApiService.logOut();
    }

    register = (e) => {
        e.preventDefault();
        this.setState({error: '', inProgress: true});
        const userData = {email: this.state.email, password: this.state.password};
        ApiService.register(userData)
            .then(response => {
                this.setState({success: response.data.success, inProgress: false})
            }).catch(error => {
                this.setState({error: error.response.data.error, inProgress: false});
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === 'email') this.validateEmail(e.target.value);
    }

    validateEmail = (email) => {
        if (email) {
            ApiService.checkEmail(email)
                .then(valid => {
                    this.setState({emailNotValid: !valid});
                }).catch(() => {
                    this.setState({emailNotValid: true});
                });
        } else {
            this.setState({emailNotValid: false});
        }
    }

    render() {
        const success = this.state.success ? <RegistrationSuccess successMessage={this.state.success} /> : '';
        const error = this.state.error ? <Alert severity="error">{this.state.error}</Alert> : '';
        const inProgress = this.state.inProgress ? <LinearProgress /> : '';

        return(
            <React.Fragment>
                <AppHeader />
                <Container maxWidth="sm">
                    <Typography variant="h4">Register</Typography>
                    {success}
                    {error}
                    {inProgress}
                    <form>
                        <TextField variant="outlined" error={this.state.emailNotValid} type="text" label="EMAIL" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>
                        <TextField variant="outlined" type="password" label="PASSWORD" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
                        <Box>
                            <Button disabled={this.state.inProgress} variant="contained" color="secondary" onClick={this.register}>Register</Button>
                            <br />
                            Already have account? <Link href="/">Go to login page</Link>
                        </Box>
                    </form>
                </Container>
            </React.Fragment>
        )
    }
}

export default RegisterPage;
