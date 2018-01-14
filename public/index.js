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
const pong_1 = __webpack_require__(6);
const canvas = document.getElementById('pong');
const pong = new pong_1.default(canvas);
pong.init();


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = __webpack_require__(5);
class Rectangle {
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
exports.Rectangle = Rectangle;
class Ball extends Rectangle {
    constructor() {
        super(10, 10);
        this.velocity = new vector_1.default();
    }
}
exports.Ball = Ball;


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const shapes_1 = __webpack_require__(4);
class Pong {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        const ball = new shapes_1.Ball();
        ball.position.x = 10;
        ball.position.y = 25;
        ball.velocity.x = 100;
        ball.velocity.y = 100;
        this.ball = ball;
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
    drawFrame() {
        const { context, ball } = this;
        // Draw background
        context.fillStyle = '#000';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        // Draw ball
        context.fillStyle = '#fff';
        context.fillRect(ball.position.x, ball.position.y, ball.size.x, ball.size.y);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWQ4MzY5YjQxZWE2YTNmNWVjOTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9uZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsc0NBQTBCO0FBRTFCLE1BQU0sTUFBTSxHQUF1QixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25FLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTlCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ0xaLHdDQUE4QjtBQUU5QjtJQUlFLFlBQVksS0FBYSxFQUFFLE1BQWM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZ0JBQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksR0FBRztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBeEJELDhCQXdCQztBQUVELFVBQWtCLFNBQVEsU0FBUztJQUdqQztRQUNFLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQVBELG9CQU9DOzs7Ozs7Ozs7O0FDbkNEO0lBSUUsWUFBWSxJQUFZLENBQUMsRUFBRSxJQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FDRjtBQVJELHlCQVFDOzs7Ozs7Ozs7O0FDUkQsd0NBQWdDO0FBRWhDO0lBS0UsWUFBWSxNQUF5QjtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLFVBQVUsQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRXJELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRU8sU0FBUztRQUNmLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRS9CLGtCQUFrQjtRQUNsQixPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUMzQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwRSxZQUFZO1FBQ1osT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDM0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTyxPQUFPO1FBQ2IsSUFBSSxRQUFRLENBQUM7UUFFYixNQUFNLFdBQVcsR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLENBQUM7WUFFRCxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2QscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVELHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDRjtBQTlERCx1QkE4REMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxZDgzNjliNDFlYTZhM2Y1ZWM5NiIsImltcG9ydCBQb25nIGZyb20gJy4vcG9uZyc7XG5cbmNvbnN0IGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvbmcnKTtcbmNvbnN0IHBvbmcgPSBuZXcgUG9uZyhjYW52YXMpO1xuXG5wb25nLmluaXQoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xuXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIHtcbiAgcG9zaXRpb246IFZlY3RvcjtcbiAgc2l6ZTogVmVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnNpemUgPSBuZXcgVmVjdG9yKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgZ2V0IGxlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueCAtIHRoaXMuc2l6ZS54IC8gMjtcbiAgfVxuXG4gIGdldCByaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLnggLyAyO1xuICB9XG5cbiAgZ2V0IHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5zaXplLnkgLyAyO1xuICB9XG5cbiAgZ2V0IGJvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnkgLyAyO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYWxsIGV4dGVuZHMgUmVjdGFuZ2xlIHtcbiAgdmVsb2NpdHk6IFZlY3RvcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigxMCwgMTApO1xuICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yKCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFwZXMudHMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZlY3Rvci50cyIsImltcG9ydCB7IEJhbGwgfSBmcm9tICcuL3NoYXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbmcge1xuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgY29udGV4dDtcbiAgcHJpdmF0ZSBiYWxsOiBCYWxsO1xuXG4gIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGNvbnN0IGJhbGwgPSBuZXcgQmFsbCgpO1xuICAgIGJhbGwucG9zaXRpb24ueCA9IDEwO1xuICAgIGJhbGwucG9zaXRpb24ueSA9IDI1O1xuICAgIGJhbGwudmVsb2NpdHkueCA9IDEwMDtcbiAgICBiYWxsLnZlbG9jaXR5LnkgPSAxMDA7XG5cbiAgICB0aGlzLmJhbGwgPSBiYWxsO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFuaW1hdGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQmFsbChkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5iYWxsLnBvc2l0aW9uLnggKz0gdGhpcy5iYWxsLnZlbG9jaXR5LnggKiBkZWx0YTtcbiAgICB0aGlzLmJhbGwucG9zaXRpb24ueSArPSB0aGlzLmJhbGwudmVsb2NpdHkueSAqIGRlbHRhO1xuXG4gICAgaWYgKHRoaXMuYmFsbC5sZWZ0IDwgMCB8fCB0aGlzLmJhbGwucmlnaHQgPiB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoKSB7XG4gICAgICB0aGlzLmJhbGwudmVsb2NpdHkueCAqPSAtMTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5iYWxsLnRvcCA8IDAgfHwgdGhpcy5iYWxsLmJvdHRvbSA+IHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmJhbGwudmVsb2NpdHkueSAqPSAtMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYXdGcmFtZSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRleHQsIGJhbGwgfSA9IHRoaXM7XG5cbiAgICAvLyBEcmF3IGJhY2tncm91bmRcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNvbnRleHQuY2FudmFzLndpZHRoLCBjb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xuXG4gICAgLy8gRHJhdyBiYWxsXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgY29udGV4dC5maWxsUmVjdChiYWxsLnBvc2l0aW9uLngsIGJhbGwucG9zaXRpb24ueSwgYmFsbC5zaXplLngsIGJhbGwuc2l6ZS55KTtcbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0ZSgpIHtcbiAgICBsZXQgbGFzdFRpbWU7XG5cbiAgICBjb25zdCByYWZDYWxsYmFjayA9IChtczogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAobGFzdFRpbWUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVCYWxsKChtcyAtIGxhc3RUaW1lKSAvIDEwMDApO1xuICAgICAgICB0aGlzLmRyYXdGcmFtZSgpO1xuICAgICAgfVxuXG4gICAgICBsYXN0VGltZSA9IG1zO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZkNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmQ2FsbGJhY2spO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BvbmcudHMiXSwic291cmNlUm9vdCI6IiJ9