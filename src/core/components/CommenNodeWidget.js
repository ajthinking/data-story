import * as React from 'react';
import { inject, observer } from "mobx-react"


/**
 * Using @observer on this component will break things... :/
 * Instead put store dependent functionality in child components
 */

@inject('store')
export default class CommentNodeWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

	render() {
		return (
            <div className={"flex font-mono text-xxs text-gray-200"}>
                Hi this is a comment!
            </div>
		);
    }   
}

