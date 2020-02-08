import * as React from "react"
import {ReactElement} from "react"
import {Redirect} from "react-router-dom";
import ApiService, {AuthResponse, User} from "../../service/ApiService";
import AppHeader from "../AppHeader";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Error} from "../Error";
import {ProgressBar} from "../ProgressBar";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {MaybeRegister} from "./MaybeRegister";
import {MaybeLogin} from "./MaybeLogin";
import SuccessMessageAndRedirect from "../SuccessMessageAndRedirect";

type Props = {
    title: string
    checkForExistingEmail: boolean
    authFunction: (user: User) => Promise<AuthResponse>
    maybeLoginOrRegister: ReactElement
}

export const LoginProps: Props = {
    title: "Login",
    checkForExistingEmail: false,
    authFunction: ApiService.login,
    maybeLoginOrRegister: <MaybeRegister/>
};

export const RegisterProps: Props = {
    title: "Register",
    checkForExistingEmail: true,
    authFunction: ApiService.register,
    maybeLoginOrRegister: <MaybeLogin />
};

type State = {
    email: string,
    password: string,
    errorMessage: string,
    successMessage: string,
    emailNotValid: boolean,
    passwordNotValid: boolean,
    inProgress: boolean
}

export default class UserForm extends React.Component<Props, State> {
    state = {
        email: '',
        password: '',
        errorMessage: '',
        successMessage: '',
        emailNotValid: false,
        passwordNotValid: false,
        inProgress: false
    };

    onEmailChange = (e) => {
        this.setState({email: e.target.value});
        this.checkForExistingEmail(e.target.value);
    };

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    };

    onFormAction = (e) => {
        e.preventDefault();

        if (!this.validateForm()) return;
        this.setState({errorMessage: '', inProgress: true});

        this.props.authFunction({email: this.state.email, password: this.state.password})
            .then(response => {
                if (response.success)
                    this.setState({successMessage: response.message, inProgress: false});
                else
                    this.setState({errorMessage: response.message, inProgress: false});
            });
    };

    validateForm = (): boolean => {
        const emailNotValid = !this.isEmailValid(this.state.email);
        const passwordNotValid = this.state.password.length < 3;

        let errors: string[] = [];
        if (emailNotValid) errors.push('Email is not valid');
        if (passwordNotValid) errors.push('Password is too short (minimum 3 character)');

        this.setState({emailNotValid: emailNotValid, passwordNotValid: passwordNotValid});

        if (errors.length) {
            this.setState({errorMessage: errors.join('. ')});
            return false;
        }

        this.setState({errorMessage: ''});
        return true;
    };

    isEmailValid = (email: string): boolean => {
        return !!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    };

    checkForExistingEmail = (email: string) => {
        if (this.props.checkForExistingEmail && this.isEmailValid(email)) {
            this.setState({emailNotValid: false});
            ApiService.checkEmail(email)
                .then(valid => {
                    if (!valid) {
                        this.setState({errorMessage: 'Email ' + email + ' already registered, please login'});
                    }
                });
        }
    };

    render() {
        if (ApiService.isAuthorized()) return <Redirect to="/rss" />;

        return (
            <React.Fragment>
                <AppHeader />
                <Container maxWidth="sm">
                    <Typography variant="h4">{this.props.title}</Typography>
                    <SuccessMessageAndRedirect successMessage={this.state.successMessage} redirectUrl="/" />
                    <Error message={this.state.errorMessage}/>
                    <ProgressBar visible={this.state.inProgress}/>
                    <form>
                        <TextField error={this.state.emailNotValid} variant="outlined" type="text" label="EMAIL" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onEmailChange}/>
                        <TextField error={this.state.passwordNotValid} variant="outlined" type="password" label="PASSWORD" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onPasswordChange}/>
                        <Box>
                            <Button disabled={this.state.inProgress} variant="contained" color="secondary" onClick={this.onFormAction}>{this.props.title}</Button>
                            <br />
                            {this.props.maybeLoginOrRegister}
                        </Box>
                    </form>
                </Container>
            </React.Fragment>
        )
    }
}