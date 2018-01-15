import Pong from './pong';

const canvas = <HTMLCanvasElement> document.getElementById('pong');
const pong = new Pong(canvas);

pong.init();
console.log('poop');