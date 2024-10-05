import { window } from 'vscode';
import { MessageHandler } from '../MessageHandler';

export const onToast: MessageHandler = async ({ event }) => {
  const toastEvent = event as {
    message: string,
    status: 'success' | 'error'
  };

  if (toastEvent.status === 'success') {
    console.log(toastEvent.message);
    window.showInformationMessage(toastEvent.message, {

    });
  } else {
    console.error(toastEvent.message);
    window.showErrorMessage(toastEvent.message);
  }
};
