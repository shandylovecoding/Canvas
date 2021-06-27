class Quadratic {
    // instantiating a new Line saves the coordinates and color(default: black), does not actually draw it yet
    constructor(x, y, cx, cy, w, h, stroke, lineWidth) {
        this.x = x;
        this.y = y;
        this.cx = cx;
        this.cy = cy;
        this.w = w; // default width and height?
        this.h = h;
        this.stroke = stroke;
        this.lineWidth = lineWidth
    };

    // actually draws on the context using the commit method
    draw = (context) => {
        if (context === gctx) {
            context.strokeStyle = 'black';
            context.lineWidth = 1
        } else {
            context.strokeStyle = this.stroke;
            context.lineWidth = this.lineWidth
        }

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.quadraticCurveTo(this.cx,this.cy,this.w, this.h);
        context.stroke();

        if (mySel === this) {
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

            context.strokeStyle = `${colorStroke}`;
            context.fillStyle = `${colorFill}`;
            context.lineWidth = lineWidth;

            var half = mySelBoxSize / 2;

            // 0  1  2
            // 3     4
            // 5  6  7
             console.log(selectionHandles)

            // top left, middle, right
            selectionHandles[0].x = this.x - half;
            selectionHandles[0].y = this.y - half;

            selectionHandles[1].x = this.x + this.w / 2 - half;
            selectionHandles[1].y = this.y - half;

            selectionHandles[2].x = this.x + this.w - half;
            selectionHandles[2].y = this.y - half;

            //middle left
            selectionHandles[3].x = this.x - half;
            selectionHandles[3].y = this.y + this.h / 2 - half;

            //middle right
            selectionHandles[4].x = this.x + this.w - half;
            selectionHandles[4].y = this.y + this.h / 2 - half;

            //bottom left, middle, right
            selectionHandles[6].x = this.x + this.w / 2 - half;
            selectionHandles[6].y = this.y + this.h - half;

            selectionHandles[5].x = this.x - half;
            selectionHandles[5].y = this.y + this.h - half;

            selectionHandles[7].x = this.x + this.w - half;
            selectionHandles[7].y = this.y + this.h - half;

            for (var i = 0; i < 8; i++) {
                var cur = selectionHandles[i];
                context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }

        }
    };
};
