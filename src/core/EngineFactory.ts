import createEngine from '@projectstorm/react-diagrams';
import NodeModelFactory from './NodeModelFactory'
import DiagramModel from './DiagramModel'

export default class EngineFactory {
    static loadOrCreate(serializedModel = null) {
        return serializedModel ? this.load(serializedModel) : this.default();
    }

    static load(serializedModel) {
        let engine = this.getEngine()
        let model = new DiagramModel();
           
		serializedModel = typeof serializedModel == 'string' ? JSON.parse(serializedModel) : serializedModel
        model.deserializeModel(serializedModel, engine);

        engine.setModel(model)

        return engine
    }

    static default() {        
        let engine = this.getEngine()
        
        const state : any = engine.getStateMachine().getCurrentState();
        state.dragNewLink.config.allowLooseLinks = false;

        engine.getNodeFactories().registerFactory(new NodeModelFactory() as any);
        
        let model = new DiagramModel();
        
        engine.setModel(model)
        
        return engine        
    }

    static getEngine() {
        let engine = createEngine();
        
        engine.getNodeFactories().registerFactory(new NodeModelFactory() as any);

        return engine
    }


}