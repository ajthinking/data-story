import { NodeStatus, ObserveNodeStatus, RequestObserverType } from '@data-story/core'
import { MessageHandler, MessageHandlerParams } from '../MessageHandler'

export const observeNodeStatus: MessageHandler<ObserveNodeStatus> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<ObserveNodeStatus>) => {
  console.log('observeNodeStatus', data)
  inputObserverController.addNodeStatusObserver({
    ...data,
    onReceive: ({nodes}) => {
      ws.send(JSON.stringify({
        nodes,
        type: RequestObserverType.observeNodeStatus,
        // @ts-ignore
        msgId: data!.msgId
      }))
    }
  })
}