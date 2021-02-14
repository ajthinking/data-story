import RemoteServerClient from '../servers/RemoteServerClient';
import LocalServerClient from '../servers/LocalServerClient';

export default (name) => {
    let servers = {
        RemoteServerClient,
        LocalServerClient
    }

    let selected = servers[name]

    return new selected
}