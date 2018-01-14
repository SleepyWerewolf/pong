export default class Vector {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}

export class GameObject {
  position: Vector;
  size: Vector;

  constructor(width: number, height: number) {
    this.position = new Vector();
    this.size = new Vector(width, height);
  }

  get left() {
    return this.position.x - this.size.x / 2;
  }

  get right() {
    return this.position.x + this.size.x / 2;
  }

  get top() {
    return this.position.y - this.size.y / 2;
  }

  get bottom() {
    return this.position.y + this.size.y / 2;
  }
}

export class Ball extends GameObject {
  velocity: Vector;

  constructor() {
    super(10, 10);
    this.velocity = new Vector();
  }
}

export class Player extends GameObject {
  private score: number;

  constructor() {
    super(20, 100);
    this.score = 0;
  }
}
