import Create from './nodes/Create'
import Inspect from './nodes/Inspect'

const nodes = {
    Create,
    Inspect,
}

export default (type) => {
    return nodes[type]
}