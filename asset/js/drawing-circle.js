var canvasOffset = $("#canvas-draft").offset();
console.log(canvasOffset)
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var startX;
var startY;
var x;
var y;
var isDown = false;

class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
        e.preventDefault();
        e.stopPropagation();
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        isDown = true;
        this.contextReal.beginPath();
    }
    onDragging([mouseX, mouseY], e) {
        if (!isDown) { return; }
        e.preventDefault();
        e.stopPropagation();
        x = parseInt(e.clientX - offsetX);
        y = parseInt(e.clientY - offsetY);
        drawOval(mouseX, mouseY);
    }
    onMouseMove() { }
    onMouseUp([mouseX, mouseY], e) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.moveTo(startX, startY + (e.clientY - offsetY - startY) / 2);
        this.contextReal.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
        this.contextReal.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
        this.contextReal.closePath()
        this.contextReal.stroke()


    }
    onMouseLeave() { }
    onMouseEnter() { }
}

$("#circleButton").click(function () {
    console.log("Circle Button clicked");
    currentFunction = new DrawingCircle(contextReal, contextDraft);
});
function drawOval(x, y) {
    contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    contextDraft.beginPath();
    contextDraft.moveTo(startX, startY + (y - startY) / 2);
    contextDraft.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    contextDraft.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    contextDraft.stroke();
    console.log("drawOval.clientX", startY)

}
