import { DefaultPortModel } from '@projectstorm/react-diagrams';

export default class PortModel extends DefaultPortModel {
	constructor(options) {
		super({
			...options,
            // Make id easier on humans
            id: `Port_${options.name}_on_${options.parent.options.id}}`
        });
    }
}