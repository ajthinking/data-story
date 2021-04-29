import React from 'react';
import { observer } from "mobx-react"

export default class BaseControl extends React.Component {
    render() {
        return (
            <span
                id={this.id ?? this.title}
                title={this.title}
                className={this.style()}
                onClick={this.onClick.bind(this)}
            >
                <i className={this.icon}></i>
            </span>
        );
    }

    onClick()
    {
        alert("Not implemented");
    }

    style() {
        return "ml-4 text-gray-200 hover:text-malibu-500"
    }
}