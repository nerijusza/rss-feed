import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Alert from 'react-bootstrap/Alert';

class MyComponent extends React.Component {
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

ReactDOM.render(<MyComponent />, document.getElementById('root'));
