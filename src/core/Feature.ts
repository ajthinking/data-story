export default class Feature {
    public original: any;

	constructor(original: any) {
        this.original = original
    }

    public get(property: string) {
        return this.original[property]
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