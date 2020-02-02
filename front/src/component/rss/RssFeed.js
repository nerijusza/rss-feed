import React from "react";
import ApiService from "../../service/ApiService";
import {Redirect} from "react-router-dom";
import {Box, Paper} from "@material-ui/core";
import Moment from "react-moment";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

class RssFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        ApiService.rssFeed().then(response => {
            this.setState({
                isLoaded: true,
                items: response.data.feed.entry
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error: "Failed to load RSS items"
            });

            if (error.response.status === 401) {
                ApiService.logOut();
            }
        });
    }

    render() {
        if (!ApiService.isAuthorized()) return <Redirect to='/' />

        const { error, isLoaded, items } = this.state;
        if (error) {
            return <Alert severity="error">{error}</Alert>;
        } else if (!isLoaded) {
            return (
                <Alert severity="info">
                    Loading RSS feed items..
                    <LinearProgress />
                </Alert>
            );
        } else {
            return (
                <Box>{items.map((entry, key) => <RssEntry key={key} entry={entry} />)}</Box>
            );
        }
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
