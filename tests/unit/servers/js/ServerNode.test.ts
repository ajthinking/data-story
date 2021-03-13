import ServerNode from '../../../../src/servers/js/ServerNode'

test('it can instantiate DUMMY', () => {
    let node = new ServerNode(null)

    expect(node).toBeInstanceOf(ServerNode)
});