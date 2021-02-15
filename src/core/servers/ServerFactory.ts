import RemoteServerClient from '../servers/RemoteServerClient';
import LocalServerClient from '../servers/LocalServerClient';

const servers = {
    RemoteServerClient,
    LocalServerClient
}

export default (name: string) => new servers[name]