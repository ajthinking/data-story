import { MessageHandler } from '../MessageHandler';
import { createAndBootApp } from '../app/createAndBootApp';

export const onGetNodeDescriptions: MessageHandler = async ({ event, postMessage }) => {
  const app = await createAndBootApp();

  postMessage({
    ...event,
    awaited: true,
    availableNodes: app.descriptions(),
  });
};