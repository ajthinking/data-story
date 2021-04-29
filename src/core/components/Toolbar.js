import React from 'react';
import { observer } from "mobx-react"

import WorkbenchControl from './controls/WorkbenchControl';
import OpenControl from './controls/OpenControl';
import SaveControl from './controls/SaveControl';
import RunControl from './controls/RunControl';
import LogControl from './controls/LogControl';
import AddNodeControl from './controls/AddNodeControl'
import TokensControl from './controls/TokensControl';
import store from "../store/main"

export default observer(class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progressTick: 0
        }
    }

    render() {
        return (
            <div className="flex w-full bg-gray-600 border-t-2 border-gray-500 shadow shadow-xl">
                <div className="flex no-wrap items-center flex-1 w-full px-2 py-2">
                    <WorkbenchControl store={store} />
                    <OpenControl store={store} />
                    <SaveControl store={store} />
                    <RunControl store={store} />
                    <TokensControl store={store} />
                    <LogControl store={store} />                    
                    <AddNodeControl store={store} />
                    {this.renderInspectables()}       
                </div>
            </div>
        );
    }
    renderInspectables() {
        return this.props.store.diagram.engine && (
            <span className="border-l ml-8 pl-8">
                {this.props.store.nodesWithInspectables().map(node => {
                    return (
                        
                        <span
                            dusk="inspect"
                            key={node.getDisplayName() + node.options.id} 
                            onClick={((e) => this.onClickInspectable(node)).bind(node)}
                            className={this.inspectableLinkStyle(node)}>
                            {node.getDisplayName()}
                        </span>
                    )
                })}
            </span>
        );
    }

    onClickInspectable(node) {
        if(
            this.props.store.metadata.page == 'Inspector' &&
            this.props.store.metadata.activeInspector == node.options.id
        ) {
            return this.props.store.setPage('Workbench')
        }

        this.props.store.setPage('Inspector')
        this.props.store.setActiveInspector(node.options.id)
    }

    inspectableLinkStyle(node = null) {
        let style = "mr-8 text-gray-200 hover:text-malibu-500 font-mono text-xs cursor-pointer "

        if(
            node &&
            this.props.store.metadata.page == 'Inspector' &&
            this.props.store.metadata.activeInspector == node.options.id
        ) {
            style += 'text-malibu-500'
        }

        return style
    }
    
})