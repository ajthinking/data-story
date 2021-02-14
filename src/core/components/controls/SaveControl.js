import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';
import Modal from 'react-modal';
import modalStyle from '../../../core/utils/modalStyle'
import SaveModal from '../modals/SaveModal'

@inject('store') @observer
export default class SaveControl extends BaseControl {
    constructor(props) {
        super(props)
        this.title = 'Save story'
        this.icon = 'fas fa-save'
        this.state = {
            isOpen: false,
            defaultStory: this.props.store.metadata.activeStory
        }
    }

    onClick()
    {
        this.setState({
            isOpen: true
        });
    }

    render() {
        return <span>
            {super.render()}
            <Modal
                isOpen={this.state.isOpen}
                onRequestClose={this.closeModal.bind(this)}
                style={modalStyle}
            >
                    <SaveModal
                        defaultStory={this.state.defaultStory}
                        closeModal={this.closeModal.bind(this)}
                    />
            </Modal>
        </span>
    }

    closeModal() {
        //this.props.store.diagram.engine.model.setLocked(false);

        this.setState({
            isOpen: false,
        });
    }   
}