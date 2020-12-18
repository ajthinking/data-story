import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import Modal from 'react-modal';

import { inject, observer } from "mobx-react"

@inject('store') @observer
export default class NodeWidgetModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            parameters: this.props.node.options.parameters
        }
    }
    

    handleChange(event, parameter) {
        let parameters = this.state.parameters
        parameters[parameter].value = event.target.value

        this.setState({
            parameters: {... parameters}
        })        
    }
    
    handleCancel(event) {
        this.props.closeModal();
    }
    
    handleSave(event) {
        this.props.node.options.parameters = this.state.parameters
        this.props.closeModal();
    }    

	render() {
		return (
            <div>
                {this.renderHeading()}
                {this.renderBody()}
                {this.renderActions()}
            </div>
		);
    }
    
    renderHeading()
    {
        return (
            <div className="w-full bg-gray-100 p-6 font-mono font-bold border-b border-gray-300">
                <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 text-bold">
                        <span className="text-indigo-500">{this.props.node.options.category}</span>
                        <span className="">::{this.props.node.getDisplayName()}</span>
                    </p>
                    <p 
                        className="text-sm font-medium text-bold text-gray-400 hover:text-gray-500"
                        onClick={this.handleCancel.bind(this)}
                    >
                        <i className="fa fa-close"></i>
                    </p>                    
                </div>                    
            </div>            
        );
    }

    renderBody()
    {
        return (
            <div>
                <div className="w-full bg-gray-100 px-6 py-2">
                    {Object.keys(this.state.parameters).map(parameter => {
                        return (
                            <div key={parameter} className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
                                <span className="my-2">{parameter}</span>
                                <input
                                    onChange={e => {this.handleChange(e, parameter)}}
                                    className="px-2 py-1 rounded"
                                    value={this.state.parameters[parameter].value}
                                />
                            </div>
                        )
                    })}

                </div>
            </div>            
        );
    }

    renderActions()
    {
        return (
            <div>
                <div className="w-full bg-gray-100 mt-6 px-6 py-2 border-t border-gray-300">
                    <div className="flex justify-between my-4 justify-end align-bottom text-gray-500 text-xs font-mono">
                        <div className="flex">
                            <button className="my-4 px-4 py-2 hover:text-malibu-700 hover:underline">Import schema</button>
                        </div>
                        <div className="flex">
                            <button onClick={this.handleCancel.bind(this)} className="m-4 px-4 py-2 hover:text-malibu-700 hover:underline">Cancel</button>
                            <button onClick={this.handleSave.bind(this)} className="m-4 px-4 py-2 hover:text-malibu-700 border border-gray-500 hover:bg-gray-200 rounded">Save</button>                            
                        </div>                        
                    </div>                                                            
                </div>
            </div>            
        );
    }
}

