import CreateGrid from './nodes/CreateGrid'
import Comment from './nodes/Comment'
import HTTPRequest from './nodes/HTTPRequest'
import CreateJSON from './nodes/CreateJSON'
import CreateSequence from './nodes/CreateSequence'
import Inspect from './nodes/Inspect'
import RegExpFilter from './nodes/RegExpFilter'
import DeleteRepositories from './nodes/github/DeleteRepositories'
import Repositories from './nodes/github/Repositories'
import Sleep from './nodes/Sleep'

export default class ServerNodeFactory {
    protected static nodes = {
        Comment,
        CreateGrid,
        CreateSequence,
        CreateJSON,
        DeleteRepositories,
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

    static make(type: string) {
        return new (this.find(type))
    }

    static hydrate(node, diagram) {
        return this.find(node.options.serverNodeType).hydrate(node, diagram)
    }
}