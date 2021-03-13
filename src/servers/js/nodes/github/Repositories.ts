import { NodeDescription } from "../../../../core/NodeDescription";
import HTTPRequest from "../HTTPRequest";

export default class Repositories extends HTTPRequest {
    public static category: string = 'Github'
    public static summary = 'Fetch github repositores' 

    static describe() : NodeDescription {
        let description = super.describe()

        let urlParam = description.parameters.find(p => p.name == 'url')
        urlParam.value = 'https://api.github.com/users/ajthinking/repos'

        return description
    }    
}