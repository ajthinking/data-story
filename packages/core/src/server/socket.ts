#!/usr/bin/env node
require('dotenv').config({ path: `.env.local` })

import { core, minimal } from '../core'
import { SocketServer } from './SocketServer'

const server = new SocketServer({
  app: core,
  port: 3100
})

server.start()