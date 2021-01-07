import AbstractServerClient from "./AbstractServerClient";
import axios from 'axios';
import {nonCircularJsonStringify} from '../utils/nonCircularJsonStringify'

export default class RemoteServerClient extends AbstractServerClient {
    constructor(root) {
        super()
        this.root = root
    }

    run(model) {
        return axios.post(this.root + '/run', {
            model: nonCircularJsonStringify(
                model.serialize()
            )
        })        
    }
}