import React from 'react';
import { observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';
import Modal from 'react-modal';
import modalStyle from '../../../core/utils/modalStyle'
import OpenModal from '../modals/OpenModal'
import store from '../../store/main'

export default observer(class OpenControl extends BaseControl {
    constructor(props) {
        super(props)
        this.title = 'Open story'
        this.icon = 'fas fa-folder'
        this.state = {
            isOpen: false
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
                    <OpenModal
						store={store}
                        closeModal={this.closeModal.bind(this)}
                    />
            </Modal>
        </span>
    }

    closeModal() {
        //this.props.store.diagram.engine.model.setLocked(false);

        this.setState({
            isOpen: false
        });
    }    
})