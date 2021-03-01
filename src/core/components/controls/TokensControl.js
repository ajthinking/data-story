import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';

@inject('store') @observer
export default class TokensControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Tokens'
        this.icon = 'fas fa-key'
        this.page = 'Tokens'
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