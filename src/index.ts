import { Ball } from './classes';
import animate from './animate';

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

const ball = new Ball;
ball.position.x = 10;
ball.position.y = 25;
ball.velocity.x = 100;
ball.velocity.y = 100;

animate(ball, context);
