import * as React from 'react';

export default class CommentNodeWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

	render() {
		return (
            <div className={"flex font-mono text-xxs text-gray-200 px-12 py-4 border"}>
                Hi! This is a comment!
                {/*<input value={'Hi! This is a comment!'} onChange={e => {}}/>*/}
            </div>
		);
    }   
}

