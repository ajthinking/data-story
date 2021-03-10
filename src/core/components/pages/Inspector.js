import React from 'react';
import Diagram from '../Diagram';
import { inject, observer } from "mobx-react"
import InspectorTable from '../InspectorTable';

@inject('store') @observer
export default class Inspector extends React.Component {

    render() {
        let id = this.props.store.metadata.activeInspector
        let features = id ? this.props.store.diagram.engine.model.getNode(id).features : [];

        return (
            <div className="">
                <div className="p-4">
                    <InspectorTable features={features} />
                </div>
            </div>
        );
    }
}

