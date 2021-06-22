class DrawingLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
        if (clicks == 0) {
            this.contextDraft.strokeStyle = "#002fa7";
            this.contextReal.strokeStyle = "#002fa7";
            this.contextDraft.lineWidth = 5;
            this.contextReal.lineWidth = 5;
            this.origX = mouseX;
            this.origY = mouseY;
            clicks = 1;
        } else if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.origX, this.origY);
            this.contextReal.lineTo(mouseX, mouseY);
            this.contextReal.stroke();
            clicks = 0;
        }
    }

    onDragging() {}

    onMouseMove(e) {
        if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX, this.origY);
            this.contextDraft.lineTo(mouseX, mouseY);
            this.contextDraft.stroke();
        }
    }
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}

}

$("#lineButton").click(function () {
    console.log("Line button clicked");
    currentFunction = new DrawingLine(contextReal, contextDraft);
});