import APIClient from './APIClient';
import LocalClient from './LocalClient';

const clients = {
    APIClient,
    LocalClient
}

export default (name: string) => new clients[name]