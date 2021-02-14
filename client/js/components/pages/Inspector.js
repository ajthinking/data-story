import React from 'react';
import Diagram from '../Diagram';
import { inject, observer } from "mobx-react"
import InspectorTable from '../InspectorTable';

@inject('store') @observer
export default class Inspector extends React.Component {

    render() {
        return (
            <div className="">
                <div className="p-4">
                    <InspectorTable />    
                </div>
            </div>
        );
    }
}

