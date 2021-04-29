import React from 'react';
import { observer } from "mobx-react"

export default observer(class Log extends React.Component {

    render() {
        return (
            <div className="">
                <div className="p-4">
                    HOHOHO this is the log
                </div>
            </div>
        );
    }
})