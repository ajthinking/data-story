export default class NodeParameter {
    name: string                    
    fieldType: string = "String_"
    placeholder?: string
    value: any = ''

    constructor(name: string) {
        this.name = name;
    }

    static make(name: string) {
        return new this(name)
    }

	static json(name: string) {
		return this.make(name).withFieldType('JSON_')
	}

	static number(name: string) {
		return this.make(name).withFieldType('Number')
	}

	static string(name: string) {
		return this.make(name).withFieldType('String_')
	}
	
	static js(name: string) {
		return this.make(name).withFieldType('JS')
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