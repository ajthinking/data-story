export default class Feature {
	constructor(public original: any = null) {}

    public get(property: string) {
        return this.original[property]
    }

    public set(property: string, value: any) {
        this.original[property] = value
        return this
    }    

    public type() {
        return typeof this.original
    }

    public unbox() {
        if(this.type() == 'object') {
            return this.original
        }

        return this.original
    }    
}