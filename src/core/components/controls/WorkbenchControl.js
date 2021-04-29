import React from 'react';
import { observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';

export default observer(class WorkbenchControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Story workbench'
        this.icon = 'fas fa-project-diagram'
        this.page = 'Workbench'
    }



    onClick()
    {
        this.props.store.setPage('Workbench')
    }

    style() {
        let style = super.style()
        if(this.page == this.props.store.metadata.page) {
            style += ' text-malibu-600'
        }

        return style
    }    
})