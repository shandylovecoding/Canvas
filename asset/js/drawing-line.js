class DrawingLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
        console.log("clicks", clicks)
        if (clicks == 0) {
            this.contextDraft.strokeStyle = `${colorStroke}`;
            this.contextReal.strokeStyle = `${colorStroke}`;
            this.contextDraft.lineWidth = lineWidth;
            this.contextReal.lineWidth = lineWidth;
            this.origX = mouseX;
            this.origY = mouseY;
            clicks = 1;
        } else if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            addLine(this.origX, this.origY, mouseX , mouseY , `${colorFill}`,`${colorStroke}`,lineWidth);
            clicks = 0;
            getsnapshot();
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