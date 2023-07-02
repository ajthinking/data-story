import fs from 'fs';
import { sourceFileContent as defaultSourceFileContent } from './sourceFileContent';
import { testFileContent } from './testFileContent';
import { guessComputerContent } from './guessComputerContent';
const dotenv = require('dotenv');

(async () => {
  dotenv.config({ path: `.env.local` })
  const NODE_ROOT = 'core/computers';

  const name = process.argv[2];
  if (!name) {
    console.error('Please provide a name for the new computer');
    process.exit(1);
  }

  // Create the directory
  const directoryName = `${NODE_ROOT}/${name}`;
  fs.mkdirSync(directoryName, { recursive: true })

  // Create file
  const sourceFileName = `${NODE_ROOT}/${name}/${name}.ts`;
  try {
    fs.writeFileSync(
      sourceFileName, 
      // await guessComputerContent(name)
      defaultSourceFileContent(name)
    );
  } catch(error) {
    console.log(error)
    console.log("Could not get content using Chat GPT resorting to default template")
    fs.writeFileSync(sourceFileName, defaultSourceFileContent(name));
  }

  

  // Create index file
  const localIndexFileName = `${NODE_ROOT}/${name}/index.ts`;
  const localIndexFileContent = `export { ${name} } from './${name}'`
  fs.writeFileSync(localIndexFileName, localIndexFileContent);

  // Create index file
  const readmeFileName = `${NODE_ROOT}/${name}/${name}.md`;
  const readmeFileContent = `### ${name}`
  fs.writeFileSync(readmeFileName, readmeFileContent);

  // Add the file in the global index (if it doesn't exist) and sort it
  const indexFileName = `${NODE_ROOT}/index.ts`;
  const importStatement = `export { ${name} } from './${name}';`;
  const indexFileContent = fs.readFileSync(indexFileName, 'utf8');
  const alreadyImported = indexFileContent.includes(importStatement);
  if(!alreadyImported) {
    const newLines = indexFileContent.trim()
      .split('\n')
      .concat(importStatement)
      .sort()
      .join('\n')
      .concat('\n');

    fs.writeFileSync(indexFileName, newLines);
  }

  // Create testfile
  const testFileName = `${NODE_ROOT}/${name}/${name}.test.ts`;
  fs.writeFileSync(testFileName, testFileContent(name));
})()

export {}