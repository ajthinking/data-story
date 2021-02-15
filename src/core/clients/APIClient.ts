import axios from 'axios';
import {nonCircularJsonStringify} from '../utils/nonCircularJsonStringify'
import ClientInterface from './ClientInterface'

export default class APIClient implements ClientInterface {
    root: string

    constructor(root: string = '/datastory/api') {
        this.root = root
    }

    boot(options: object) : Promise<any>{
        return axios.post(this.root + '/boot', options)
    }

    run(model): Promise<any> {
        console.log(model)
        return axios.post(this.root + '/run', {
            model: nonCircularJsonStringify(
                model.serialize() 
            )
        })        
    }
}