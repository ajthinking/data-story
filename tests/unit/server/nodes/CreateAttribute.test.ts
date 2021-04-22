import CreateAttribute from '../../../../src/server/nodes/CreateAttribute'
import Diagram from '../../TestableServerDiagram';

it.skip('can add attributes', async () => {
    let node = Diagram.test().node(CreateAttribute)
        // .input({})
        .parameters({
            attribute: 'something_extra',
            value: 'whatever',            
        })

    await node.assertCanRun()
    // await node.assertOutput({something_extra: 'whatever'})
});