import { when } from '../../support/computerTester/ComputerTester';
import { ListFiles } from './ListFiles';
import { Dirent, promises as fs } from 'fs';

vi.mock('fs')

it('outputs nothing when no files or directories are found', async () => {
  vi.mocked(fs.readdir).mockResolvedValue([])

  await when(ListFiles)
    .hasParams({ path: '/some/path' })
    .getsInput([{}])
    .doRun()
    .expectOutput([])
    .ok()
})

it('outputs objects when files and directories are found', async () => {
  vi.mocked(fs.readdir).mockResolvedValue([
    {
      name: 'file1',
      isDirectory: () => false,
    },
    {
      name: 'dir1',
      isDirectory: () => true,
    },    
  ] as Dirent[])

  await when(ListFiles)
    .hasParams({ path: '/some/path' })
    .getsInput([{}])
    .doRun()
    .expectOutput([
      {
        name: 'file1',
        type: 'file',
        fullPath: '/some/path/file1'
      },
      {
        name: 'dir1',
        type: 'directory',
        fullPath: '/some/path/dir1'
      }
    ])
    .ok()
})
