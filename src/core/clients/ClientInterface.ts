import DiagramModel from "../DiagramModel";

export default interface ClientInterface {
    boot(options: object): Promise<any>
    run(model: DiagramModel): Promise<any>
    save(name: string, model: DiagramModel): Promise<any>
}