import Comment from '../../../../src/server/nodes/Comment'
import Diagram from '../../TestableServerDiagram';

test('comment node', async () => {
    let node = Diagram.test().node(Comment)

    await node.assertCanRun()
});