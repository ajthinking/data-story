import * as React from 'react';
import jexcel from 'jexcel';
import ReactDOM from 'react-dom';

// TODO <link rel="stylesheet" href="https://bossanova.uk/jexcel/v4/jexcel.css" type="text/css" />
// INSTALL THAT CSS INSTEAD OF USING CDN

// Readd         "jexcel": "^4.5.2", for this demo to work

export default class Sheet extends React.Component {
    constructor(props) {
        super(props);
        this.options = {
            data:[[]],
            minDimensions:[10,10],
        };
    }

    componentDidMount() {
        this.el = jexcel(ReactDOM.findDOMNode(this).children[0], this.options);
    }

    addRow() {
        this.el.insertRow();
    }

    render() {
        console.log(this.options)
        return (
            <div>
                <div></div><br/><br/>
                <input type='button' value='Add new row' onClick={() => this.addRow()}></input>
            </div>
        );
    }

    componentWillUnmount() {
        console.log(
            this.el.getData()
        )
    }
}

