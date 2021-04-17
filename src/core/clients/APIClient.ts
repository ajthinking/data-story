import axios from 'axios';
import {nonCircularJsonStringify} from '../utils/nonCircularJsonStringify'
import ClientInterface from './ClientInterface'

export default class APIClient implements ClientInterface {
    constructor(
        public root: string = '/datastory/api'
    ) {}

    boot(options: object) : Promise<any>{
        return axios.post(this.root + '/boot', options)
    }

    run(model): Promise<any> {
        return axios.post(this.root + '/run', {
            model: nonCircularJsonStringify(
                model.serialize() 
            )
        })        
    }
}