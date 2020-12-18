import React from 'react';
import Diagram from '../Diagram';
import { inject } from "mobx-react"

@inject('store')
export default class Workbench extends React.Component {
    render() {
        return (
            <Diagram />
        );
    }
}

