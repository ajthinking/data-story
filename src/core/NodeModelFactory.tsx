import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import NodeModel from '../core/NodeModel'
import NodeWidget from './components/NodeWidget'

export default class NodeModelFactory extends AbstractReactFactory {
	constructor() {
		super('NodeModel');
	}

	generateModel(event) {
		return new NodeModel(event.initialConfig.options);
	}

	generateReactWidget(event) {
		return <NodeWidget engine={this.engine} node={event.model} />;
    }
}