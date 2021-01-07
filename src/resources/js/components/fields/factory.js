import Number from './Number'
import JSON_ from './JSON_'
import String_ from './String_'

const fields = {
    JSON_,
    Number,
    String_
}

export default (fieldType) => {
    return fields[fieldType]
}