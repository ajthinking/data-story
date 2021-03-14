import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import NodeModel from '../core/NodeModel'
import NodeWidget from './components/NodeWidget'
import CommentNodeWidget from './components/CommenNodeWidget';

export default class NodeFactory extends AbstractReactFactory {
	constructor() {
		super('NodeModel');
	}

	generateModel(event) {
		return new NodeModel(event.initialConfig.options);
	}

	generateReactWidget(event) {
        if(event.model.options.nodeReact == 'Comment') return (
            <CommentNodeWidget engine={this.engine} node={event.model} />
        )

		return <NodeWidget engine={this.engine} node={event.model} />;
    }
}