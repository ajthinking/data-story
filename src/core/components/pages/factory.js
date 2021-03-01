import Inspector from './Inspector'
import Log from './Log'
import Tokens from './Tokens'
import Workbench from './Workbench'

export const pages = {
    Inspector,
    Log,
    Tokens,
    Workbench,
}

export default (pageName) => {
    return pages[pageName]
}