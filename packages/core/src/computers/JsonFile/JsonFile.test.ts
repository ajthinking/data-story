import { when } from '../../support/computerTester/ComputerTester';
import { JsonFile } from './JsonFile';
import { promises as fs } from 'fs'

it('parses the json and outputs it', async () => {
  const readFile = vi.spyOn(fs, 'readFile')
    .mockResolvedValue(JSON.stringify([{ "n": 1337 }]));

  await when(JsonFile)
    .hasParams({
      path: 'test.json',
    })
    .doRun()
    .expectOutputs({ items: [{ n: 1337 }] })
    .ok()
});

it('wraps non array json in array', async () => {
  const readFile = vi.spyOn(fs, 'readFile')
    .mockResolvedValue('{ "name": "Al" }');

  await when(JsonFile)
    .hasParams({
      path: 'test.json',
    })
    .doRun()
    .expectOutputs({
      items: [{ name: 'Al' }]
    })
    .ok()
});

it('outputs the error message if we cant parse the json', async () => {
  const readFile = vi.spyOn(fs, 'readFile')
    .mockResolvedValue('This is invalid JSON 🔥');

  await when(JsonFile)
    .hasParams({
      path: 'test.json',
    })
    .doRun()
    .expectOutputs({
      items: [],
      error: [{
        error: 'Unexpected token T in JSON at position 0'
      }],
    })
    .ok()
});

it('outputs error message if we cant find the file', async () => {
  const readFile = vi.spyOn(fs, 'readFile')
    .mockRejectedValue(new Error('File not found'));

  await when(JsonFile)
    .hasParams({
      path: 'test.json',
    })
    .doRun()
    .expectOutputs({
      items: [],
      error: [{
        error: 'File not found'
      }],
    })
    .ok()
});
