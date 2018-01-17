import Ball from './objects/ball';
import Player from './objects/player';
import GameObject from './objects/game-objects';
import Input from './services/input';

const BACKGROUND_COLOR = <string>'#000';
const GAME_OBJECT_COLOR = <string>'#fff';

export default class Pong {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private ball: Ball;
  private players: Array<Player>;
  private input: Input;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    const ball = new Ball();
    ball.position.x = 10;
    ball.position.y = 25;
    ball.velocity.x = 100;
    ball.velocity.y = 100;

    this.ball = ball;

    const middle = this.canvas.height / 2;

    const player1 = new Player(1);
    player1.position.x = 40;
    player1.position.y = middle;

    const player2 = new Player(2);
    player2.position.x = this.canvas.width - 40;
    player2.position.y = middle;

    const input = new Input();
    input.addListener(player1);
    input.addListener(player2);

    this.players = [ player1, player2 ];
  }

  init(): void {
    this.animate();
  }

  private updateState(state): void {
    this.updateBall(state.delta);
    this.updatePlayers();
  }

  private updatePlayers(): void {
    this.players.forEach(player => {
      let newPosition = player.position.y;
      const { pressedKeys } = player;

      if (pressedKeys.up) {
        newPosition -= 10;
      } else if (pressedKeys.down) {
        newPosition += 10;
      }

      if (newPosition - 50 > 0 && newPosition + 50 < this.canvas.height) {
        player.position.y = newPosition;
      }
    });
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

  private drawGameObject({
    left,
    top,
    size: { x, y }
  }: GameObject): void {
    const { context } = this;

    context.fillStyle = GAME_OBJECT_COLOR;
    context.fillRect(left, top, x, y);
  }

  private drawFrame(): void {
    const { context } = this;

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
        this.updateState({ delta: (ms - lastTime) / 1000 });
        this.drawFrame();
      }

      lastTime = ms;
      requestAnimationFrame(rafCallback);
    }

    requestAnimationFrame(rafCallback);
  }
}