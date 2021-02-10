import AbstractServerClient from "./AbstractServerClient";
import axios from 'axios';
import {nonCircularJsonStringify} from '../utils/nonCircularJsonStringify'

export default class RemoteServerClient extends AbstractServerClient {
    constructor(root = '/datastory/api') {
        super()
        this.root = root
    }

    boot(options) {
        return axios.post(this.root + '/boot', options)
    }

    run(model) {
        console.log(model)
        return axios.post(this.root + '/run', {
            model: nonCircularJsonStringify(
                model.serialize()
            )
        })        
    }
}