import { ItemValue } from './types/ItemValue';
import { Storage } from './types/Storage';
import { promises as fs } from 'fs';

export class FileStorage implements Storage {
  currentExecutionId: string | null = null

  constructor(private root: string) {}

  /**
   * Creates the directories we need if they doesn't exist
   */
  async init(): Promise<void> {
    await fs.mkdir(this.root, { recursive: true })
    await fs.mkdir(`${this.root}/executions`, { recursive: true })
  }

  async createExecution(): Promise<void> {
    const executions = `${this.root}/executions`

    const paths = await fs.readdir(executions, { withFileTypes: true })

    const folders = paths
      .filter(path => path.isDirectory())
      .map(path => path.name)
    
    const ids = folders.map(folder => parseInt(folder))

    let maxId = Math.max(...ids)

    // check for infinity, NaN, negative values etc
    if(!Number.isFinite(maxId)) maxId = 0;
    if(maxId < 0) maxId = 0;
    if(isNaN(maxId)) maxId = 0;

    const newId = maxId + 1

    await fs.mkdir(`${executions}/${newId}`)
    await fs.mkdir(`${executions}/${newId}/dumps`)

    this.currentExecutionId = newId.toString()
  }

  /**
   * Store items as pretty JSON 
   */
  async putExecutionItems(key: string, items: ItemValue): Promise<void> {
    // TODO fix this
    const path = `${this.root}/executions/${this.currentExecutionId}/dumps/${key}.json`
    const content = JSON.stringify(items, null, 2)

    await fs.writeFile(path, content)
  }

  async serialize(): Promise<{
    root: string,
    currentExecutionId: string | null,
    items: {
      [key: string]: ItemValue,
    }
  }> {
    const execution = `${this.root}/executions/${this.currentExecutionId}`

    const paths = await fs.readdir(execution, { withFileTypes: true })

    const files = paths
      .filter(path => path.isFile())
      .map(path => path.name)

    const items: { [key: string]: ItemValue } = {}

    for(const file of files) {
      const path = `${this.root}/executions/${this.currentExecutionId}/${file}`
      const content = await fs.readFile(path, 'utf-8')

      const parsed = JSON.parse(content)
      items[file.replace('.json', '')] = parsed
    }

    return {
      root: this.root,
      currentExecutionId: this.currentExecutionId,
      items
    }
  }

  async put(filename: string, content: string) {
    await fs.writeFile(`${this.root}/${filename}`, content)
  }
}