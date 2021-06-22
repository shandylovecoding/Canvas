class DrawingQuadraticLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
        console.log("working")
        if (clicks == 0) {
            this.contextDraft.strokeStyle = "#002fa7";
            this.contextReal.strokeStyle = "#002fa7";
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
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.origX, this.origY);
            this.contextReal.quadraticCurveTo(mouseX, mouseY, this.endX, this.endY);
            this.contextReal.stroke();
            clicks = 0;
            getsnapshot();
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
        }
    }
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
}
$("#quadraticButton").click(function () {
    console.log("Quadratic button clicked");
    currentFunction = new DrawingQuadraticLine(contextReal, contextDraft);
});