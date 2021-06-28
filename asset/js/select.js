var move
class Select extends PaintFunction {
  constructor(contextReal) {
    super();
    this.contextReal = contextReal;
    this.origX = mouseX;
    this.origY = mouseY;
  }

  onMouseDown([mouseX, mouseY], e) {
    myDown(e)
  }

  onDragging() { }
  onMouseMove([mouseX, mouseY], e) {
    if (move == 1) {
      rectMove(e)
    } else if (move == 2) {
      lineMove(e)
    } else if (move == 3) {
      quadMove(e)
    } else if (move == 4) {
      bezierMove(e)
    } else if (move == 5) {
      penMove()
    } else if (move == 6) {
      circleMove(e)
    } else if (move == 7) {
      polyLineMove(e)
    } else if (move == 8) {
      polygonMove(e)
    }
  }
  onMouseUp([mouseX, mouseY], e) {
    myUp(e)
  }
  onMouseLeave() { }
  onMouseEnter() { }
}

$("#select").click(function () {
  currentFunction = new Select(contextReal, contextDraft);
});

// holds all our boxes
var boxes = [];

// Hold canvas information
var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var INTERVAL = 20; // how often, in milliseconds, we check to see if a redraw is needed

var isDrag = false;
var isResizeDrag = false;
var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
var mx, my; // mouse coordinates

// when set to true, the canvas will redraw everything
// invalidate() just sets this to false right now
// we want to call invalidate() whenever we make a change
var canvasValid = false;

// The node (if any) being selected.
// If in the future we want to select multiple objects, this will get turned into an array
var mySel = null;

// The selection color and width. Right now we have a red selection with a small width
var mySelColor = '#CC0000';
var mySelWidth = 2;
var mySelBoxColor = 'darkred'; // New for selection boxes
var mySelBoxSize = 6;

// we use a fake canvas to draw individual shapes for selection testing
var ghostcanvas;
var gctx; // fake canvas context

// since we can drag from anywhere in a node
// instead of just its x/y corner, we need to save
// the offset of the mouse when we start dragging.
var offsetx, offsety;

// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;

// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas
function init2() {
  canvas = document.getElementById('canvas-real');
  HEIGHT = canvas.height;
  WIDTH = canvas.width;
  ctx = canvas.getContext('2d');
  ghostcanvas = document.createElement('canvas');
  ghostcanvas.height = HEIGHT;
  ghostcanvas.width = WIDTH;
  ghostcanvas.style.backgroundColor = "transparent";
  gctx = ghostcanvas.getContext('2d');

  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.onselectstart = function () {
    return false;
  }

  // fixes mouse co-ordinate problems when there's a border or padding
  // see getMouse for more detail
  if (document.defaultView && document.defaultView.getComputedStyle) {
    stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
    stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
    styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
    styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
  }

  // make mainDraw() fire every INTERVAL milliseconds
  setInterval(mainDraw, INTERVAL);

  // set up the selection handle boxes
  for (var i = 0; i < 8; i++) {
    var rect = new Rect;
    rectSelectionHandles.push(rect);
  }
  for (var i = 0; i < 4; i++) {
    var circle = new Circle;
    circleSelectionHandles.push(circle);
  }
  for (var i = 0; i < 2; i++) {
    var line = new Line;
    lineSelectionHandles.push(line);
  }
  for (var i = 0; i < 3; i++) {
    var quad = new Quadratic;
    quadSelectionHandles.push(quad);
  }
  for (var i = 0; i < 4; i++) {
    var bezier = new Bezier;
    bezierSelectionHandles.push(bezier);
  }
  for (var i = 0; i < 4; i++) {
    var polyLine = new PolyLine;
    polylineSelectionHandles.push(polyLine);
  }
  for (var i = 0; i < 4; i++) {
    var polygon = new Polygon;
    polygonSelectionHandles.push(polygon);
  }
  for (var i = 0; i < 4; i++) {
    var pen = new Pen;
    penSelectionHandles.push(pen);
  }
}


//wipes the canvas context
function clear(c) {
  c.clearRect(0, 0, WIDTH, HEIGHT);
}

// Main draw loop.
// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function mainDraw() {
  if (canvasValid == false) {
    clear(ctx);
    // Add stuff you want drawn in the background all the time here

    // draw all boxes
    var l = boxes.length;
    for (var i = 0; i < l; i++) {
      boxes[i].draw(ctx); // we used to call drawshape, but now each box draws itself
    }
    // Add stuff you want drawn on top all the time here
    canvasValid = true;
  }
}


// Happens when the mouse is clicked in the canvas
function myDown(e) {
  getMouse(e);

  //we are over a selection box
  if (expectResize !== -1) {
    isResizeDrag = true;
    return;
  }

  clear(gctx);
  var l = boxes.length;
  for (var i = l - 1; i >= 0; i--) {
    // draw shape onto ghost context
    boxes[i].draw(gctx, 'black');

    // get image data at the mouse x,y pixel
    var imageData = gctx.getImageData(mx, my, 1, 1);
    var index = (mx + my * imageData.width) * 4;
    // if the mouse pixel exists, select and break
    if (imageData.data[3] > 0) {
      mySel = boxes[i];
      offsetx = mx - mySel.x;
      offsety = my - mySel.y;
      mySel.x = mx - offsetx;
      mySel.y = my - offsety;
      mySel.w = boxes[i].w;
      mySel.h = boxes[i].h;

      isDrag = true;
      if (boxes[i].constructor.name == "Rect") {
        move = 1;
      } else if (boxes[i].constructor.name == "Line") {
        move = 2;
      } else if (boxes[i].constructor.name == "Quadratic") {
        move = 3;
      } else if (boxes[i].constructor.name == "Bezier") {
        move = 4;
      } else if (boxes[i].constructor.name == "Pen") {
        move = 5;
      } else if (boxes[i].constructor.name == "Circle") {
        move = 6;
      } else if (boxes[i].constructor.name == "Polyline") {
        move = 7;
      }

      invalidate();
      clear(gctx);
      return;
    }

  }
  // havent returned means we have selected nothing
  mySel = null;
  // clear the ghost canvas for next time
  clear(gctx);
  // invalidate because we might need the selection border to disappear
  invalidate();
}


function myUp() {
  isDrag = false;
  isResizeDrag = false;
  expectResize = -1;
  getsnapshot();
}


function invalidate() {
  canvasValid = false;
}

// Sets mx,my to the mouse position relative to the canvas
// unfortunately this can be tricky, we have to worry about padding and borders
function getMouse(e) {
  var element = canvas,
    offsetX = 0,
    offsetY = 0;

  if (element.offsetParent) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  offsetX += stylePaddingLeft;
  offsetY += stylePaddingTop;

  offsetX += styleBorderLeft;
  offsetY += styleBorderTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY
}

// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();
window.init2 = init2;
// })(window);

// Andy added, as a replacement for 
// <body onLoad="init2()">
$(document).ready(function () {
  // Your code here
  init2();
});