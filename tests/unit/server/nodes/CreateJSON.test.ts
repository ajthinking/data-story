import CreateJSON from '../../../../src/server/nodes/CreateJSON'
import Diagram from '../../TestableServerDiagram';

test('it can test nodes', async () => {
    let node = Diagram.test().node(CreateJSON)
        
    await node.assertCanRun()
    await node.assertOutput([{resource: 'todos'}])
});