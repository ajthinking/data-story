import type { NextApiRequest, NextApiResponse } from 'next'
import { Something } from '@data-story/nodejs-nodes'

//import { nodeStuff } from '@data-story/core/dist/nodeStuff';
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({
    message: 'Hello from Next.js!',
    x: 'Something',
    y: Something,
  })
}