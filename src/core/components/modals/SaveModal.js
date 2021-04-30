import * as React from 'react';
import { observer } from "mobx-react"
import axios from 'axios';
import {nonCircularJsonStringify} from '../../../core/utils/nonCircularJsonStringify'
import {toast, Slide } from 'react-toastify';

export default observer(class SaveModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            storyName: this.props.defaultStory
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
        this.props.store.clearLinkLabels()

        this.props.store.metadata.client.save(
            this.state.storyName,
            this.props.store.diagram.engine.model
        ).then(() => {
            this.props.closeModal();
        })
        .catch(error => {
            alert('Save error')
        });
    }    

	render() {
        this.state.storyName = this.state.storyName ? this.state.storyName : this.props.defaultStory

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
                        <span className="">::save()</span>
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
                            <span className="my-2">Name</span>
                            <input
                                onChange={e => {this.handleChange(e)}}
                                className="px-2 py-1 rounded"
                                placeholder="descriptive-name.story"
                            />
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
                            <button onClick={this.handleSave.bind(this)} className="m-4 px-4 py-2 hover:text-malibu-700 border border-gray-500 hover:bg-gray-200 rounded">Save</button>                            
                        </div>                        
                    </div>                                                            
                </div>
            </div>            
        );
    }

    showSuccessToast()
    {
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