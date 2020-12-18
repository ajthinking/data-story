import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
var Mousetrap = require('mousetrap');

@inject('store') @observer
export default class NodeSearch extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    render() {
        return (
        <div className="flex flex-col bg-gray-100 -m-5 rounded shadow max-w-xl font-mono text-xs">
            <input
                value={this.state.search}
                onChange={this.searchChange.bind(this)}
                ref={(input) => { this.nameInput = input; }}
                className="w-full p-4 rounded mb-4"
                placeholder="model | method | reader | writer ..."
                tabIndex={1}
            />
            <ul className="divide-y divide-gray-300">
                {this.filteredNodes().map(node => {
                    return this.renderNode(node)
                })}
            </ul>
      </div>
      )
    }

    renderNode(node) {
        const elementDataProperties = {
            'data-node-model-variation-key': node.key,
        }

        return (
            

            <li 
                key={node.category + node.name}
                onDoubleClick={this.handleSelect.bind(this)}
                //data-node-model={'InspectorNodeModel'}
                //data-node-model-argument={{target: 'Users'}}

                {...elementDataProperties}

                className="py-3 flex"
                tabIndex={2}
            >
                <div className="ml-3">
                    <p className="text-sm mb-2 font-medium text-gray-900 text-bold">
                        <span className="text-indigo-500">{node.category}</span>
                        <span className="">::{node.name}</span>
                        
                    </p>
                    <p className="text-xs text-gray-500">
                        
                        <span className="ml-2">{node.summary}</span>
                    </p>
                </div>
            </li>             
        )
    }

    searchChange(event) {
        this.setState({
            search: event.target.value
        })       
    }

    filteredNodes() {
        return this.props.store.diagram.availableNodes.filter((node) => {
            let content = node.category + node.name + node.summary

            return content.toLowerCase().includes(
                this.state.search.toLowerCase()
            )
        })
    }

    componentDidMount(){
        this.nameInput.focus();

        Mousetrap.bind(
            'enter',
            this.handleSelect.bind(this)
        );        
    }
    
    handleSelect(event) {
        let key = event.target.getAttribute('data-node-model-variation-key')
        let nodeData = this.props.store.diagram.availableNodes.find(node => node.key == key)
        
        this.props.store.addNode(nodeData)

        event.preventDefault()   
        this.props.onFinish()
    }
}