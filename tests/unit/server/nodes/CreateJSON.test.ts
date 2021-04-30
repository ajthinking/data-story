import CreateJSON from '../../../../src/server/nodes/CreateJSON'
import Diagram from '../../TestableServerDiagram';

it.skip('will parse supplied json', async () => {
    let node = Diagram.test().node(CreateJSON)
        .parameters({
            features: '[{"foo": "bar"}]'
        })

    await node.assertCanRun()
    await node.assertOutput([{foo: 'bar'}])
});