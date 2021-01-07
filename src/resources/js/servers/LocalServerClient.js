import AbstractServerClient from "./AbstractServerClient";

export default class LocalServerClient extends AbstractServerClient {
    sayHi() {
        alert("HI!")
    }
}