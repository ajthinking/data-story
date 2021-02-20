import Create from './nodes/Create'

const nodes = {
    Create
}

export default (type) => {
    return nodes[type]
}