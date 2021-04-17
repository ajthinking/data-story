import { DefaultPortModel, PortModelOptions} from '@projectstorm/react-diagrams';

export default class PortModel extends DefaultPortModel {
	constructor(options : any = {}) {
		super({
			...options,
            // Make id easier on humans
            id: `Port_${options.name}_on_${options.parent.options.id}}`
        } as PortModelOptions);
    }
}