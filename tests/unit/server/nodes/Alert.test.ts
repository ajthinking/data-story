import Alert from '../../../../src/server/nodes/Alert'
import Diagram from '../../TestableServerDiagram';

test.skip('something something', async () => {
    let node = Diagram.test().node(Alert)
        .parameters({})

    await node.assertCanRun()
});