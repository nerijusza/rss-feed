import React from "react";
import ApiService from "../../service/ApiService";
import {Redirect} from "react-router-dom";
import {Box, Paper} from "@material-ui/core";
import Moment from "react-moment";
import {Error} from "../Error";
import {InProgress} from "../InProgress";

type State = {
    errorMessage: string
    inProgress: boolean,
    items: any[]
}

class RssFeed extends React.Component<{}, State> {
    state = {
        errorMessage: '',
        inProgress: true,
        items: []
    };

    componentDidMount() {
        ApiService.rssFeed().then(response => {
            if (response.success) {
                this.setState({
                    inProgress: false,
                    items: response.items
                });
            } else {
                this.setState({
                    inProgress: false,
                    errorMessage: 'Failed to load RSS items'
                });
            }
        });
    }

    render() {
        if (!ApiService.isAuthorized()) return <Redirect to='/' />;
        if (this.state.errorMessage) return <Error message={this.state.errorMessage}/>;
        if (this.state.inProgress) return <InProgress key="rss" message="Loading RSS feed items.."/>;
        return <Box>{this.state.items.map((entry, key) => <RssEntry key={key} entry={entry} />)}</Box>;
    }
}

function RssEntry(props) {
    return (
        <Box key={props.entry.title} py={3}>
            <Paper elevation={3}>
                <Box p={1}>
                    <h3>{props.entry.title}</h3>
                    Author: <a target="_blank" rel="noopener noreferrer" href={props.entry.author.uri}>{props.entry.author.name}</a>
                    <br />
                    Updated: <Moment format="YYYY-MM-DD HH:mm">{props.entry.updated}</Moment>
                    <br />
                    <Box dangerouslySetInnerHTML={{__html: props.entry.summary}} />
                    <a target="_blank" rel="noopener noreferrer" href={props.entry.link['@attributes'].href}>Read more</a>
                </Box>
            </Paper>
        </Box>
    );
}

export default RssFeed;
