
import axios from 'axios';
import {nonCircularJsonStringify} from '../../utils/nonCircularJsonStringify'

export default class DataStoryClient {
    run() {
        axios.post('/datastory/api/run', {
            model: nonCircularJsonStringify(
                this.props.store.diagram.engine.model.serialize()
            )
        })
        .then((response) => {
                response.data.diagram.nodes.filter(phpNode => {
                    return phpNode.features
                }).forEach(phpNode => {
                    let reactNode = this.props.store.diagram.engine.model.getNode(phpNode.id)
                    reactNode.features = phpNode.features;
                })
                
                this.showSuccessToast();                

                this.props.store.setNotRunning()
                this.props.store.refreshDiagram()
                
        })
        .catch((error) => {
            this.props.store.setNotRunning()
            console.log(error);
        });        
    }
}