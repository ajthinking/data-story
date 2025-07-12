import { SubscriptionLike } from 'rxjs';
import vscode from 'vscode';

export function toDisposable(subscription: SubscriptionLike) {
  return {
    dispose: () => subscription.unsubscribe(),
  } as vscode.Disposable;
}
