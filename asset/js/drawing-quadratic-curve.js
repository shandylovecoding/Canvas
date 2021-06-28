class DrawingQuadraticLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
        if (clicks == 0) {
            this.contextDraft.strokeStyle = `${colorStroke}`;
            this.contextReal.strokeStyle = `${colorStroke}`;
            this.contextDraft.lineWidth = lineWidth;
            this.contextReal.lineWidth = lineWidth;
            this.origX = mouseX;
            this.origY = mouseY;
            clicks = 1;
        } else if (clicks == 1) {
            this.endX = mouseX;
            this.endY = mouseY;
            clicks = 2;
        } else if (clicks == 2) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            addQuadratic(this.origX, this.origY, mouseX, mouseY, this.endX, this.endY, `${colorStroke}`, lineWidth)
            clicks = 0;
            getsnapshot();
        }
    }

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
        }
    }
}
$("#quadraticButton").click(function () {
    currentFunction = new DrawingQuadraticLine(contextReal, contextDraft);
});