
// Box object to hold data
class Pen {
    constructor(x, y, x2, y2, fill, lineWidth) {
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.fill = fill;
        this.lineWidth = lineWidth
    }
    // New methods on the Box class

    // we used to have a solo draw function
    // but now each box is responsible for its own drawing
    // mainDraw() will call this with the normal canvas
    // myDown will call this with the ghost canvas with 'black'
    draw = (context) => {
        if (context === gctx) {
            context.fillStyle = 'black';
            context.lineWidth = 1
        } else {
          context.fillStyle = this.fill;
          context.lineWidth = this.lineWidth
        }

        // We can skip the drawing of elements that have moved off the screen:
        if (this.x > WIDTH || this.y > HEIGHT) return;
        if (this.x + this.w < 0 || this.y + this.h < 0) return;
            
            context.beginPath()
            context.lineTo(this.x, this.y);
            context.moveTo(this.x2, this.y2);
            context.closePath();
            context.stroke();

      if (mySel === this) {
        context.strokeStyle = `${colorStroke}`;
        context.fillStyle = `${colorFill}`;
        context.lineWidth = lineWidth;
        var half = mySelBoxSize / 2;

        // 0  1  2
        // 3     4
        // 5  6  7

        // top left, middle, right
        lineSelectionHandles[0].x = this.x - half;
        lineSelectionHandles[0].y = this.y - half;

        lineSelectionHandles[1].x = this.w - half;
        lineSelectionHandles[1].y = this.h - half;

        for (var i = 0; i < 2; i++) {
            var cur = lineSelectionHandles[i];
            context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
        }

    }
    }
}