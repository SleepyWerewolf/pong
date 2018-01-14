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
const game_objects_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
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
        this.players = [
            new game_objects_1.Player(),
            new game_objects_1.Player()
        ];
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
    drawGameObject({ position, size }) {
        const { context } = this;
        context.fillStyle = constants_1.GAME_OBJECT_COLOR;
        context.fillRect(position.x, position.y, size.x, size.y);
    }
    drawFrame() {
        const { context, ball } = this;
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
/* 2 */,
/* 3 */,
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKGROUND_COLOR = '#000';
exports.GAME_OBJECT_COLOR = '#fff';


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTI0NDMxMzRjNzJiMzQwOGU5MTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9uZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS1vYmplY3RzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHNDQUEwQjtBQUUxQixNQUFNLE1BQU0sR0FBdUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU5QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7Ozs7Ozs7QUNMWiw4Q0FBMEQ7QUFDMUQsMkNBQWtFO0FBQ2xFO0lBTUUsWUFBWSxNQUF5QjtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxD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QUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBeEJELGdDQXdCQztBQUVELFVBQWtCLFNBQVEsVUFBVTtJQUdsQztRQUNFLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBUEQsb0JBT0M7QUFFRCxZQUFvQixTQUFRLFVBQVU7SUFHcEM7UUFDRSxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBUEQsd0JBT0M7Ozs7Ozs7Ozs7QUNwRFksd0JBQWdCLEdBQVksTUFBTSxDQUFDO0FBQ25DLHlCQUFpQixHQUFZLE1BQU0sQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDkyNDQzMTM0YzcyYjM0MDhlOTEzIiwiaW1wb3J0IFBvbmcgZnJvbSAnLi9wb25nJztcblxuY29uc3QgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9uZycpO1xuY29uc3QgcG9uZyA9IG5ldyBQb25nKGNhbnZhcyk7XG5cbnBvbmcuaW5pdCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC50cyIsImltcG9ydCB7IEJhbGwsIFBsYXllciwgR2FtZU9iamVjdCB9IGZyb20gJy4vZ2FtZS1vYmplY3RzJztcbmltcG9ydCB7IEdBTUVfT0JKRUNUX0NPTE9SLCBCQUNLR1JPVU5EX0NPTE9SIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9uZyB7XG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgYmFsbDogQmFsbDtcbiAgcHJpdmF0ZSBwbGF5ZXJzOiBBcnJheTxQbGF5ZXI+O1xuXG4gIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGNvbnN0IGJhbGwgPSBuZXcgQmFsbCgpO1xuICAgIGJhbGwucG9zaXRpb24ueCA9IDEwO1xuICAgIGJhbGwucG9zaXRpb24ueSA9IDI1O1xuICAgIGJhbGwudmVsb2NpdHkueCA9IDEwMDtcbiAgICBiYWxsLnZlbG9jaXR5LnkgPSAxMDA7XG5cbiAgICB0aGlzLmJhbGwgPSBiYWxsO1xuXG4gICAgdGhpcy5wbGF5ZXJzID0gW1xuICAgICAgbmV3IFBsYXllcigpLFxuICAgICAgbmV3IFBsYXllcigpXG4gICAgXTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUJhbGwoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuYmFsbC5wb3NpdGlvbi54ICs9IHRoaXMuYmFsbC52ZWxvY2l0eS54ICogZGVsdGE7XG4gICAgdGhpcy5iYWxsLnBvc2l0aW9uLnkgKz0gdGhpcy5iYWxsLnZlbG9jaXR5LnkgKiBkZWx0YTtcblxuICAgIGlmICh0aGlzLmJhbGwubGVmdCA8IDAgfHwgdGhpcy5iYWxsLnJpZ2h0ID4gdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCkge1xuICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnggKj0gLTE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmFsbC50b3AgPCAwIHx8IHRoaXMuYmFsbC5ib3R0b20gPiB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCkge1xuICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnkgKj0gLTE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmF3R2FtZU9iamVjdCh7IHBvc2l0aW9uLCBzaXplIH06IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRleHQgfSA9IHRoaXM7XG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IEdBTUVfT0JKRUNUX0NPTE9SO1xuICAgIGNvbnRleHQuZmlsbFJlY3QocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgc2l6ZS54LCBzaXplLnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3RnJhbWUoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250ZXh0LCBiYWxsIH0gPSB0aGlzO1xuXG4gICAgLy8gRHJhdyBiYWNrZ3JvdW5kXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBCQUNLR1JPVU5EX0NPTE9SO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XG5cbiAgICAvLyBEcmF3IHBsYXllcnNcbiAgICB0aGlzLnBsYXllcnMuZm9yRWFjaChwbGF5ZXIgPT4gdGhpcy5kcmF3R2FtZU9iamVjdChwbGF5ZXIpKTtcblxuICAgIC8vIERyYXcgYmFsbFxuICAgIHRoaXMuZHJhd0dhbWVPYmplY3QodGhpcy5iYWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgbGFzdFRpbWU7XG5cbiAgICBjb25zdCByYWZDYWxsYmFjayA9IChtczogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgICBpZiAobGFzdFRpbWUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVCYWxsKChtcyAtIGxhc3RUaW1lKSAvIDEwMDApO1xuICAgICAgICB0aGlzLmRyYXdGcmFtZSgpO1xuICAgICAgfVxuXG4gICAgICBsYXN0VGltZSA9IG1zO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZkNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmQ2FsbGJhY2spO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BvbmcudHMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0IHtcbiAgcG9zaXRpb246IFZlY3RvcjtcbiAgc2l6ZTogVmVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnNpemUgPSBuZXcgVmVjdG9yKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgZ2V0IGxlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueCAtIHRoaXMuc2l6ZS54IC8gMjtcbiAgfVxuXG4gIGdldCByaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLnggLyAyO1xuICB9XG5cbiAgZ2V0IHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5zaXplLnkgLyAyO1xuICB9XG5cbiAgZ2V0IGJvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnkgLyAyO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYWxsIGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gIHZlbG9jaXR5OiBWZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoMTAsIDEwKTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcigpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgcHJpdmF0ZSBzY29yZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKDIwLCAxMDApO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS1vYmplY3RzLnRzIiwiZXhwb3J0IGNvbnN0IEJBQ0tHUk9VTkRfQ09MT1IgPSA8c3RyaW5nPiAnIzAwMCc7XG5leHBvcnQgY29uc3QgR0FNRV9PQkpFQ1RfQ09MT1IgPSA8c3RyaW5nPiAnI2ZmZic7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy50cyJdLCJzb3VyY2VSb290IjoiIn0=