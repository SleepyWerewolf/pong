import { Vector } from './classes';

function isOutOfBoundsX(position, context) {
  return position < 0 || position > context.canvas.width;
}

function isOutOfBoundsY(position, context) {
  return position < 0 || position > context.canvas.height;
}

export default function generateNewPosition(delta: number, item, context): Vector {
  const newPositionX = item.position.x + item.velocity.x * delta;

  if (isOutOfBoundsX(newPositionX, context)) {
    item.velocity.x *= -1;
  }

  const newPositionY = item.position.y + item.velocity.y * delta;

  if (isOutOfBoundsY(newPositionY, context)) {
    item.velocity.y *= -1;
  }

  return {
    x: newPositionX,
    y: newPositionY
  };
}