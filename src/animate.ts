import generateNewPosition from './generateNewPosition';

function updateItem(delta: number, item, context) {
  const { x, y } = generateNewPosition(delta, item, context);

  item.position.x = x;
  item.position.y = y;

  context.fillStyle = '#000';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  context.fillStyle = '#fff';
  context.fillRect(item.position.x, item.position.y, item.size.x, item.size.y);
}

export default function animate(item, context) {
  let lastTime;

  function animateCallback(ms) {
    if (lastTime) {
      updateItem((ms - lastTime) / 1000, item, context);
    }

    lastTime = ms;
    requestAnimationFrame(animateCallback);
  }

  requestAnimationFrame(animateCallback);
}
