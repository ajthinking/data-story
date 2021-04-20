export default class Cookie {

    static get(name) {
        // @ts-ignore
        return JSON.parse(localStorage.getItem(name));
    }

    static set(name, value) {
        // @ts-ignore
        localStorage.setItem(name, value);
    }
}