import Create from '../../../../src/server/nodes/Create'
import Diagram from '../../TestableServerDiagram';

test.skip('that create spawns a null feature', async () => {
    let node = Diagram.test().node(Create)

    await node.assertCanRun()
    await node.assertOutput([null])    
});