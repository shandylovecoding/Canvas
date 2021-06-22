class DrawingBezierLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
        if (clicks == 0) {
            this.contextDraft.strokeStyle = `${colorStroke}`;
            this.contextReal.strokeStyle = `${colorStroke}`;
            this.contextDraft.lineWidth = 5;
            this.contextReal.lineWidth = 5;
            this.origX = mouseX;
            this.origY = mouseY;
            clicks = 1;
        } else if (clicks == 1) {
            this.endX = mouseX;
            this.endY = mouseY;
            clicks = 2;
        } else if (clicks == 2) {
            this.firstcontrolX = mouseX;
            this.firstcontrolY = mouseY;
            clicks = 3;
        } else if (clicks == 3) {
            this.secondcontrolX = mouseX;
            this.secondcontrolY = mouseY;
            clicks = 4;
        } else if (clicks == 4) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.origX, this.origY);
            this.contextReal.bezierCurveTo(this.firstcontrolX, this.firstcontrolY, this.secondcontrolX, this.secondcontrolY, this.endX, this.endY);
            this.contextReal.stroke();
            clicks = 0;
        }
    }

    onDragging() {}

    onMouseMove([mouseX, mouseY], e) {
        if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX, this.origY);
            this.contextDraft.lineTo(mouseX, mouseY);
            this.contextDraft.stroke();
        } else if (clicks == 2) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX, this.origY);
            this.contextDraft.quadraticCurveTo(mouseX, mouseY, this.endX, this.endY);
            this.contextDraft.stroke();
        } else if (clicks == 3) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX, this.origY);
            this.contextDraft.bezierCurveTo(this.firstcontrolX, this.firstcontrolY, mouseX, mouseY, this.endX, this.endY);
            this.contextDraft.stroke();
        }
    }
    onMouseUp([mouseX, mouseY], e) {}
    onMouseLeave() {}
    onMouseEnter() {}
}
$("#bezierButton").click(function () {
    console.log("Bezier button clicked");
    currentFunction = new DrawingBezierLine(contextReal, contextDraft);
});