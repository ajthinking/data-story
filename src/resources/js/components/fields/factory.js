import Number from './Number'
import String_ from './String_'

const fields = {
    Number,
    String_
}

export default (fieldType) => {
    return fields[fieldType]
}