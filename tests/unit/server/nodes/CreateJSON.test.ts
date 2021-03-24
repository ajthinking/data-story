import CreateJSON from '../../../../src/server/nodes/CreateJSON'
import Diagram from '../../TestableServerDiagram';

test('it can test nodes', async () => {
    Diagram.test().node(CreateJSON)//.assertCanRun()
});