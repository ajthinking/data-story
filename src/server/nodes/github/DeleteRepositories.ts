import ServerNodeInterface from "../../ServerNodeInterface";
import HTTPRequest from "../HTTPRequest";

export default class DeleteRepositories extends HTTPRequest implements ServerNodeInterface {
    category: string = 'Github'
    summary = 'Delete github repositores'
	name = 'DeleteRepositories'

    serialize() {
        let description = super.serialize()

        let verbParam = description.parameters.find(p => p.name == 'verb')
        verbParam.value = 'DELETE'
        let urlParam = description.parameters.find(p => p.name == 'url')
        urlParam.value = 'https://api.github.com/repos/ajthinking/draft-401'
        let configParam = description.parameters.find(p => p.name == 'config')
        configParam.value = '{"headers": {"Authorization": "token 6e4a621b77aed8d79849c0fbc32362cf326e8a97"}}'        

        return description
    }    
}