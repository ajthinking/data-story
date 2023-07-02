import { NullStorage } from './NullStorage'

describe('init', () => {
  it('can run', async () => {
    const storage = new NullStorage()

    await storage.init()
  })
})

describe('createExecution', () => {
  it('can run', async () => {
    const storage = new NullStorage()

    await storage.createExecution()
  })
})

describe('putExecutionItems', () => {
  it('can run', async () => {
    const storage = new NullStorage()

    await storage.putExecutionItems('dummy', [{i: 1}, {i: 2}, {i: 3}])
  })
})