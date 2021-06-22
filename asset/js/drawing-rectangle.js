class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    onMouseDown([mouseX, mouseY], e) {
        if (clicks == 0) {
            this.contextReal.fillStyle = `${color}`;
            this.contextDraft.fillStyle = `${color}`;
            this.contextReal.strokeStyle = "#f44";
            this.contextDraft.strokeStyle = "#f44";
            this.origX = mouseX;
            this.origY = mouseY;
            clicks = 1;
        } else if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.fillRect(this.origX, this.origY, mouseX - this.origX, mouseY - this.origY);
            clicks = 0;
        }
    }

    onDragging() {}

    onMouseMove([mouseX, mouseY], e) {
        if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.fillRect(this.origX, this.origY, mouseX - this.origX, mouseY - this.origY);
        }
    }

    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
}

$("#rectButton").click(function () {
    console.log("Rectangle Button clicked");
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
});