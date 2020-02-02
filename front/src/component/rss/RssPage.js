import React from 'react';
import Container from '@material-ui/core/Container';
import AppHeader from "../AppHeader";
import RssFeed from "./RssFeed";
import FrequentWords from "./FrequentWords";
import ApiService from "../../service/ApiService";
import {Box} from "@material-ui/core";
import {Redirect} from "react-router-dom";

class RssPage extends React.Component {
    render() {
        if (!ApiService.isAuthorized()) return <Redirect to="/" />

        return (
            <React.Fragment>
                <AppHeader/>
                <Container maxWidth="lg">
                    <Box>
                        <h1>Most frequent words</h1>
                        <FrequentWords />
                    </Box>
                    <Box>
                        <h1>Rss Feed</h1>
                        <RssFeed />
                    </Box>
                </Container>
            </React.Fragment>
        )
    }
}

export default RssPage;
