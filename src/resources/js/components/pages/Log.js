import React from 'react';
import { inject, observer } from "mobx-react"

@inject('store') @observer
export default class Log extends React.Component {

    render() {
        return (
            <div className="">
                <div className="p-4">
                    HOHOHO this is the log
                </div>
            </div>
        );
    }
}