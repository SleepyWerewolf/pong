import { Ball, Player, GameObject } from './game-objects';
import { GAME_OBJECT_COLOR, BACKGROUND_COLOR } from './constants';
export default class Pong {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private ball: Ball;
  private players: Array<Player>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    const ball = new Ball();
    ball.position.x = 10;
    ball.position.y = 25;
    ball.velocity.x = 100;
    ball.velocity.y = 100;

    this.ball = ball;

    this.players = [
      new Player(),
      new Player()
    ];
  }

  init(): void {
    this.animate();
  }

  private updateBall(delta: number): void {
    this.ball.position.x += this.ball.velocity.x * delta;
    this.ball.position.y += this.ball.velocity.y * delta;

    if (this.ball.left < 0 || this.ball.right > this.context.canvas.width) {
      this.ball.velocity.x *= -1;
    }

    if (this.ball.top < 0 || this.ball.bottom > this.context.canvas.height) {
      this.ball.velocity.y *= -1;
    }
  }

  private drawGameObject({ position, size }: GameObject): void {
    const { context } = this;

    context.fillStyle = GAME_OBJECT_COLOR;
    context.fillRect(position.x, position.y, size.x, size.y);
  }

  private drawFrame(): void {
    const { context, ball } = this;

    // Draw background
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // Draw players
    this.players.forEach(player => this.drawGameObject(player));

    // Draw ball
    this.drawGameObject(this.ball);
  }

  private animate(): void {
    let lastTime;

    const rafCallback = (ms: number): void => {
      if (lastTime) {
        this.updateBall((ms - lastTime) / 1000);
        this.drawFrame();
      }

      lastTime = ms;
      requestAnimationFrame(rafCallback);
    }

    requestAnimationFrame(rafCallback);
  }
}