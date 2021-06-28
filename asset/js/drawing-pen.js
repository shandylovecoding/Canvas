var strokesPen = []
var strokesStorePen = []

class DrawingPen extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.context = contextReal;
    }

    onMouseDown([mouseX, mouseY], e) {
        this.context.strokeStyle = `${colorStroke}`;
        this.context.fillStyle = `${colorFill}`;
        this.context.lineWidth = lineWidth;
        this.context.beginPath();
        this.context.moveTo(mouseX, mouseY);
        this.draw(mouseX, mouseY);
    }
    onDragging([mouseX, mouseY], e) {
        this.draw(mouseX, mouseY);
    }
    onMouseUp() {
        addPen(strokesStorePen, mouseX, mouseY, `${colorStroke}`, lineWidth);
        getsnapshot();
    }

    draw(x, y) {
        this.context.lineTo(x, y);
        this.context.moveTo(x, y);
        this.context.closePath();
        this.context.stroke();
        strokesStorePen.push({ x: mouseX, y: mouseY })

    }
}
$("#penButton").click(function () {
    currentFunction = new Pen(contextReal, contextDraft);
});
