import { it } from 'vitest'
import { CreateJson } from '../../computers'
import { DiagramBuilder } from '../../DiagramBuilder'
import { whenRunning } from './DiagramExecutionTester'

it('can test diagram executions like this', async () => {
  const diagram = new DiagramBuilder()
    .add(CreateJson)
    .get()

  await whenRunning(diagram)
    .expectSuccess()
    .ok()
})