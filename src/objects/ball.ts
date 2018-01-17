import GameObject from "./game-objects";
import Vector from "./vector";

export default class Ball extends GameObject {
  velocity: Vector;

  constructor() {
    super(10, 10);
    this.velocity = new Vector();
  }
}
