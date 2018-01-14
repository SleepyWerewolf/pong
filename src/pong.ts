import { Ball } from './shapes';

export default class Pong {
  private canvas: HTMLCanvasElement;
  private context;
  private ball: Ball;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    const ball = new Ball();
    ball.position.x = 10;
    ball.position.y = 25;
    ball.velocity.x = 100;
    ball.velocity.y = 100;

    this.ball = ball;
  }

  init() {
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

  private drawFrame(): void {
    const { context, ball } = this;

    // Draw background
    context.fillStyle = '#000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // Draw ball
    context.fillStyle = '#fff';
    context.fillRect(ball.position.x, ball.position.y, ball.size.x, ball.size.y);
  }

  private animate() {
    let lastTime;

    const rafCallback = (ms: number) => {
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