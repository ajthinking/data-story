import { nonCircularJsonStringify } from "./nonCircularJsonStringify";

export default class Cookie {

	static keys() : string[] {
		return Object.keys(localStorage)
	}

	static clear() {
		localStorage.clear()
	}

    static get(name: string) {
        // @ts-ignore
        return localStorage.getItem(name);
    }

	static getObject(name: string) {
		return JSON.parse(this.get(name))
	}

    static set(name: string, value: string) {
        // @ts-ignore
        localStorage.setItem(name, value);
    }

    static setObject(name: string, value: object) {
        // @ts-ignore
        localStorage.setItem(
			name,
			nonCircularJsonStringify(value, null, 4)
		);
    }	
}