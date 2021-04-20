import Create from '../../../../src/server/nodes/Create'
import Diagram from '../../TestableServerDiagram';

test.skip('something something', async () => {
    let node = Diagram.test().node(Create)
        .parameters({})

    await node.assertCanRun()
});