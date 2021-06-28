var strokes = []
var strokesStore = []


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
            this.contextDraft.strokeStyle = `${colorStroke}`;
            this.contextReal.strokeStyle = `${colorStroke}`;
            this.contextDraft.lineWidth = lineWidth;
            this.contextReal.lineWidth = lineWidth;
            this.origX = mouseX;
            this.origY = mouseY;
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.origX, this.origY);
            clicks = 1;
        } else if (clicks >= 1) {
            // this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextReal.lineTo(mouseX, mouseY);
            this.contextReal.stroke();
            strokes.push({x: mouseX, y: mouseY});
            strokesStore.push({x: mouseX, y: mouseY})
            clicks++;
            getsnapshot();
        }
    }

    onDragging() {}

    onMouseMove(e) {
        if (clicks !== 0) {
            $(document).keydown(function (e) {
                let keyCode = e.keyCode;
                 console.log(strokesStore);
                addPolyLine(strokesStore, mouseX , mouseY , `${colorStroke}`,lineWidth);
                if (keyCode === 27 || keyCode === 13) {
                    clicks = 0;
                    strokes = [];
                    // this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
                }
            })
        } if (clicks == 1) {
           
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(strokes[strokes.length-1].x, strokes[strokes.length-1].y);
            this.contextDraft.lineTo(mouseX, mouseY);
            this.contextDraft.stroke();
        } if (clicks > 1) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(strokes[strokes.length-1].x, strokes[strokes.length-1].y);
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