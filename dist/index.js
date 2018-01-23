/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = __webpack_require__(1);
class GameObject {
    constructor(width, height) {
        this.position = new vector_1.default();
        this.size = new vector_1.default(width, height);
    }
    get left() {
        return this.position.x - this.size.x / 2;
    }
    get right() {
        return this.position.x + this.size.x / 2;
    }
    get top() {
        return this.position.y - this.size.y / 2;
    }
    get bottom() {
        return this.position.y + this.size.y / 2;
    }
}
exports.default = GameObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
exports.default = Vector;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pong_1 = __webpack_require__(3);
const canvas = document.getElementById('pong');
const pong = new pong_1.default(canvas);
pong.init();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ball_1 = __webpack_require__(4);
const player_1 = __webpack_require__(5);
const input_1 = __webpack_require__(6);
const BACKGROUND_COLOR = '#000';
const GAME_OBJECT_COLOR = '#fff';
const PLAYER_SPEED = 5;
const BALL_HORIZONTAL_SPEED = 300;
const BALL_VERTICAL_SPEED = 100;
const START_ROUND_TIMEOUT = 4000;
function generateDirection() {
    return (Math.random() > .5 ? 1 : -1);
}
/**
 * Once initialized, the Pong object starts an animation loop
 * that does 2 things every loop:
 *  1. Update the game state (i.e. state of ball and players)
 *  2. Draw a new frame
 */
