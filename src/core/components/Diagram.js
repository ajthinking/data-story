import * as React from 'react';
import ReactDOM from 'react-dom';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { observer } from "mobx-react"

export default observer(class Diagram extends React.Component {
    constructor(props) {
        super(props);
        this.diagramRef = React.createRef();
    }

    render() {
        return (
            <div>
                <CanvasWidget
                    ref={this.diagramRef}
                    engine={this.props.store.diagram.engine}
                    refresh={this.props.store.diagram.refresh}
                    allowLooseLinks={false}
                    className={this.style()}
                />
            </div>
        )
    }

    style() {
        return 'fullsize bg-gray-600'
    }

    componentDidMount() {
        // FOCUS THE WORKBENCH!!! HOW?

        window.focus()

        //window.onfocus = function() { blurred && (location.reload()); };

        setTimeout(() => {
            ReactDOM.findDOMNode(this.diagramRef.current).focus();            
        }, 500)


    }
})