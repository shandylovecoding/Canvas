var canvasOffset = $("#canvas-draft").offset();
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
            this.contextReal.lineWidth = lineWidth;
            this.contextDraft.strokeStyle = `${colorStroke}`;
            this.contextDraft.fillStyle = `${colorFill}`;
            this.contextDraft.lineWidth = lineWidth;
            this.origX = mouseX;
            this.origY = mouseY;
            clicks = 1;
        } else if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            console.log(this.contextReal)
            addCircle(this.origX, this.origY, mouseX, mouseY, `${colorFill}`, `${colorStroke}`, lineWidth)
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
            this.contextDraft.fill();
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

