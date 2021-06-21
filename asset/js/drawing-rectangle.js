class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    onMouseDown([mouseX, mouseY], e) {

        this.contextReal.fillStyle = "#f44";
        this.contextDraft.fillStyle = "#f44";
        this.origX = mouseX;
        this.origY = mouseY;
        console.log(e)
    }
    onDragging([mouseX, mouseY], e) {
        this.contextDraft.fillStyle = "#f44";
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.fillRect(this.origX, this.origY, mouseX - this.origX, mouseY - this.origY)
        console.log("Rectangle2")
    }

    onMouseMove() { }
    onMouseUp([mouseX, mouseY], e) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.fillRect(this.origX, this.origY, mouseX - this.origX, mouseY - this.origY)
        console.log("Rectangle3")
    }
    onMouseLeave() { }
    onMouseEnter() { }
}

$("#rectButton").click(function () {
    console.log("Rectangle Button clicked");
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
});
