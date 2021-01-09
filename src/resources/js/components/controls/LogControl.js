import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';

@inject('store') @observer
export default class LogControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Log'
        this.icon = 'fas fa-file-alt'
        this.page = 'Log'
    }

    onClick()
    {
        this.props.store.setPage(this.page)
    }

    style() {
        let style = super.style()
        if(this.page == this.props.store.metadata.page) {
            style += ' text-malibu-600'
        }

        return style
    }    
}