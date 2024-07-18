import { it } from 'vitest'
import { Create } from '../../computers'
import { whenRunning } from './DiagramExecutionTester'
import { core } from '../../core'

it('can test diagram executions like this', async () => {
  const diagram = core.getDiagramBuilder()
    .add(Create)
    .get()

  await whenRunning(diagram)
    .expectSuccess()
    .ok()
})