export class Vector {
  x: Number;
  y: Number;

  constructor(x: Number = 0, y: Number = 0) {
    this.x = x;
    this.y = y;
  }
}

export class Rectangle {
  position: Vector;
  size: Vector;

  constructor(width: Number, height: Number) {
    this.position = new Vector();
    this.size = new Vector(width, height);
  }
}

export class Ball extends Rectangle {
  velocity: Vector;

  constructor() {
    super(10, 10);
    this.velocity = new Vector();
  }
}
