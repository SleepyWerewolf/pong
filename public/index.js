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
const classes_1 = __webpack_require__(1);
const animate_1 = __webpack_require__(2);
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');
context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);
const ball = new classes_1.Ball;
ball.position.x = 10;
ball.position.y = 25;
ball.velocity.x = 100;
ball.velocity.y = 100;
animate_1.default(ball, context);


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
exports.Vector = Vector;
class Rectangle {
    constructor(width, height) {
        this.position = new Vector();
        this.size = new Vector(width, height);
    }
}
exports.Rectangle = Rectangle;
class Ball extends Rectangle {
    constructor() {
        super(10, 10);
        this.velocity = new Vector();
    }
}
exports.Ball = Ball;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const generateNewPosition_1 = __webpack_require__(3);
function updateItem(delta, item, context) {
    const { x, y } = generateNewPosition_1.default(delta, item, context);
    item.position.x = x;
    item.position.y = y;
    context.fillStyle = '#000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = '#fff';
    context.fillRect(item.position.x, item.position.y, item.size.x, item.size.y);
}
function animate(item, context) {
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
exports.default = animate;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isOutOfBoundsX(position, context) {
    return position < 0 || position > context.canvas.width;
}
function isOutOfBoundsY(position, context) {
    return position < 0 || position > context.canvas.height;
}
function generateNewPosition(delta, item, context) {
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
exports.default = generateNewPosition;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjI4MWZkMWY4MWFhM2JiZmYwNzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzLnRzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9nZW5lcmF0ZU5ld1Bvc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSx5Q0FBaUM7QUFDakMseUNBQWdDO0FBRWhDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV4QyxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUMzQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFcEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUM7QUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FB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SSxFQUFFLE9BQU87SUFDdEUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBRS9ELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFFL0QsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU0sQ0FBQztRQUNMLENBQUMsRUFBRSxZQUFZO1FBQ2YsQ0FBQyxFQUFFLFlBQVk7S0FDaEIsQ0FBQztBQUNKLENBQUM7QUFqQkQsc0NBaUJDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjI4MWZkMWY4MWFhM2JiZmYwNzMiLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSAnLi9jbGFzc2VzJztcbmltcG9ydCBhbmltYXRlIGZyb20gJy4vYW5pbWF0ZSc7XG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb25nJyk7XG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbmNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAnO1xuY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG5jb25zdCBiYWxsID0gbmV3IEJhbGw7XG5iYWxsLnBvc2l0aW9uLnggPSAxMDtcbmJhbGwucG9zaXRpb24ueSA9IDI1O1xuYmFsbC52ZWxvY2l0eS54ID0gMTAwO1xuYmFsbC52ZWxvY2l0eS55ID0gMTAwO1xuXG5hbmltYXRlKGJhbGwsIGNvbnRleHQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiZXhwb3J0IGNsYXNzIFZlY3RvciB7XG4gIHg6IE51bWJlcjtcbiAgeTogTnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHg6IE51bWJlciA9IDAsIHk6IE51bWJlciA9IDApIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSB7XG4gIHBvc2l0aW9uOiBWZWN0b3I7XG4gIHNpemU6IFZlY3RvcjtcblxuICBjb25zdHJ1Y3Rvcih3aWR0aDogTnVtYmVyLCBoZWlnaHQ6IE51bWJlcikge1xuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5zaXplID0gbmV3IFZlY3Rvcih3aWR0aCwgaGVpZ2h0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFsbCBleHRlbmRzIFJlY3RhbmdsZSB7XG4gIHZlbG9jaXR5OiBWZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoMTAsIDEwKTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcigpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy50cyIsImltcG9ydCBnZW5lcmF0ZU5ld1Bvc2l0aW9uIGZyb20gJy4vZ2VuZXJhdGVOZXdQb3NpdGlvbic7XG5cbmZ1bmN0aW9uIHVwZGF0ZUl0ZW0oZGVsdGE6IG51bWJlciwgaXRlbSwgY29udGV4dCkge1xuICBjb25zdCB7IHgsIHkgfSA9IGdlbmVyYXRlTmV3UG9zaXRpb24oZGVsdGEsIGl0ZW0sIGNvbnRleHQpO1xuXG4gIGl0ZW0ucG9zaXRpb24ueCA9IHg7XG4gIGl0ZW0ucG9zaXRpb24ueSA9IHk7XG5cbiAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMCc7XG4gIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XG5cbiAgY29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gIGNvbnRleHQuZmlsbFJlY3QoaXRlbS5wb3NpdGlvbi54LCBpdGVtLnBvc2l0aW9uLnksIGl0ZW0uc2l6ZS54LCBpdGVtLnNpemUueSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuaW1hdGUoaXRlbSwgY29udGV4dCkge1xuICBsZXQgbGFzdFRpbWU7XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZUNhbGxiYWNrKG1zKSB7XG4gICAgaWYgKGxhc3RUaW1lKSB7XG4gICAgICB1cGRhdGVJdGVtKChtcyAtIGxhc3RUaW1lKSAvIDEwMDAsIGl0ZW0sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIGxhc3RUaW1lID0gbXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVDYWxsYmFjayk7XG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZUNhbGxiYWNrKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbmltYXRlLnRzIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi9jbGFzc2VzJztcblxuZnVuY3Rpb24gaXNPdXRPZkJvdW5kc1gocG9zaXRpb24sIGNvbnRleHQpIHtcbiAgcmV0dXJuIHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+IGNvbnRleHQuY2FudmFzLndpZHRoO1xufVxuXG5mdW5jdGlvbiBpc091dE9mQm91bmRzWShwb3NpdGlvbiwgY29udGV4dCkge1xuICByZXR1cm4gcG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID4gY29udGV4dC5jYW52YXMuaGVpZ2h0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZU5ld1Bvc2l0aW9uKGRlbHRhOiBudW1iZXIsIGl0ZW0sIGNvbnRleHQpOiBWZWN0b3Ige1xuICBjb25zdCBuZXdQb3NpdGlvblggPSBpdGVtLnBvc2l0aW9uLnggKyBpdGVtLnZlbG9jaXR5LnggKiBkZWx0YTtcblxuICBpZiAoaXNPdXRPZkJvdW5kc1gobmV3UG9zaXRpb25YLCBjb250ZXh0KSkge1xuICAgIGl0ZW0udmVsb2NpdHkueCAqPSAtMTtcbiAgfVxuXG4gIGNvbnN0IG5ld1Bvc2l0aW9uWSA9IGl0ZW0ucG9zaXRpb24ueSArIGl0ZW0udmVsb2NpdHkueSAqIGRlbHRhO1xuXG4gIGlmIChpc091dE9mQm91bmRzWShuZXdQb3NpdGlvblksIGNvbnRleHQpKSB7XG4gICAgaXRlbS52ZWxvY2l0eS55ICo9IC0xO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiBuZXdQb3NpdGlvblgsXG4gICAgeTogbmV3UG9zaXRpb25ZXG4gIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dlbmVyYXRlTmV3UG9zaXRpb24udHMiXSwic291cmNlUm9vdCI6IiJ9