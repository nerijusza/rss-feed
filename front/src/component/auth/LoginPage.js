import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppHeader from "../AppHeader";
import ApiService from "../../service/ApiService";
import {Box} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import {Alert} from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";

class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            inProgress: false
        }
    }

    componentDidMount() {
        ApiService.logOut();
    }

    login = (e) => {
        e.preventDefault();
        this.setState({error: '', inProgress: true});
        const credentials = {username: this.state.email, password: this.state.password};
        ApiService.login(credentials)
            .then(response => {
                this.setState({inProgress: false})
                ApiService.setToken(response.data.token);
                this.props.history.push('/rss');
            }).catch(error => {
                const errorMessage = error.response.status === 401
                    ? "Wrong user/email"
                    : "Unknown server error";
                this.setState({error: errorMessage, inProgress: false});
            });
    };

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});

    render() {
        const error = this.state.error ? <Alert severity="error">{this.state.error}</Alert> : '';
        const inProgress = this.state.inProgress ? <LinearProgress /> : '';

        return(
            <React.Fragment>
                <AppHeader />
                <Container maxWidth="sm">
                    <Typography variant="h4">Login</Typography>
                    {error}
                    {inProgress}
                    <form>
                        <TextField variant="outlined" type="text" label="EMAIL" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>
                        <TextField variant="outlined" type="password" label="PASSWORD" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
                        <Box>
                            <Button disabled={this.state.inProgress} variant="contained" color="secondary" onClick={this.login}>Login</Button>
                            <br />
                            Do not have account? <Link href="/register">Go to registration page</Link>
                        </Box>
                    </form>
                </Container>
            </React.Fragment>
        )
    }
}

export default LoginPage;
