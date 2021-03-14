import Server from '../../../src/server/Server'

test('the JS server can boot', () => {
    let server = new Server

    expect(server.boot()).toBeInstanceOf(Object)
});