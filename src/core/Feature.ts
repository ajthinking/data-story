export default class Feature {
    public original: any;

	constructor(original: any) {
        this.original = original
    }

    public get(property: string) {
        return this.interpretProperty(
            this.original[property]            
        )
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

    protected interpretProperty(parametric) {
        let matches = parametric.match(/\{\{[\.a-zA-Z\s_]*\}\}/g)
        if(matches.length > 0) {

            for(let match of matches) {

                let originalMatch = match

                let parts = match.replace('{{', '')
                    .replace('}}', '')
                    .trim()
                    .split('.')
                
                parts.shift() // Remove 'feature'

                let interpreted = parts.reduce((carry, property) => {
                    return carry[property]
                }, this.original)

                parametric = parametric.replace(originalMatch, interpreted)
            }
        }

        return parametric
    }    
}