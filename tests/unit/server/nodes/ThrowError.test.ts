import ThrowError from '../../../../src/server/nodes/ThrowError'
import Diagram from '../../TestableServerDiagram';

test.skip('something something', async () => {
    let node = Diagram.test().node(ThrowError)
        .parameters({})

    await node.assertCanRun()
});