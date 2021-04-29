import React from 'react';
import Diagram from '../Diagram';
import store from '../../store/main'

export default class Workbench extends React.Component {
    render() {
        return (
            <Diagram store={store} ref="pppage" />
        );
    }
}

