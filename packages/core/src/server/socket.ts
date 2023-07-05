#!/usr/bin/env node
require('dotenv').config({ path: `.env.local` })
import WebSocket from 'ws'
import { onMessage } from './onMessage'

const wsServer = new WebSocket.Server({
  port: 3100,
})

wsServer.on("connection", function(ws) {
  ws.on("message", (msg: string) => onMessage(ws, msg))

  ws.on("close", function() {
    console.log("Client disconnected 😢")
  })

  ws.on("error", function(error) {
    console.log("Error 😱", error)
  })

  console.log("Client connected 💓")
})