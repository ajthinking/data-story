import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
// @ts-ignore
import _ from 'lodash'
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class RegExpFilter extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Filter features matching an attribute regular expression'
    outPorts = ['Passed', 'Failed']
	name = 'RegExpFilter'

    serialize() {
        let description = super.serialize()

        description.parameters.push(
            NodeParameter.make('attribute').withValue('name'),
            NodeParameter.make('expression').withValue('/test|draft|dummy/'),            
        )

        return description
    }

    async run() {
        this.output(this.matching(), 'Passed');
        this.output(this.notMatching(), 'Failed');
    }

    protected matching() {
        return this.filterByRegExp(this.input())
    }

    protected notMatching() {
        return this.filterByRegExp(this.input(), true)
    }    
    
    protected filterByRegExp(features, returnFailed = false) {
        return features.filter(feature => {
            let expression = this.getExpression()
            let column = this.getParameter('attribute').value

            return returnFailed
                ? !expression.test(feature.original[column])
                : expression.test(feature.original[column])
        })
    }

    protected getExpression() {
        let cleaned = _.trim(this.getParameter('expression').value, '/')
        return RegExp(cleaned)
    }
}