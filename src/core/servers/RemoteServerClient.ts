import AbstractServerClient from "./AbstractServerClient";
import axios from 'axios';
import {nonCircularJsonStringify} from '../../core/utils/nonCircularJsonStringify'

export default class RemoteServerClient extends AbstractServerClient {
    root: string

    constructor(root: string = '/datastory/api') {
        super()
        this.root = root
    }

    boot(options: object) {
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