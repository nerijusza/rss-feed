import * as React from "react"
import {Redirect} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

type Props = {
    successMessage: string,
    redirectUrl: string
}

type State = {
    redirect: boolean
}

export default class SuccessMessageAndRedirect extends React.Component<Props, State> {
    id: any;

    state = {
        redirect: false,
    };

    componentWillUnmount() {
        if (this.props.successMessage)
            clearTimeout(this.id)
    }

    render() {
        if (this.props.successMessage) this.id = setTimeout(() => this.setState({ redirect: true }), 3000);

        if (this.props.successMessage) {
            return this.state.redirect
                ? <Redirect to={this.props.redirectUrl} />
                : <Alert severity="success">{this.props.successMessage}</Alert>
        } else {
            return <span />
        }
    }
}
