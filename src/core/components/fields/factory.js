import Boolean_ from './Boolean_'
import Number from './Number'
import JSON_ from './JSON_'
//import Sheet from './Sheet'
import String_ from './String_'
import Where from './Where'

const fields = {
    Boolean_,
    JSON_,
    Number,
    //Sheet,
    String_,
    Where,
}

export default (fieldType) => {
    return fields[fieldType]
}