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
                    dataStoryCapabilities: {
                        availableNodes: []
                    }                    
                }
            })
        })
    }

    run() {
        
    }
}