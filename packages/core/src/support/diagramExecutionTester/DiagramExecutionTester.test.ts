import { it } from 'vitest'
import { Create } from '../../computers'
import { whenRunning } from './DiagramExecutionTester'
import { core } from '../../core'

it('can test diagram executions like this', async () => {
  const app = await core.boot()
  const diagram = app.getDiagramBuilder()
    .add('Create')
    .get()

  await whenRunning(diagram)
    .expectSuccess()
    .ok()
})