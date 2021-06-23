var canvasOffset = $("#canvas-draft").offset();
console.log(canvasOffset)
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var startX;
var startY;
var isDown = false;

class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
        if (clicks == 0) {
            console.log("working");
            this.contextReal.strokeStyle = `${colorStroke}`;
            this.contextReal.fillStyle = `${colorFill}`;
            this.contextReal.lineWidth = 5;
            this.contextDraft.strokeStyle = `${colorStroke}`;
            this.contextDraft.fillStyle = `${colorFill}`;
            this.contextDraft.lineWidth = 5;
            this.origX = mouseX;
            this.origY = mouseY;
            clicks = 1;
        } else if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.origX, this.origY + (mouseY - this.origY) / 2);
            this.contextReal.bezierCurveTo(this.origX, this.origY, mouseX, this.origY, mouseX, this.origY + (mouseY - this.origY) / 2);
            this.contextReal.bezierCurveTo(mouseX, mouseY, this.origX, mouseY, this.origX, this.origY + (mouseY - this.origY) / 2);
            this.contextReal.closePath();
            this.contextReal.stroke();
            getsnapshot();
            clicks = 0;
        }

    }
    onDragging() {}
    onMouseMove() {
        if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX, this.origY + (mouseY - this.origY) / 2);
            this.contextDraft.bezierCurveTo(this.origX, this.origY, mouseX, this.origY, mouseX, this.origY + (mouseY - this.origY) / 2);
            this.contextDraft.bezierCurveTo(mouseX, mouseY, this.origX, mouseY, this.origX, this.origY + (mouseY - this.origY) / 2);
            this.contextDraft.closePath();
            this.contextDraft.stroke();
        }
    }
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
}

$("#circleButton").click(function () {
    console.log("Circle Button clicked");
    currentFunction = new DrawingCircle(contextReal, contextDraft);
});

