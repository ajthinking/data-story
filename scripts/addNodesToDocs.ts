import { promises as fs } from 'fs'
import { nodes } from '../packages/core/src'

const template = (name: string) => `
# ${name}

import NodeDemo from '../../components/demos/NodeDemo'

<NodeDemo nodeName={'${name}'} />
`;

(async () => {
  const existing = await fs.readdir('./packages/docs/pages/nodes')

  const candidates = Object.keys(nodes)

  for(const candidate of candidates) {
    if(!existing.includes(`${candidate}.mdx`)) {
      console.log(`Adding docs for ${candidate}`)

      await fs.writeFile(
        `./packages/docs/pages/nodes/${candidate}.mdx`,
        template(candidate)
      )
    }
  }
})()