import GameObject from "./game-objects";

const PLAYER_KEY_MAP = {
  1: {
    w: 'up',
    s: 'down'
  },

  2: {
    ArrowUp: 'up',
    ArrowDown: 'down'
  }
};

export default class Player extends GameObject {
  readonly id: number;

  readonly score: number = 0;

  pressedKeys = {
    up: false,
    down: false
  };

  constructor(id: number) {
    super(20, 100);
    this.id = id;
  }

  handleKeydown(key: string) {
    const normalizedKey: string = PLAYER_KEY_MAP[this.id][key];

    if (!this.pressedKeys[normalizedKey]) {
      this.pressedKeys[normalizedKey] = true;
    }
  }

  handleKeyup(key: string) {
    const normalizedKey: string = PLAYER_KEY_MAP[this.id][key];

    if (this.pressedKeys[normalizedKey]) {
      this.pressedKeys[normalizedKey] = false;
    }
  }
}
