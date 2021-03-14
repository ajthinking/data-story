import ServerNode from '../../../src/server/ServerNode'

test('it can instantiate DUMMY', () => {
    let node = new ServerNode(null)

    expect(node).toBeInstanceOf(ServerNode)
});