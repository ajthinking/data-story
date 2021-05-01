// import Alert from './nodes/Alert'
// import Comment from './nodes/Comment'
import Create from './nodes/Create'
import CreateGrid from './nodes/CreateGrid'
import CreateAttribute from './nodes/CreateAttribute'
import CreateJSON from './nodes/CreateJSON'
import CreateSequence from './nodes/CreateSequence'
import DownloadJSON from './nodes/DownloadJSON'
import Evaluate from './nodes/Evaluate'
import Flatten from './nodes/Flatten'
import HTTPRequest from './nodes/HTTPRequest'
import Inspect from './nodes/Inspect'
import Log from './nodes/Log'
import Map from './nodes/Map'
import OutputProvider from './nodes/OutputProvider'
import RegExpFilter from './nodes/RegExpFilter'
import DeleteRepositories from './nodes/github/DeleteRepositories'
import Repositories from './nodes/github/Repositories'
import Sleep from './nodes/Sleep'
import ThrowError from './nodes/ThrowError'

import { SerializedNodeModel } from '../core/types/SerializedNodeModel'

export default class ServerNodeFactory {
    protected static nodes = {
		// Alert,
        // Comment,
        Create,
        CreateAttribute,
        CreateGrid,
		CreateJSON,
        CreateSequence,
        
        DeleteRepositories,
        DownloadJSON,
        Evaluate,
        Flatten,
        HTTPRequest,
        Inspect,
        Log,
        Map,
		OutputProvider,
        RegExpFilter,
        Repositories,
        Sleep,
		ThrowError,
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

    static hydrate(node: SerializedNodeModel, diagram = null) {
		const type = this.find(node.options.serverNodeType)

        return new type({
			...node,
			diagram
		})
    }
}