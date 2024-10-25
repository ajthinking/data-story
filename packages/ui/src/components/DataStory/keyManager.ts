import { Subject } from 'rxjs';

export class KeyManager {
  activeKeys: Set<string> = new Set();
  subject = new Subject<string[]>();

  constructor() {
  }

  removeEventListeners(): void {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    window.removeEventListener('blur', this.resetHandler.bind(this));
    window.removeEventListener('contextmenu', this.resetHandler.bind(this));
  }

  initEventListeners(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    window.addEventListener('blur', this.resetHandler.bind(this));
    window.addEventListener('contextmenu', this.resetHandler.bind(this));
  }

  private resetHandler(): void {
    this.activeKeys.clear();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const keys = this.getKeys(event);
    keys.forEach(key => this.activeKeys.add(key));
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const keys = this.getUpKeys(event);
    keys.forEach(key => {
      this.activeKeys.delete(key);
    });

    this.subject.next(Array.from(this.activeKeys));
  }

  private getKeys(event: KeyboardEvent): string[] {
    const keys: string[] = [];

    if (event.shiftKey) keys.push('Shift');
    if (event.ctrlKey) keys.push('Control');
    if (event.altKey) keys.push('Alt');
    if (event.metaKey) keys.push('Meta');

    if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) {
      keys.push(event.key);
    }

    return keys;
  }

  private getUpKeys(event: KeyboardEvent): string[] {
    const keys: string[] = [];

    keys.push(event.key);

    return keys;
  }
}

export const keyManager = new KeyManager();
