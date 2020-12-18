import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import NodeModel from './NodeModel'
import NodeWidget from './components/NodeWidget'

export default class NodeFactory extends AbstractReactFactory {
	constructor() {
		super('manipulator');
	}

	generateModel(event) {
		return new NodeModel(event.initialConfig.options);
	}

	generateReactWidget(event) {
        let Widget = event.model

		return <NodeWidget engine={this.engine} node={event.model} />;
    }
}