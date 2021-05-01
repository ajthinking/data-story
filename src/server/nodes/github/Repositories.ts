import ServerNodeInterface from "../../ServerNodeInterface";
import HTTPRequest from "../HTTPRequest";

export default class Repositories extends HTTPRequest implements ServerNodeInterface {
    category: string = 'Github'
    summary = 'Fetch github repositores'
	name = 'Repositories'

    serialize() {
        let description = super.serialize()

        let urlParam = description.parameters.find(p => p.name == 'url')
        urlParam.value = 'https://api.github.com/users/ajthinking/repos'

        return description
    }    
}