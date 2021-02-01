import AbstractServerClient from "./AbstractServerClient";

export default class LocalServerClient extends AbstractServerClient {
    sayHi() {
        alert("HI!")
    }

    boot() {
        return new Promise((callback) => {
            return callback({
                data: {
                    stories: [],
                    capabilities: {
                        availableNodes: []
                    }                    
                }
            })
        })
    }

    run() {
        return new Promise((callback) => {
            return alert("Not implemented")
            return callback({
                // data: {
                //     stories: [],
                //     capabilities: {
                //         availableNodes: []
                //     }                    
                // }
            })
        })        
    }
}