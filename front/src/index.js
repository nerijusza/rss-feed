import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

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
        fetch("http://127.0.0.1:8080/api/frequentWords")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Alert variant="primary">Loading words</Alert>;
        } else {
            return (
                <ul>{items.map(item => (<li key={item.word}>{item['word']}: {item.count}</li>))}</ul>
            );
        }
    }
}


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
        fetch("http://127.0.0.1:8080/api/rss")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.feed.entry
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Alert variant="primary">Loading RSS feed items</Alert>;
        } else {
            return (
                <Container>{items.map(entry => <RssEntry entry={entry} />)}</Container>
            );
        }
    }
}

function AuthorizedContent() {
    return (
        <Container>
            <FrequentWords />
            <RssFeed />
        </Container>
    );
}

function RssEntry(props) {
    return (
        <div>
            Updated: {props.entry.updated}<br />
            Author name: {props.entry.author.name}<br />
            Author url: {props.entry.author.uri}<br />
            URL: {props.entry.link.href}<br />
            Title: {props.entry.title}<br />
            Summary: {props.entry.summary}<br />
        </div>
    );
}

ReactDOM.render(<AuthorizedContent />, document.getElementById('root'));
