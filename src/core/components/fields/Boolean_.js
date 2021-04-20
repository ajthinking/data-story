import React from 'react';

export default class Booleanx extends React.Component {
    render() {
        return (
            <div className="flex my-4 space-x-2 items-center justify-start text-gray-500 text-xs font-mono">
                <span className="my-2">{this.props.options.name}</span>
                <input
                    type="checkbox"
                    onChange={e => {this.props.handleChange(e, this.props.options)}}
                    className="px-2 py-1 rounded"
                />
            </div>
        );
    }
}