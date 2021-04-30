import OutputProvider from '../../../../src/server/nodes/OutputProvider'
import Diagram from '../../TestableServerDiagram';

test.skip('something something', async () => {
    let node = Diagram.test().node(OutputProvider)
        .parameters({})

    await node.assertCanRun()
});