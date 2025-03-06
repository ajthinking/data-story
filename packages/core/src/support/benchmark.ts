import { Application } from '../Application';
import { ExecutorFactory } from '../ExecutorFactory';
import { core } from '../core';
import { coreNodeProvider } from '../coreNodeProvider';

(async () => {
  const itemCount = 1_000_000

  const data: { id: number }[] = []

  for (let i = 0; i < itemCount; i++) {
    data.push({ id: i })
  }

  const app = new Application();

  app.register([
    coreNodeProvider,
  ]);

  await app.boot();

  const diagram = core.getDiagramBuilder()
    .add('Create', { json: JSON.stringify(data) })
    .add('CreateProperties')
    .add('Ignore')
    .get()

  const executor = app.getExecutor({
    diagram,
  })

  const startTime = Date.now()

  const execution = executor.execute()

  try {
    for await(const update of execution) {}

    const endTime = Date.now()

    console.log(`Processing ${itemCount} items. Execution time in milliseconds: `, endTime - startTime)
  } catch(error: any) {
    console.log('Error: ', error.message)
    throw error
  }
})()
