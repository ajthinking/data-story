import React from 'react';

export default class JSON_ extends React.Component {
    render() {
        return (
            <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
                <span className="my-2">{this.props.options.name}</span>
                <div>TODO</div>
            </div>
        );
    }
}