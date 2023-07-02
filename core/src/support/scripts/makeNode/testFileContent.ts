export const testFileContent = (name: string) => `import { when } from '../../support/computerTester/ComputerTester';
import { ${name} } from './${name}';

it.todo('does something', async () => {
  await when(${name})
    .hasDefaultParams()
    .getsInput([{i: 1}, {i: 2}])
    .doRun()
    .expectOutput([{i: 1}, {i: 2}])
    .getsInput([{i: 3}, {i: 4}])
    .doRun()
    .expectOutput([{i: 1}, {i: 2}, {i: 3}, , {i: 4}])
    .ok()
})
`;