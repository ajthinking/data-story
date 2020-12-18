import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';

@inject('store') @observer
export default class OpenControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Open story'
        this.icon = 'fas fa-folder'
    }
    
    onClick()
    {
        alert("NOT IMPLEMENTED!")
    }
}