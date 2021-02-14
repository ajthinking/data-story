import React from 'react';

export default class JSON_ extends React.Component {
    render() {
        return (
            <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
                <span className="my-2">{this.props.options.name}</span>
                {/* REPLACE WITH SOME EDITOR! */}
                <textarea
                    onChange={e => {this.props.handleChange(e, this.props.options)}}
                    className="px-2 py-1 rounded h-64"
                    value={this.props.options.value}
                />
            </div>
        );
    }
}