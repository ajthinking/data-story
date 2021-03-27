import CreateJSON from '../../../../src/server/nodes/CreateJSON'
import Diagram from '../../TestableServerDiagram';

test('it can test nodes', async () => {
    let node = Diagram.test().node(CreateJSON)
        
    await node.assertCanRun()
    await node.assertOutput([{resource: 'todos'}])
});


// // ALTERNATIVE
// test('it can test nodes', async () => {
//     await Diagram.test().node(CreateJSON)
//         .parameters({x: 123})
//         .assertCanRun()
//         .assertOutput([{resource: 'todos'}])
//         .run()
// });