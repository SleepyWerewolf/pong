import Ball from './objects/ball';
import Player from './objects/player';
import GameObject from './objects/game-objects';
import Input from './services/input';

const BACKGROUND_COLOR = <string> '#000';
const GAME_OBJECT_COLOR = <string> '#fff';
const PLAYER_SPEED = <number> 5;
const BALL_HORIZONTAL_SPEED = <number> 300;
const BALL_VERTICAL_SPEED = <number> 100;
const START_ROUND_TIMEOUT = <number> 4000;

function generateDirection(): number {
  return (Math.random() > .5 ? 1 : -1);
}

/**
 * Once initialized, the Pong object starts an animation loop
 * that does 2 things every loop:
 *  1. Update the game state (i.e. state of ball and players)
 *  2. Draw a new frame
 */
export default class Pong {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private ball: Ball;
  private players: Array<Player>;
  private input: Input;
  private scores: Array<number>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    const ball = new Ball();
    this.ball = ball;
    this.resetRound();

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

    this.scores = [0, 0]
    this.players = [player1, player2];

    this.startRound();
  }

  init(): void {
    this.animate();
  }

  private updateState(state): void {
    this.updatePlayers();
    this.updateBall(state.delta);
  }

  private updatePlayers(): void {
    this.players.forEach(player => {
      let newPosition = player.position.y;
      const { pressedKeys } = player;

      if (pressedKeys.up) {
        newPosition -= PLAYER_SPEED;
      } else if (pressedKeys.down) {
        newPosition += PLAYER_SPEED;
      }

      if (newPosition - 50 > 0 && newPosition + 50 < this.canvas.height) {
        player.position.y = newPosition;
      }
    });
  }

  private isColliding(player, ball): boolean {
    return player.left < ball.right
      && player.right > ball.left
      && player.top < ball.bottom
      && player.bottom > ball.top;
  }

  private updateScore(ballVelocity: number): void {
    const playerThatScored = ballVelocity > 0 ? 0 : 1;
    this.scores[playerThatScored] += 1;
    console.log(this.scores);
  }

  private resetRound(): void {
    this.ball.velocity.x = 0;
    this.ball.velocity.y = 0;
    this.ball.position.x = this.canvas.width / 2;
    this.ball.position.y = this.canvas.height / 2;
  }

  private startRound(): void {
    let secondsLeft = 3;
    const intervalId = setInterval(() => {
      if (secondsLeft === 0) {
        console.log('GO!!!');
      } else {
        console.log(secondsLeft--);
      }
    }, 1000);

    setTimeout(() => {
      this.ball.velocity.x = BALL_HORIZONTAL_SPEED * generateDirection();
      this.ball.velocity.y = BALL_VERTICAL_SPEED * generateDirection();
      clearInterval(intervalId);
    }, START_ROUND_TIMEOUT);
  }

  private updateBall(delta: number): void {
    this.ball.position.x += this.ball.velocity.x * delta;
    this.ball.position.y += this.ball.velocity.y * delta;

    // Horizontal boundary check
    if (this.ball.left < 0 || this.ball.right > this.context.canvas.width) {
      this.updateScore(this.ball.velocity.x);
      this.resetRound();
      this.startRound();
    }

    // Vertical boundary check
    if (this.ball.top < 0 || this.ball.bottom > this.context.canvas.height) {
      this.ball.velocity.y *= -1;
    }

    // Collision detection
    if (
      this.isColliding(this.players[0], this.ball) ||
      this.isColliding(this.players[1], this.ball)
    ) {
      this.ball.velocity.x *= -1;
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