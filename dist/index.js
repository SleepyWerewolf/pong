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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pong_1 = __webpack_require__(1);
const canvas = document.getElementById('pong');
const pong = new pong_1.default(canvas);
pong.init();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_objects_1 = __webpack_require__(2);
const constants_1 = __webpack_require__(3);
class Pong {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        const ball = new game_objects_1.Ball();
        ball.position.x = 10;
        ball.position.y = 25;
        ball.velocity.x = 100;
        ball.velocity.y = 100;
        this.ball = ball;
        const middle = this.canvas.height / 2;
        const player1 = new game_objects_1.Player();
        player1.position.x = 40;
        player1.position.y = middle;
        const player2 = new game_objects_1.Player();
        player2.position.x = this.canvas.width - 40;
        player2.position.y = middle;
        this.players = [player1, player2];
    }
    init() {
        this.animate();
    }
    updateBall(delta) {
        this.ball.position.x += this.ball.velocity.x * delta;
        this.ball.position.y += this.ball.velocity.y * delta;
        if (this.ball.left < 0 || this.ball.right > this.context.canvas.width) {
            this.ball.velocity.x *= -1;
        }
        if (this.ball.top < 0 || this.ball.bottom > this.context.canvas.height) {
            this.ball.velocity.y *= -1;
        }
    }
    drawGameObject({ left, top, size: { x, y } }) {
        const { context } = this;
        context.fillStyle = constants_1.GAME_OBJECT_COLOR;
        context.fillRect(left, top, x, y);
    }
    drawFrame() {
        const { context } = this;
        // Draw background
        context.fillStyle = constants_1.BACKGROUND_COLOR;
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
                this.updateBall((ms - lastTime) / 1000);
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
/* 2 */
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
class GameObject {
    constructor(width, height) {
        this.position = new Vector();
        this.size = new Vector(width, height);
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
exports.GameObject = GameObject;
class Ball extends GameObject {
    constructor() {
        super(10, 10);
        this.velocity = new Vector();
    }
}
exports.Ball = Ball;
class Player extends GameObject {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}
exports.Player = Player;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKGROUND_COLOR = '#000';
exports.GAME_OBJECT_COLOR = '#fff';


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmZjZmM1YTk4MTY3NWZiNmIyMmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9uZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS1vYmplY3RzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHNDQUEwQjtBQUUxQixNQUFNLE1BQU0sR0FBdUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU5QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7Ozs7Ozs7QUNMWiw4Q0FBMEQ7QUFDMUQsMkNBQWtFO0FBQ2xFO0lBTUUsWUFBWSxNQUF5QjtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxD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QyxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0Y7QUF4QkQsZ0NBd0JDO0FBRUQsVUFBa0IsU0FBUSxVQUFVO0lBR2xDO1FBQ0UsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFQRCxvQkFPQztBQUVELFlBQW9CLFNBQVEsVUFBVTtJQUdwQztRQUNFLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFQRCx3QkFPQzs7Ozs7Ozs7OztBQ3BEWSx3QkFBZ0IsR0FBWSxNQUFNLENBQUM7QUFDbkMseUJBQWlCLEdBQVksTUFBTSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmZjZmM1YTk4MTY3NWZiNmIyMmYiLCJpbXBvcnQgUG9uZyBmcm9tICcuL3BvbmcnO1xuXG5jb25zdCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb25nJyk7XG5jb25zdCBwb25nID0gbmV3IFBvbmcoY2FudmFzKTtcblxucG9uZy5pbml0KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLnRzIiwiaW1wb3J0IHsgQmFsbCwgUGxheWVyLCBHYW1lT2JqZWN0IH0gZnJvbSAnLi9nYW1lLW9iamVjdHMnO1xuaW1wb3J0IHsgR0FNRV9PQkpFQ1RfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1IgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb25nIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHJpdmF0ZSBiYWxsOiBCYWxsO1xuICBwcml2YXRlIHBsYXllcnM6IEFycmF5PFBsYXllcj47XG5cbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgY29uc3QgYmFsbCA9IG5ldyBCYWxsKCk7XG4gICAgYmFsbC5wb3NpdGlvbi54ID0gMTA7XG4gICAgYmFsbC5wb3NpdGlvbi55ID0gMjU7XG4gICAgYmFsbC52ZWxvY2l0eS54ID0gMTAwO1xuICAgIGJhbGwudmVsb2NpdHkueSA9IDEwMDtcblxuICAgIHRoaXMuYmFsbCA9IGJhbGw7XG5cbiAgICBjb25zdCBtaWRkbGUgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyAyO1xuXG4gICAgY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoKTtcbiAgICBwbGF5ZXIxLnBvc2l0aW9uLnggPSA0MDtcbiAgICBwbGF5ZXIxLnBvc2l0aW9uLnkgPSBtaWRkbGU7XG5cbiAgICBjb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcigpO1xuICAgIHBsYXllcjIucG9zaXRpb24ueCA9IHRoaXMuY2FudmFzLndpZHRoIC0gNDA7XG4gICAgcGxheWVyMi5wb3NpdGlvbi55ID0gbWlkZGxlO1xuXG4gICAgdGhpcy5wbGF5ZXJzID0gWyBwbGF5ZXIxLCBwbGF5ZXIyIF07XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVCYWxsKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmJhbGwucG9zaXRpb24ueCArPSB0aGlzLmJhbGwudmVsb2NpdHkueCAqIGRlbHRhO1xuICAgIHRoaXMuYmFsbC5wb3NpdGlvbi55ICs9IHRoaXMuYmFsbC52ZWxvY2l0eS55ICogZGVsdGE7XG5cbiAgICBpZiAodGhpcy5iYWxsLmxlZnQgPCAwIHx8IHRoaXMuYmFsbC5yaWdodCA+IHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgpIHtcbiAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS54ICo9IC0xO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJhbGwudG9wIDwgMCB8fCB0aGlzLmJhbGwuYm90dG9tID4gdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS55ICo9IC0xO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhd0dhbWVPYmplY3Qoe1xuICAgIGxlZnQsXG4gICAgdG9wLFxuICAgIHNpemU6IHsgeCwgeSB9XG4gIH06IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRleHQgfSA9IHRoaXM7XG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IEdBTUVfT0JKRUNUX0NPTE9SO1xuICAgIGNvbnRleHQuZmlsbFJlY3QobGVmdCwgdG9wLCB4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0ZyYW1lKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGV4dCB9ID0gdGhpcztcblxuICAgIC8vIERyYXcgYmFja2dyb3VuZFxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gQkFDS0dST1VORF9DT0xPUjtcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNvbnRleHQuY2FudmFzLndpZHRoLCBjb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xuXG4gICAgLy8gRHJhdyBwbGF5ZXJzXG4gICAgdGhpcy5wbGF5ZXJzLmZvckVhY2gocGxheWVyID0+IHRoaXMuZHJhd0dhbWVPYmplY3QocGxheWVyKSk7XG5cbiAgICAvLyBEcmF3IGJhbGxcbiAgICB0aGlzLmRyYXdHYW1lT2JqZWN0KHRoaXMuYmFsbCk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGUoKTogdm9pZCB7XG4gICAgbGV0IGxhc3RUaW1lO1xuXG4gICAgY29uc3QgcmFmQ2FsbGJhY2sgPSAobXM6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgICAgaWYgKGxhc3RUaW1lKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQmFsbCgobXMgLSBsYXN0VGltZSkgLyAxMDAwKTtcbiAgICAgICAgdGhpcy5kcmF3RnJhbWUoKTtcbiAgICAgIH1cblxuICAgICAgbGFzdFRpbWUgPSBtcztcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWZDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZkNhbGxiYWNrKTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wb25nLnRzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdCB7XG4gIHBvc2l0aW9uOiBWZWN0b3I7XG4gIHNpemU6IFZlY3RvcjtcblxuICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5zaXplID0gbmV3IFZlY3Rvcih3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGdldCBsZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnNpemUueCAvIDI7XG4gIH1cblxuICBnZXQgcmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54IC8gMjtcbiAgfVxuXG4gIGdldCB0b3AoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueSAtIHRoaXMuc2l6ZS55IC8gMjtcbiAgfVxuXG4gIGdldCBib3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS55IC8gMjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFsbCBleHRlbmRzIEdhbWVPYmplY3Qge1xuICB2ZWxvY2l0eTogVmVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKDEwLCAxMCk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gIHByaXZhdGUgc2NvcmU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigyMCwgMTAwKTtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWUtb2JqZWN0cy50cyIsImV4cG9ydCBjb25zdCBCQUNLR1JPVU5EX0NPTE9SID0gPHN0cmluZz4gJyMwMDAnO1xuZXhwb3J0IGNvbnN0IEdBTUVfT0JKRUNUX0NPTE9SID0gPHN0cmluZz4gJyNmZmYnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMudHMiXSwic291cmNlUm9vdCI6IiJ9