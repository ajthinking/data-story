import HTTPRequest from './nodes/HTTPRequest'
import Create from './nodes/Create'
import Inspect from './nodes/Inspect'
import RegExpFilter from './nodes/RegExpFilter'
import Repositories from './nodes/github/Repositories'
import Sleep from './nodes/Sleep'

export default class ServerNodeFactory {
    protected static nodes = {
        Create,
        HTTPRequest,
        Inspect,
        RegExpFilter,
        Repositories,
        Sleep,
    }

    static find(type: string) {
        return this.nodes[type]
    }

    static all() {
        return Object.values(this.nodes)
    }

    static hydrate(node, diagram) {
        return this.find(node.options.serverNodeType).hydrate(node, diagram)
    }
}