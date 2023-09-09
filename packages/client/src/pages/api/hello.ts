import type { NextApiRequest, NextApiResponse } from 'next'

import { nodeStuff } from '@data-story/core/dist/nodeStuff';

const fs = nodeStuff.fs;
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const items = await fs.readdir('./');

  res.status(200).json({
    message: 'Hello from Next.js!',
    items,
    comment: nodeStuff.comment
  })
}