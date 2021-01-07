import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import { toast, Slide } from 'react-toastify';
import RemoteServerClient from '../../servers/RemoteServerClient';
import LocalServerClient from '../../servers/LocalServerClient';

@inject('store') @observer
export default class RunControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Run story'
        this.icon = 'fas fa-play'
    }

    onClick()
    {
        this.props.store.setRunning()

        // NORMAL PHP CLIENT
        let client = new RemoteServerClient('/datastory/api')

        // TODO JS CLIENT 
        // let jsClient = new LocalServerClient ...

        client.run(
            this.props.store.diagram.engine.model
        )
        .then((response) => {
            // TRANSFER FEATURE AT NODES (INSPECTABLES)
            response.data.diagram.nodes.filter(phpNode => {
                return phpNode.features
            }).forEach(phpNode => {
                let reactNode = this.props.store.diagram.engine.model.getNode(phpNode.id)
                reactNode.features = phpNode.features;
            })

            // SET FEATURE COUNT ON LINKS
            this.props.store.clearLinkLabels() // Clear old labels
            let ports = response.data.diagram.nodes.map(node => {
                return node.ports
            }).flat().filter(port => {
                return port.features
            }).forEach(port => {
                port.links.forEach(linkId => {    
                    let link = this.props.store.diagram.engine.model.getLink(linkId)
                    link.addLabel(port.features.length)
                })
            })
            
            this.showSuccessToast();                

            this.props.store.setNotRunning()
            this.props.store.refreshDiagram()
            
        })
        .catch((error) => {
            this.props.store.setNotRunning()
            console.log(error);
            this.showFailureToast();
        });



    }

    componentDidMount() {
        
        Mousetrap.bind(
            '?', // shift+plus 
            (e) => {
                e.preventDefault()   
                this.onClick()
            }
        );

        Mousetrap.bind(
            'shift+r',
            (e) => {
                this.onClick()
            }
        );        
    }

    showFailureToast()
    {
        toast.info('Crap! Could not run story! Check console.', {
            position: "bottom-right",
            transition: Slide,
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    showSuccessToast()
    {
        toast.info('Successfully ran story!', {
            position: "bottom-right",
            transition: Slide,
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }    
}