import React from 'react';
import { observer } from "mobx-react"

export default observer(class Tokens extends React.Component {

    render() {
        return (
            <div className="">
                <div className="px-4 py-12">
                    <textarea 
                        className="w-full h-48 p-4 text-sm text-gray-800"
                        value={this.defaultContent()}
                        onChange={(v)=>{}}
                    >
                        
                        
                    </textarea>
                </div>
            </div>
        );
    }

    defaultContent() {
        return JSON.stringify({
            GITHUB_API_TOKEN: '123456789',
        }, null, 4)
    }
})