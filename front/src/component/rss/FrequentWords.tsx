import * as React from "react"
import ApiService, {FrequentWord} from "../../service/ApiService";
import {Redirect} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {InProgress} from "../InProgress";
import {Error} from "../Error";

type State = {
    errorMessage: string
    inProgress: boolean,
    items: FrequentWord[]
}

class FrequentWords extends React.Component<{}, State> {
    state = {
        errorMessage: '',
        inProgress: true,
        items: []
    };

    componentDidMount() {
        ApiService.frequentWords().then(response => {
            if (response.success) {
                this.setState({
                    inProgress: false,
                    items: response.frequentWords
                });
            } else {
                this.setState({
                    inProgress: false,
                    errorMessage: 'Failed to load frequent words count'
                });
            }
        });
    }

    render() {
        if (!ApiService.isAuthorized()) return <Redirect to='/' />;
        if (this.state.errorMessage) return <Error message={this.state.errorMessage}/>;
        if (this.state.inProgress) return <InProgress key="frequent" message="Loading most frequent RSS feed words.." />;
        return <Box>{this.state.items.map( (item, key) => <FrequentWordComponent {...item} key={key} />)}</Box>;
    }
}

function FrequentWordComponent(frequentWord: FrequentWord) {
    return <Chip
        size="medium"
        color="primary"
        avatar={<Avatar>{frequentWord.count}</Avatar>}
        label={frequentWord.word}
        style={{margin: '5px'}}
    />
}

export default FrequentWords;
