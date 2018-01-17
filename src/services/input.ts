export default class Input {
  private listeners: Array<any> = [];

  constructor() {
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    window.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  private handleKeydown(event: KeyboardEvent) {
    this.listeners.forEach(listener => listener.handleKeydown(event.key));
  }

  private handleKeyup(event: KeyboardEvent) {
    this.listeners.forEach(listener => listener.handleKeyup(event.key));
  }
}
