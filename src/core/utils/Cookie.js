export default class Cookie {

    static get(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    static set(name, value) {
        localStorage.setItem(name, value);
    }
}