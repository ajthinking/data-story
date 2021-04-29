import * as React from 'react';

import { observer } from "mobx-react"

export default observer(class NodeInspectorLink extends React.Component {
	render() {

        // Listen to a property to force refresh
        this.props.store.diagram.refresh

        let node = this.props.store.diagram.engine.model.getNode(this.props.nodeId)

        return node.isInspectable() && 
            (<div onClick={(e) => { this.props.store.goToInspector(this.props.nodeId) }}>
                <i className='mr-2 text-malibu-600 fas fa-search hover:cursor'></i>
            </div>)
    }   
})

