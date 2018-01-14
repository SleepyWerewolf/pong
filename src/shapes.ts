import Vector from './vector';

export class Rectangle {
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

export class Ball extends Rectangle {
  velocity: Vector;

  constructor() {
    super(10, 10);
    this.velocity = new Vector();
  }
}
