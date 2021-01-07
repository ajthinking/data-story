import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import Modal from 'react-modal';
import _ from 'lodash'
import { DefaultPortModel, NodeModel as DefaultNodeModel } from '@projectstorm/react-diagrams';

// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-github";

import { inject, observer } from "mobx-react"
import String_ from '../fields/String_';
import field from '../fields/factory'

@inject('store') @observer
export default class NodeWidgetModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            parameters: _.cloneDeep(this.props.node.options.parameters)
        }
    }

    handleChange(event, parameter) {
        let parameters = this.state.parameters
        parameters[parameter.name].value = event.target.value

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
                {this.renderEditableInPorts()}
                {this.renderEditableOutPorts()}
                {this.renderActions()}
                {/* <AceEditor
                mode="json"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                />                                 */}
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
                        <span className=""> / {this.props.node.getDisplayName()}</span>
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
                    {Object.values(this.state.parameters).map(parameter => {
                        let Field = field(parameter.fieldType);

                        return (
                            <Field
                                key={parameter.name}
                                handleChange={this.handleChange.bind(this)}
                                options={parameter}
                            />
                        )
                    })}

                </div>
            </div>            
        );
    }

    renderEditableInPorts()
    {
        return this.props.node.options.editableInPorts && (
            <div className="w-full px-6 py-1 text-gray-500 text-xs font-mono border border-t">
                <div className="my-2">Ports</div>
                {Object.values(this.props.node.getInPorts()).map((port) => {
                    return (
                        <div key={port.options.id} className="w-full flex items-center">
                            <div className="w-full rounded">
                                <input 
                                    className="w-full px-2 py-1"
                                    type="text"
                                    value={port.options.label}
                                    onChange={this.editExistingPort.bind(this)}
                                />
                            </div>
                        </div>                
                    )
                })}
                <div className="w-full flex items-center">
                    <div className="w-full rounded">
                        <input 
                            className="w-full px-2 py-1"
                            type="text"
                            placeholder={'add port...'}
                            onKeyUp={this.saveNewInPort.bind(this)}
                        />
                    </div>
                </div>                  
            </div>
        );
    }

    renderEditableOutPorts()
    {
        return this.props.node.options.editableOutPorts && (
            <div className="w-full px-6 py-1 text-gray-500 text-xs font-mono border border-t">
                <div className="my-2">Ports</div>
                {Object.values(this.props.node.getOutPorts()).map((port) => {
                    return (
                        <div key={port.options.id} className="w-full flex items-center">
                            <div className="w-full rounded">
                                <input 
                                    className="w-full px-2 py-1"
                                    type="text"
                                    value={port.options.label}
                                    onChange={this.editExistingPort.bind(this)}
                                />
                            </div>
                        </div>                
                    )
                })}
                <div className="w-full flex items-center">
                    <div className="w-full rounded">
                        <input 
                            className="w-full px-2 py-1"
                            type="text"
                            placeholder={'add port...'}
                            onKeyUp={this.saveNewOutPort.bind(this)}
                        />
                    </div>
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
                            {/* <button className="my-4 px-4 py-2 hover:text-malibu-700 hover:underline">Import schema</button> */}
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

    editExistingPort(event) {

    }

    saveNewInPort(event) {
        return this.saveNewPort(event, true)
    }

    saveNewOutPort(event) {
        return this.saveNewPort(event, false)
    }    

    saveNewPort(event, isInPort) {
        if(event.key != 'Enter') return;

        this.props.node.addPort(
            new DefaultPortModel({
                in: isInPort,
                name: event.target.value,
            })
        );

        event.target.value = '';

        // Why is this needed?
        this.forceUpdate();
    }
}