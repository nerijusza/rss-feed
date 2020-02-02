import React from "react";
import ApiService from "../../service/ApiService";
import {Redirect} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

class FrequentWords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        ApiService.frequentWords().then(response => {
            this.setState({
                isLoaded: true,
                items: response.data.items
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error: "Failed to load frequent words count"
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
                    Loading most frequent RSS feed words..
                    <LinearProgress />
                </Alert>
            );
        } else {
            return (
                <Box>
                    {items.map(item => (<Chip
                        key={item.word}
                        size="medium"
                        color="primary"
                        avatar={<Avatar>{item.count}</Avatar>}
                        label={item.word}
                        style={{margin: '5px'}}
                    />))}
                    &nbsp;&nbsp;&nbsp;
                </Box>
            );
        }
    }
}

export default FrequentWords;
