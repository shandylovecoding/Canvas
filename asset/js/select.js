
  
//   class Select extends PaintFunction {
//     constructor(contextReal) {
//         super();
//         this.contextReal = contextReal;
//         this.origX = mouseX;
//         this.origY = mouseY;
//     }

//     onMouseDown([mouseX, mouseY], e) {
//     }

//     onDragging(){
//     }
//     onMouseMove(){
//     }
//     onMouseUp(){
//     }
//     onMouseLeave(){}
//     onMouseEnter(){}
// };
//   $("#select").click(function () {
//     console.log("select Button clicked");
//     currentFunction = new Select(contextReal, contextDraft);
// });

// var Rectangle = function(x, y, width, height) {
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.isDragging = false;
//   this.render = function(contextReal) {
//     contextDraft.save();
//     contextDraft.beginPath();
//     contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
//     contextReal.rect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
//     contextReal.fillStyle = '#2793ef';
//     contextReal.fill();
//     contextReal.restore();
//   }
// }

// var Arc = function(x, y, radius, radians) {
//   this.x = x;
//   this.y = y;
//   this.radius = radius;
//   this.radians = radians;
//   this.isDragging = false;

//   this.render = function(contextReal) {
//     contextReal.save();

//     contextReal.beginPath();
//     contextReal.arc(this.x, this.y, this.radius, 0, this.radians, false);
//     contextReal.fillStyle = '#2793ef';
//     contextReal.fill();
//     contextReal.restore();
//   }
// }

// var MouseTouchTracker = function(canvas, callback){

//   function processEvent(evt) {
//     var rect = canvas.getBoundingClientRect();
//     var offsetTop = rect.top;
//     var offsetLeft = rect.left;

//     if (evt.touches) {
//       return {
//         x: evt.touches[0].clientX - offsetLeft,
//         y: evt.touches[0].clientY - offsetTop
//       }
//     } else {
//       return {
//         x: evt.clientX - offsetLeft,
//         y: evt.clientY - offsetTop
//       }
//     }
//   }

//   function onDown(evt) {
//     evt.preventDefault();
//     var coords = processEvent(evt);
//     callback('down', coords.x, coords.y);
//   }

//   function onUp(evt) {
//     evt.preventDefault();
//     callback('up');
//   }

//   function onMove(evt) {
//     evt.preventDefault();
//     var coords = processEvent(evt);
//     callback('move', coords.x, coords.y);
//   }

//   canvas.ontouchmove = onMove;
//   canvas.onmousemove = onMove;
//   canvas.ontouchstart = onDown;
//   canvas.onmousedown = onDown;
//   canvas.ontouchend = onUp;
//   canvas.onmouseup = onUp;
// }

// function isHit(shape, x, y) {
//   if (shape.constructor.name === 'Arc') {
//     var dx = shape.x - x;
//     var dy = shape.y - y;
//     if (dx * dx + dy * dy < shape.radius * shape.radius) {
//       return true
//     }
//   } else {
//     if (x > shape.x - shape.width * 0.5 && y > shape.y - shape.height * 0.5 && x < shape.x + shape.width - shape.width * 0.5 && y < shape.y + shape.height - shape.height * 0.5) {
//       return true;
//     }
//   }

//   return false;
// }
  


// var startX = 0;
// var startY = 0;

// var rectangle = new Rectangle(50, 50, 100, 100);
// rectangle.render(contextReal);

// var circle = new Arc(200, 140, 50, Math.PI * 2);
// circle.render(contextReal);

// var mtt = new MouseTouchTracker(canvas,
//   function(evtType, x, y) {
//     contextReal.clearRect(0, 0, canvas.width, canvas.height);

//     switch(evtType) {

//       case 'down':
//         startX = x;
//         startY = y;
//         if (isHit(rectangle, x, y)) {
//           rectangle.isDragging = true;
//         }
//         if (isHit(circle, x, y)) {
//           circle.isDragging = true;
//         }
//         break;

//       case 'up':
//         rectangle.isDragging = false;
//         circle.isDragging = false;
//         break;

//       case 'move':
//         var dx = x - startX;
//         var dy = y - startY;
//         startX = x;
//         startY = y;

//         if (rectangle.isDragging) {
//           rectangle.x += dx;
//           rectangle.y += dy;
//         }

//         if (circle.isDragging) {
//           circle.x += dx;
//           circle.y += dy;
//         }
//         break;
//     }

//     circle.render(contextReal);
//     rectangle.render(contextReal);
//   }
// );




// var mtt = new MouseTouchTracker(canvas,
//   function(evtType, x, y) {
//     contextReal.clearRect(0, 0, canvas.width, canvas.height);

//     switch(evtType) {

//       case 'down':
//         startX = x;
//         startY = y;
//         if (isHit(rectangle, x, y)) {
//           rectangle.isDragging = true;
//         }
//         if (isHit(circle, x, y)) {
//           circle.isDragging = true;
//         }
//         break;

//       case 'up':
//         rectangle.isDragging = false;
//         circle.isDragging = false;
//         break;

//       case 'move':
//         var dx = x - startX;
//         var dy = y - startY;
//         startX = x;
//         startY = y;

//         if (rectangle.isDragging) {
//           rectangle.x += dx;
//           rectangle.y += dy;
//         }

//         if (circle.isDragging) {
//           circle.x += dx;
//           circle.y += dy;
//         }
//         break;
//     }

//     circle.render(contextReal);
//     rectangle.render(contextReal);
//   }
// );