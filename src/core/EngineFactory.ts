import createEngine, { DiagramEngine } from '@projectstorm/react-diagrams';
import NodeModelFactory from './NodeModelFactory'
import DiagramModel from './DiagramModel'
import { SerializedDiagramModel } from './types/SerializedDiagramModel';

export default class EngineFactory {
    static loadOrCreate(serializedModel?: SerializedDiagramModel) : DiagramEngine {
        return serializedModel
			? this.load(serializedModel)
			: this.default();
    }

    static load(serializedModel: SerializedDiagramModel) : DiagramEngine {
        let engine = this.getEngine()
        let model = new DiagramModel();
           
		serializedModel = typeof serializedModel == 'string' ? JSON.parse(serializedModel) : serializedModel
        model.deserializeModel(serializedModel, engine);

        engine.setModel(model)

        return engine
    }

    static default() : DiagramEngine {        
        let engine = this.getEngine()
        
        const state : any = engine.getStateMachine().getCurrentState();
        state.dragNewLink.config.allowLooseLinks = false;

        engine.getNodeFactories().registerFactory(new NodeModelFactory() as any);
        
        let model = new DiagramModel();
        
        engine.setModel(model)
        
        return engine        
    }

    static getEngine() : DiagramEngine {
        let engine = createEngine();
        
        engine.getNodeFactories().registerFactory(new NodeModelFactory() as any);

        return engine
    }


}