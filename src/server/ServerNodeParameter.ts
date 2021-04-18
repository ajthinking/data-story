export default class ServerNodeParameter {
    name: string                    
    fieldType: string = "String_"
    placeholder?: string
    value: any

    constructor(name: string) {
        this.name = name;
    }

    static make(name: string) {
        return new this(name)
    }

    withFieldType(type: string) {
        this.fieldType = type
        return this
    }

    withPlaceholder(placeholder: string) {
        this.placeholder = placeholder
        return this
    }

    withValue(value: any) {
        this.value = value
        return this
    }
}