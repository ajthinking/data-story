import Inspector from './Inspector'
import Log from './Log'
import Workbench from './Workbench'

export const pages = {
    Inspector,
    Log,
    Workbench,
}

export default (pageName) => {
    return pages[pageName]
}