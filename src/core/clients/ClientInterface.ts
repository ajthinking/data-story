export default interface ClientInterface {
    boot(options: object): Promise<any>
    run(model): Promise<any>
    save(name: string, model): Promise<any>
}