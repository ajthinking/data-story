import Number from './Number'
import JSON_ from './JSON_'
import String_ from './String_'
import Where from './Where'

const fields = {
    JSON_,
    Number,
    String_,
    Where,
}

export default (fieldType) => {
    return fields[fieldType]
}