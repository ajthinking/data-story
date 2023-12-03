import { promises as fs } from 'fs'
import { FileStorage } from './FileStorage';

describe('init', async () => {
  it('creates the root and executions directories', async () => {
    const mkdir = vi.spyOn(fs, 'mkdir')
      .mockResolvedValue(undefined);
    
    const root = `${__dirname}/.datastory`
    const storage = new FileStorage(root)

    await storage.init()

    expect(mkdir).toHaveBeenCalledWith(
      `${__dirname}/.datastory`,
      { recursive: true }
    )
  })
})