class Pong {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        const ball = new ball_1.default();
        this.ball = ball;
        this.resetRound();
        const middle = this.canvas.height / 2;
        const player1 = new player_1.default(1);
        player1.position.x = 40;
        player1.position.y = middle;
        const player2 = new player_1.default(2);
        player2.position.x = this.canvas.width - 40;
        player2.position.y = middle;
        const input = new input_1.default();
        input.addListener(player1);
        input.addListener(player2);
        this.scores = [0, 0];
        this.players = [player1, player2];
        this.startRound();
    }
    init() {
        this.animate();
    }
    updateState(state) {
        this.updatePlayers();
        this.updateBall(state.delta);
    }
    updatePlayers() {
        this.players.forEach(player => {
            let newPosition = player.position.y;
            const { pressedKeys } = player;
            if (pressedKeys.up) {
                newPosition -= PLAYER_SPEED;
            }
            else if (pressedKeys.down) {
                newPosition += PLAYER_SPEED;
            }
            if (newPosition - 50 > 0 && newPosition + 50 < this.canvas.height) {
                player.position.y = newPosition;
            }
        });
    }
    isColliding(player, ball) {
        return player.left < ball.right
            && player.right > ball.left
            && player.top < ball.bottom
            && player.bottom > ball.top;
    }
    updateScore(ballVelocity) {
        const playerThatScored = ballVelocity > 0 ? 0 : 1;
        this.scores[playerThatScored] += 1;
        console.log(this.scores);
    }
    resetRound() {
        this.ball.velocity.x = 0;
        this.ball.velocity.y = 0;
        this.ball.position.x = this.canvas.width / 2;
        this.ball.position.y = this.canvas.height / 2;
    }
    startRound() {
        let secondsLeft = 3;
        const intervalId = setInterval(() => {
            if (secondsLeft === 0) {
                console.log('GO!!!');
            }
            else {
                console.log(secondsLeft--);
            }
        }, 1000);
        setTimeout(() => {
            this.ball.velocity.x = BALL_HORIZONTAL_SPEED * generateDirection();
            this.ball.velocity.y = BALL_VERTICAL_SPEED * generateDirection();
            clearInterval(intervalId);
        }, START_ROUND_TIMEOUT);
    }
    updateBall(delta) {
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
        if (this.isColliding(this.players[0], this.ball) ||
            this.isColliding(this.players[1], this.ball)) {
            this.ball.velocity.x *= -1;
        }
    }
    drawGameObject({ left, top, size: { x, y } }) {
        const { context } = this;
        context.fillStyle = GAME_OBJECT_COLOR;
        context.fillRect(left, top, x, y);
    }
    drawFrame() {
        const { context } = this;
        // Draw background
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        // Draw players
        this.players.forEach(player => this.drawGameObject(player));
        // Draw ball
        this.drawGameObject(this.ball);
    }
    animate() {
        let lastTime;
        const rafCallback = (ms) => {
            if (lastTime) {
                this.updateState({ delta: (ms - lastTime) / 1000 });
                this.drawFrame();
            }
            lastTime = ms;
            requestAnimationFrame(rafCallback);
        };
        requestAnimationFrame(rafCallback);
    }
}
exports.default = Pong;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_objects_1 = __webpack_require__(0);
const vector_1 = __webpack_require__(1);
class Ball extends game_objects_1.default {
    constructor() {
        super(10, 10);
        this.velocity = new vector_1.default();
    }
}
exports.default = Ball;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_objects_1 = __webpack_require__(0);
const PLAYER_KEY_MAP = {
    1: {
        w: 'up',
        s: 'down'
    },
    2: {
        ArrowUp: 'up',
        ArrowDown: 'down'
    }
};
class Player extends game_objects_1.default {
    constructor(id) {
        super(20, 100);
        this.score = 0;
        this.pressedKeys = {
            up: false,
            down: false
        };
        this.id = id;
    }
    handleKeydown(key) {
        const normalizedKey = PLAYER_KEY_MAP[this.id][key];
        if (!this.pressedKeys[normalizedKey]) {
            this.pressedKeys[normalizedKey] = true;
        }
    }
    handleKeyup(key) {
        const normalizedKey = PLAYER_KEY_MAP[this.id][key];
        if (this.pressedKeys[normalizedKey]) {
            this.pressedKeys[normalizedKey] = false;
        }
    }
}
exports.default = Player;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Input {
    constructor() {
        this.listeners = [];
        window.addEventListener('keydown', this.handleKeydown.bind(this));
        window.addEventListener('keyup', this.handleKeyup.bind(this));
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    handleKeydown(event) {
        this.listeners.forEach(listener => listener.handleKeydown(event.key));
    }
    handleKeyup(event) {
        this.listeners.forEach(listener => listener.handleKeyup(event.key));
    }
}
exports.default = Input;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTBkNmM5ZDQzYTU3N2I5NDI0MDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvZ2FtZS1vYmplY3RzLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9wb25nLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL2JhbGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsd0NBQThCO0FBRTlCO0lBSUUsWUFBWSxLQUFhLEVBQUUsTUFBYztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxnQkFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FB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V0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBUTtRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sYUFBYSxDQUFDLEtBQW9CO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU8sV0FBVyxDQUFDLEtBQW9CO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0Y7QUFuQkQsd0JBbUJDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTBkNmM5ZDQzYTU3N2I5NDI0MDkiLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT2JqZWN0IHtcbiAgcG9zaXRpb246IFZlY3RvcjtcbiAgc2l6ZTogVmVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnNpemUgPSBuZXcgVmVjdG9yKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgZ2V0IGxlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueCAtIHRoaXMuc2l6ZS54IC8gMjtcbiAgfVxuXG4gIGdldCByaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLnggLyAyO1xuICB9XG5cbiAgZ2V0IHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5zaXplLnkgLyAyO1xuICB9XG5cbiAgZ2V0IGJvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnkgLyAyO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvb2JqZWN0cy9nYW1lLW9iamVjdHMudHMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvb2JqZWN0cy92ZWN0b3IudHMiLCJpbXBvcnQgUG9uZyBmcm9tICcuL3BvbmcnO1xuXG5jb25zdCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb25nJyk7XG5jb25zdCBwb25nID0gbmV3IFBvbmcoY2FudmFzKTtcblxucG9uZy5pbml0KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLnRzIiwiaW1wb3J0IEJhbGwgZnJvbSAnLi9vYmplY3RzL2JhbGwnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL29iamVjdHMvcGxheWVyJztcbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vb2JqZWN0cy9nYW1lLW9iamVjdHMnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vc2VydmljZXMvaW5wdXQnO1xuXG5jb25zdCBCQUNLR1JPVU5EX0NPTE9SID0gPHN0cmluZz4gJyMwMDAnO1xuY29uc3QgR0FNRV9PQkpFQ1RfQ09MT1IgPSA8c3RyaW5nPiAnI2ZmZic7XG5jb25zdCBQTEFZRVJfU1BFRUQgPSA8bnVtYmVyPiA1O1xuY29uc3QgQkFMTF9IT1JJWk9OVEFMX1NQRUVEID0gPG51bWJlcj4gMzAwO1xuY29uc3QgQkFMTF9WRVJUSUNBTF9TUEVFRCA9IDxudW1iZXI+IDEwMDtcbmNvbnN0IFNUQVJUX1JPVU5EX1RJTUVPVVQgPSA8bnVtYmVyPiA0MDAwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZURpcmVjdGlvbigpOiBudW1iZXIge1xuICByZXR1cm4gKE1hdGgucmFuZG9tKCkgPiAuNSA/IDEgOiAtMSk7XG59XG5cbi8qKlxuICogT25jZSBpbml0aWFsaXplZCwgdGhlIFBvbmcgb2JqZWN0IHN0YXJ0cyBhbiBhbmltYXRpb24gbG9vcFxuICogdGhhdCBkb2VzIDIgdGhpbmdzIGV2ZXJ5IGxvb3A6XG4gKiAgMS4gVXBkYXRlIHRoZSBnYW1lIHN0YXRlIChpLmUuIHN0YXRlIG9mIGJhbGwgYW5kIHBsYXllcnMpXG4gKiAgMi4gRHJhdyBhIG5ldyBmcmFtZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb25nIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHJpdmF0ZSBiYWxsOiBCYWxsO1xuICBwcml2YXRlIHBsYXllcnM6IEFycmF5PFBsYXllcj47XG4gIHByaXZhdGUgaW5wdXQ6IElucHV0O1xuICBwcml2YXRlIHNjb3JlczogQXJyYXk8bnVtYmVyPjtcblxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBjb25zdCBiYWxsID0gbmV3IEJhbGwoKTtcbiAgICB0aGlzLmJhbGwgPSBiYWxsO1xuICAgIHRoaXMucmVzZXRSb3VuZCgpO1xuXG4gICAgY29uc3QgbWlkZGxlID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gMjtcblxuICAgIGNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyKDEpO1xuICAgIHBsYXllcjEucG9zaXRpb24ueCA9IDQwO1xuICAgIHBsYXllcjEucG9zaXRpb24ueSA9IG1pZGRsZTtcblxuICAgIGNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKDIpO1xuICAgIHBsYXllcjIucG9zaXRpb24ueCA9IHRoaXMuY2FudmFzLndpZHRoIC0gNDA7XG4gICAgcGxheWVyMi5wb3NpdGlvbi55ID0gbWlkZGxlO1xuXG4gICAgY29uc3QgaW5wdXQgPSBuZXcgSW5wdXQoKTtcbiAgICBpbnB1dC5hZGRMaXN0ZW5lcihwbGF5ZXIxKTtcbiAgICBpbnB1dC5hZGRMaXN0ZW5lcihwbGF5ZXIyKTtcblxuICAgIHRoaXMuc2NvcmVzID0gWzAsIDBdXG4gICAgdGhpcy5wbGF5ZXJzID0gW3BsYXllcjEsIHBsYXllcjJdO1xuXG4gICAgdGhpcy5zdGFydFJvdW5kKCk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTdGF0ZShzdGF0ZSk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlUGxheWVycygpO1xuICAgIHRoaXMudXBkYXRlQmFsbChzdGF0ZS5kZWx0YSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVBsYXllcnMoKTogdm9pZCB7XG4gICAgdGhpcy5wbGF5ZXJzLmZvckVhY2gocGxheWVyID0+IHtcbiAgICAgIGxldCBuZXdQb3NpdGlvbiA9IHBsYXllci5wb3NpdGlvbi55O1xuICAgICAgY29uc3QgeyBwcmVzc2VkS2V5cyB9ID0gcGxheWVyO1xuXG4gICAgICBpZiAocHJlc3NlZEtleXMudXApIHtcbiAgICAgICAgbmV3UG9zaXRpb24gLT0gUExBWUVSX1NQRUVEO1xuICAgICAgfSBlbHNlIGlmIChwcmVzc2VkS2V5cy5kb3duKSB7XG4gICAgICAgIG5ld1Bvc2l0aW9uICs9IFBMQVlFUl9TUEVFRDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1Bvc2l0aW9uIC0gNTAgPiAwICYmIG5ld1Bvc2l0aW9uICsgNTAgPCB0aGlzLmNhbnZhcy5oZWlnaHQpIHtcbiAgICAgICAgcGxheWVyLnBvc2l0aW9uLnkgPSBuZXdQb3NpdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDb2xsaWRpbmcocGxheWVyLCBiYWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHBsYXllci5sZWZ0IDwgYmFsbC5yaWdodFxuICAgICAgJiYgcGxheWVyLnJpZ2h0ID4gYmFsbC5sZWZ0XG4gICAgICAmJiBwbGF5ZXIudG9wIDwgYmFsbC5ib3R0b21cbiAgICAgICYmIHBsYXllci5ib3R0b20gPiBiYWxsLnRvcDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2NvcmUoYmFsbFZlbG9jaXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBwbGF5ZXJUaGF0U2NvcmVkID0gYmFsbFZlbG9jaXR5ID4gMCA/IDAgOiAxO1xuICAgIHRoaXMuc2NvcmVzW3BsYXllclRoYXRTY29yZWRdICs9IDE7XG4gICAgY29uc29sZS5sb2codGhpcy5zY29yZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFJvdW5kKCk6IHZvaWQge1xuICAgIHRoaXMuYmFsbC52ZWxvY2l0eS54ID0gMDtcbiAgICB0aGlzLmJhbGwudmVsb2NpdHkueSA9IDA7XG4gICAgdGhpcy5iYWxsLnBvc2l0aW9uLnggPSB0aGlzLmNhbnZhcy53aWR0aCAvIDI7XG4gICAgdGhpcy5iYWxsLnBvc2l0aW9uLnkgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyAyO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFJvdW5kKCk6IHZvaWQge1xuICAgIGxldCBzZWNvbmRzTGVmdCA9IDM7XG4gICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChzZWNvbmRzTGVmdCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnR08hISEnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlY29uZHNMZWZ0LS0pO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmJhbGwudmVsb2NpdHkueCA9IEJBTExfSE9SSVpPTlRBTF9TUEVFRCAqIGdlbmVyYXRlRGlyZWN0aW9uKCk7XG4gICAgICB0aGlzLmJhbGwudmVsb2NpdHkueSA9IEJBTExfVkVSVElDQUxfU1BFRUQgKiBnZW5lcmF0ZURpcmVjdGlvbigpO1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICB9LCBTVEFSVF9ST1VORF9USU1FT1VUKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQmFsbChkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5iYWxsLnBvc2l0aW9uLnggKz0gdGhpcy5iYWxsLnZlbG9jaXR5LnggKiBkZWx0YTtcbiAgICB0aGlzLmJhbGwucG9zaXRpb24ueSArPSB0aGlzLmJhbGwudmVsb2NpdHkueSAqIGRlbHRhO1xuXG4gICAgLy8gSG9yaXpvbnRhbCBib3VuZGFyeSBjaGVja1xuICAgIGlmICh0aGlzLmJhbGwubGVmdCA8IDAgfHwgdGhpcy5iYWxsLnJpZ2h0ID4gdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCkge1xuICAgICAgdGhpcy51cGRhdGVTY29yZSh0aGlzLmJhbGwudmVsb2NpdHkueCk7XG4gICAgICB0aGlzLnJlc2V0Um91bmQoKTtcbiAgICAgIHRoaXMuc3RhcnRSb3VuZCgpO1xuICAgIH1cblxuICAgIC8vIFZlcnRpY2FsIGJvdW5kYXJ5IGNoZWNrXG4gICAgaWYgKHRoaXMuYmFsbC50b3AgPCAwIHx8IHRoaXMuYmFsbC5ib3R0b20gPiB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCkge1xuICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnkgKj0gLTE7XG4gICAgfVxuXG4gICAgLy8gQ29sbGlzaW9uIGRldGVjdGlvblxuICAgIGlmIChcbiAgICAgIHRoaXMuaXNDb2xsaWRpbmcodGhpcy5wbGF5ZXJzWzBdLCB0aGlzLmJhbGwpIHx8XG4gICAgICB0aGlzLmlzQ29sbGlkaW5nKHRoaXMucGxheWVyc1sxXSwgdGhpcy5iYWxsKVxuICAgICkge1xuICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnggKj0gLTE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmF3R2FtZU9iamVjdCh7XG4gICAgbGVmdCxcbiAgICB0b3AsXG4gICAgc2l6ZTogeyB4LCB5IH1cbiAgfTogR2FtZU9iamVjdCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGV4dCB9ID0gdGhpcztcblxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gR0FNRV9PQkpFQ1RfQ09MT1I7XG4gICAgY29udGV4dC5maWxsUmVjdChsZWZ0LCB0b3AsIHgsIHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3RnJhbWUoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250ZXh0IH0gPSB0aGlzO1xuXG4gICAgLy8gRHJhdyBiYWNrZ3JvdW5kXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBCQUNLR1JPVU5EX0NPTE9SO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XG5cbiAgICAvLyBEcmF3IHBsYXllcnNcbiAgICB0aGlzLnBsYXllcnMuZm9yRWFjaChwbGF5ZXIgPT4gdGhpcy5kcmF3R2FtZU9iamVjdChwbGF5ZXIpKTtcblxuICAgIC8vIERyYXcgYmFsbFxuICAgIHRoaXMuZHJhd0dhbWVPYmplY3QodGhpcy5iYWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgbGFzdFRpbWU7XG5cbiAgICBjb25zdCByYWZDYWxsYmFjayA9IChtczogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgICBpZiAobGFzdFRpbWUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IGRlbHRhOiAobXMgLSBsYXN0VGltZSkgLyAxMDAwIH0pO1xuICAgICAgICB0aGlzLmRyYXdGcmFtZSgpO1xuICAgICAgfVxuXG4gICAgICBsYXN0VGltZSA9IG1zO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZkNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmQ2FsbGJhY2spO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BvbmcudHMiLCJpbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi9nYW1lLW9iamVjdHNcIjtcbmltcG9ydCBWZWN0b3IgZnJvbSBcIi4vdmVjdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGwgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgdmVsb2NpdHk6IFZlY3RvcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigxMCwgMTApO1xuICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yKCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9vYmplY3RzL2JhbGwudHMiLCJpbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi9nYW1lLW9iamVjdHNcIjtcblxuY29uc3QgUExBWUVSX0tFWV9NQVAgPSB7XG4gIDE6IHtcbiAgICB3OiAndXAnLFxuICAgIHM6ICdkb3duJ1xuICB9LFxuXG4gIDI6IHtcbiAgICBBcnJvd1VwOiAndXAnLFxuICAgIEFycm93RG93bjogJ2Rvd24nXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIEdhbWVPYmplY3Qge1xuICByZWFkb25seSBpZDogbnVtYmVyO1xuXG4gIHJlYWRvbmx5IHNjb3JlOiBudW1iZXIgPSAwO1xuXG4gIHByZXNzZWRLZXlzID0ge1xuICAgIHVwOiBmYWxzZSxcbiAgICBkb3duOiBmYWxzZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIpIHtcbiAgICBzdXBlcigyMCwgMTAwKTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cblxuICBoYW5kbGVLZXlkb3duKGtleTogc3RyaW5nKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZEtleTogc3RyaW5nID0gUExBWUVSX0tFWV9NQVBbdGhpcy5pZF1ba2V5XTtcblxuICAgIGlmICghdGhpcy5wcmVzc2VkS2V5c1tub3JtYWxpemVkS2V5XSkge1xuICAgICAgdGhpcy5wcmVzc2VkS2V5c1tub3JtYWxpemVkS2V5XSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlS2V5dXAoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBub3JtYWxpemVkS2V5OiBzdHJpbmcgPSBQTEFZRVJfS0VZX01BUFt0aGlzLmlkXVtrZXldO1xuXG4gICAgaWYgKHRoaXMucHJlc3NlZEtleXNbbm9ybWFsaXplZEtleV0pIHtcbiAgICAgIHRoaXMucHJlc3NlZEtleXNbbm9ybWFsaXplZEtleV0gPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9vYmplY3RzL3BsYXllci50cyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IEFycmF5PGFueT4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleXVwLmJpbmQodGhpcykpO1xuICB9XG5cbiAgYWRkTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIuaGFuZGxlS2V5ZG93bihldmVudC5rZXkpKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyLmhhbmRsZUtleXVwKGV2ZW50LmtleSkpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaW5wdXQudHMiXSwic291cmNlUm9vdCI6IiJ9