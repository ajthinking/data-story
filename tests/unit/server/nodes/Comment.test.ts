// import Comment from '../../../../src/server/nodes/Comment'
import Diagram from '../../TestableServerDiagram';

test.skip('comment node', async () => {
    let node = Diagram.test().node(Comment)

    await node.assertCanRun()
});