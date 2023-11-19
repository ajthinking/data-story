import axios from 'axios';
import { when } from '../../support/computerTester/ComputerTester';
import { Request } from './Request';
vi.mock('axios')

it('outputs items at data by default when using GET', async () => {
  (axios.get as any).mockResolvedValue({
    data: [{i: 1}, {i: 2}, {i: 3}]
  })

  await when(Request)
    .hasDefaultParams()
    .doRun()
    .expectOutputs({
      items: [{i: 1}, {i: 2}, {i: 3}]
    })
    .ok()
})

it('outputs items at data by default when using POST', async () => {
  (axios.post as any).mockResolvedValue({
    data: [{i: 1}, {i: 2}, {i: 3}]
  })

  await when(Request)
    .hasParams({ method: 'POST' })
    .doRun()
    .expectOutputs({
      items: [{i: 1}, {i: 2}, {i: 3}]
    })
    .ok()
})

// it.todo('can exhaust itself to a complete state', async () => {
//   (axios.get as any).mockResolvedValue({
//     data: [{i: 1}, {i: 2}, {i: 3}]
//   })

//   await when(Request)
//     .hasDefaultParams()
//     .doRun()
//     .expectOutputs({
//       items: [{i: 1}, {i: 2}, {i: 3}]
//     })
//     .doRun()
//     .expectDone()
//     .ok()
// })
