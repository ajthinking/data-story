import * as React from 'react';
import { observer } from "mobx-react"
import axios from 'axios';
import {nonCircularJsonStringify} from '../../../core/utils/nonCircularJsonStringify'
import {toast, Slide } from 'react-toastify';

export default observer(class OpenModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            storyName: ''
        }
    }

    handleChange(event) {
        this.setState({
            storyName: event.target.value
        })        
    }
    
    handleCancel(event) {
        this.props.closeModal();
    }
    
    handleSave(event) {
        //
    }    

	render() {
		return (
            <div>
                {this.renderHeading()}
                {this.renderBody()}
                {this.renderActions()}
            </div>
		);
    }
    
    renderHeading()
    {
        return (
            <div className="w-full bg-gray-100 p-6 font-mono font-bold border-b border-gray-300">
                <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 text-bold">
                        <span className="text-indigo-500">Story</span>
                        <span className="">::open()</span>
                    </p>                  
                </div>                    
            </div>            
        );
    }

    renderBody()
    {
        return (
            <div>
                <div className="w-full bg-gray-100 px-6 py-2">
                    <div className="flex flex-col my-4 justify-center align-middle text-gray-500 text-xs font-mono">
                        <ul>
                            {this.props.store.metadata.stories.map(story => {
                                return (
                                    <li 
                                        className="my-1 hover:text-malibu-500 hover:underline cursor-pointer"
                                        key={story.path}
                                        onClick={() => { this.clickStory(story.name) }}
                                    >{story.name}</li>
                                )
                            })}
                        </ul>
                    </div>

                </div>
            </div>            
        );
    }

    renderActions()
    {
        return (
            <div>
                <div className="w-full bg-gray-100 mt-6 px-6 py-2 border-t border-gray-300">
                    <div className="flex justify-end my-4 justify-end align-bottom text-gray-500 text-xs font-mono">
                        <div className="flex">
                            <button onClick={this.handleCancel.bind(this)} className="m-4 px-4 py-2 hover:text-malibu-700 hover:underline">Cancel</button>
                        </div>                        
                    </div>                                                            
                </div>
            </div>            
        );
    }

    clickStory(name) {
        window.location = '/datastory/' + name
    }

    showSuccessToast() {
        toast.info('Successfully saved story!', {
            position: "bottom-right",
            transition: Slide,
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }    
})

