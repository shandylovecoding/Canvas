const strokes = []

class DrawingPolyline extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
        if (clicks == 0) {
            this.contextDraft.lineJoin = "round";
            this.contextReal.lineJoin = "round";
            this.contextDraft.strokeStyle = "#002fa7";
            this.contextReal.strokeStyle = "#002fa7";
            this.contextDraft.lineWidth = 5;
            this.contextReal.lineWidth = 5;
            this.origX = mouseX;
            this.origY = mouseY;
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.origX, this.origY);
            clicks = 1;
        } else if (clicks >= 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.lineTo(mouseX, mouseY);
            this.contextReal.stroke();
            strokes.push({x: mouseX, y: mouseY});
            clicks++;
        }
    }

    onDragging() {}

    onMouseMove(e) {
        if (clicks !== 0) {
            $(document).keydown(function (e) {
                let keyCode = e.keyCode;
                if (keyCode === 27 || keyCode === 13) {
                    clicks = 0;
                    strokes = [];
                }
            })
        } if (clicks == 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX, this.origY);
            this.contextDraft.lineTo(mouseX, mouseY);
            this.contextDraft.stroke();
        } if (clicks > 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(strokes[strokes.length-1]["x"], strokes[strokes.length-1]["y"]);
            this.contextDraft.lineTo(mouseX, mouseY);
            this.contextDraft.stroke();
        }
    }
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}

}

$("#polylineButton").click(function () {
    console.log("Polyline button clicked");
    currentFunction = new DrawingPolyline(contextReal, contextDraft);
});