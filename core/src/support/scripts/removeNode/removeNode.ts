import fs from 'fs';

const NODE_ROOT = 'core/computers';

const name = process.argv[2];
if (!name) {
  console.error('Please provide a name to remove');
  process.exit(1);
}

// Remove the directory
const directoryName = `${NODE_ROOT}/${name}`;
fs.rmSync(directoryName, { recursive: true })

// Remove the file in the global index
const indexFileName = `${NODE_ROOT}/index.ts`;
const importStatement = `export { ${name} } from './${name}';\n`;
const indexFileContent = fs.readFileSync(indexFileName, 'utf8');
fs.writeFileSync(
  indexFileName,
  indexFileContent.replace(importStatement, '')
);

console.log(`Removed ${name} from ${NODE_ROOT}`)

export {}