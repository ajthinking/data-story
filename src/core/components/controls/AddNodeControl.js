import React from 'react';
import ReactDOM from 'react-dom'
import { observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';
import Modal from 'react-modal';
import NodeSearch from './NodeSearch'
import store from '../../store/main'

var Mousetrap = require('mousetrap');


const customStyles = {
  content : {
    'maxWidth': '450px',
    'top': '110px',
    'left': '120px',
    //top                   : '25%',
    //left                  : '25%',
    //right                 : 'auto',
    //bottom                : 'auto',
    //marginRight           : '-50%',
    //transform             : 'translate(-50%, -50%)'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },  
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app')

export default observer(class AddNodeControl extends BaseControl {
    constructor(props) {
        super(props);
        this.id = 'add-node'
        this.title = 'Add Node'
        this.icon = 'fas fa-plus'
        this.state = {
            isOpen: false
        }

        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState({
            isOpen: true
        });
    }
    
    closeModal() {
        this.setState({
            isOpen: false
        });
    }

    renderIcon() {
        return (
            <span
                title={this.title}
                className={this.style()}
                onClick={this.onClick.bind(this)}
            >
                <i className={this.icon}></i>
            </span>
        );
    }
    
    renderModal() {
        return (<Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal.bind(this)}
            style={customStyles}
            contentLabel="Example Modal"
            >            
                <NodeSearch store={store} onFinish={this.closeModal.bind(this)}/>
        </Modal>);
    }
    
    render() {
        return (<span>
            {super.render()}
            {this.renderModal()}
        </span>)
    }

    componentDidMount() {
        
        Mousetrap.bind(
            '?', // shift+plus 
            (e) => {
                e.preventDefault()   
                this.onClick()
            }
        );       
    }
})