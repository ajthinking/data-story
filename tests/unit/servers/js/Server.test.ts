import Server from '../../../../src/servers/js/Server'

test('the JS server can boot', () => {
    let server = new Server

    expect(server.boot()).toBeInstanceOf(Object)
});