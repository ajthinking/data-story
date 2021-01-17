import React from 'react';

export default class Where extends React.Component {
    render() {
        return (
            <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
                <span className="my-2">{this.props.options.name}</span>

                <div className="flex space-x-2">
                    <input
                        name="attribute"
                        onChange={e => {this.props.handleChange(e, this.props.options)}}
                        className="flex-1 px-2 py-1 rounded"
                        placeholder="attribute"
                        value={this.props.options.attribute}
                    />
                    <select
                        className="flex-1 px-2 py-1"
                        name="operator"
                        onChange={e => {this.props.handleChange(e, this.props.options)}}                        
                        value={this.props.options.operator}
                    >
                        {/* <option value="Contains">
                            CONTAINS
                        </option> */}
                        <option value="=">
                            EQUALS
                        </option>                        
                        <option value=">">
                            GREATER THAN
                        </option>                                                

                        {/* <option value="==="> TODO DOES NOT WORK OPERATORS ARE IN CONTEXT OF DB
                            EQUALS STRICT
                        </option> */}
                        <option value="<">
                            LESS THAN
                        </option>
                        <option value="like">
                            LIKE
                        </option>                                                
                    </select>
                    <input
                        onChange={e => {this.props.handleChange(e, this.props.options)}}
                        className="flex-1 px-2 py-1 rounded"
                        placeholder="value"
                        name="value"
                        value={this.props.options.value}
                    />                                
                </div>
            </div>
        );
    }
}