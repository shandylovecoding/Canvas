let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let clicks = 0;
let color ="black"
let lineWidth =10;
let textfont;
let link;
function captureMouseEvent(e){
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
}

$('#canvas-real').mousedown(function(e){
    captureMouseEvent(e)
    console.log("Mouse Down: when user presses mouse");
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});

$('#canvas-real').mousemove(function(e){
   captureMouseEvent(e)
    if(dragging){
        console.log("Dragging");
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove([mouseX,mouseY],e);
});

$('#canvas-real').mouseup(function(e){
    dragging = false;
    captureMouseEvent(e)
    currentFunction.onMouseUp([mouseX,mouseY],e);
});

$('#canvas-real').mouseleave(function(e){
    dragging = false;
    captureMouseEvent(e)
    currentFunction.onMouseLeave([mouseX,mouseY],e);
});

$('#canvas-real').mouseenter(function(e){
   captureMouseEvent(e)
    currentFunction.onMouseEnter([mouseX,mouseY],e);
});

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}    