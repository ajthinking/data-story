import * as React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { inject, observer } from "mobx-react"

@inject('store') @observer
export default class Diagram extends React.Component {
    render() {
        return (
            <div>
                <CanvasWidget
                    engine={this.props.store.diagram.engine}
                    refresh={this.props.store.diagram.refresh}
                    className={this.style()}
                />
            </div>
        )
    }

    style() {
        return 'fullsize bg-gray-600'
    }
}