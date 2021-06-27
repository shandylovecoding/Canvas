// Box object to hold data
class Rect {
    constructor(x, y, w, h, fill, stroke, lineWidth) {
        this.x = x;
        this.y = y;
        this.w = w; // default width and height?
        this.h = h;
        this.fill = fill;
        this.stroke = stroke;
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
            context.strokeStyle = 'black';
            context.lineWidth = 1
        } else {
            context.fillStyle = this.fill;
            context.strokeStyle = this.stroke;
            context.lineWidth = this.lineWidth;
        }

        // We can skip the drawing of elements that have moved off the screen:
        if (this.x > WIDTH || this.y > HEIGHT) return;
        if (this.x + this.w < 0 || this.y + this.h < 0) return;

        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);

        // draw selection
        // this is a stroke along the box and also 8 new selection handles
        if (mySel === this) {
            const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

            context.strokeStyle = `${colorStroke}`;
            context.fillStyle = `${colorFill}`;
            context.lineWidth = lineWidth;
            context.strokeRect(this.x, this.y, this.w, this.h);
            context.fillRect(this.x, this.y, this.w, this.h);

            console.log(context)

            // draw the boxes

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


            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 8; i++) {
                var cur = selectionHandles[i];
                context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
        }

    } // end draw

}

// class Line {
//     // instantiating a new Line saves the coordinates and color(default: black), does not actually draw it yet
//     constructor(x, y, w, h, fill, stroke, lineWidth) {
//         this.x = x;
//         this.y = y;
//         this.w = w; // default width and height?
//         this.h = h;
//         this.fill = fill;
//         this.stroke = stroke;
//         this.lineWidth = lineWidth
//     };

//     // actually draws on the context using the commit method
//     draw = (context) => {
//         if (context === gctx) {
//             context.fillStyle = 'black';
//             context.strokeStyle = 'black';
//             context.lineWidth = 1
//         } else {
//             context.fillStyle = this.fill;
//             context.strokeStyle = this.stroke;
//             context.lineWidth = this.lineWidth
//         }

//         // We can skip the drawing of elements that have moved off the screen:
//         if (this.x > WIDTH || this.y > HEIGHT) return;
//         if (this.x + this.w < 0 || this.y + this.h < 0) return;


//         context.moveTo(this.x, this.y);
//         context.lineTo(this.w, this.h);
//         context.stroke();

//         if (mySel === this) {
//             const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

//             context.strokeStyle = `${colorStroke}`;
//             context.fillStyle = `${colorFill}`;
//             context.lineWidth = lineWidth;


//             var half = mySelBoxSize / 2;

//             // 0  1  2
//             // 3     4
//             // 5  6  7
//              console.log(selectionHandles)

//             // top left, middle, right
//             selectionHandles[0].x = this.x - half;
//             selectionHandles[0].y = this.y - half;

//             selectionHandles[7].x = this.w - half;
//             selectionHandles[7].y = this.h - half;
//             context.fillStyle = mySelBoxColor;

//             for (var i = 0; i < 8; i++) {
//                 var cur = selectionHandles[i];
//                 context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
//             }

//         }
//     };
// };


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

            selectionHandles[0].x = this.x - half;
            selectionHandles[0].y = this.y - half;

            selectionHandles[1].x = this.x + this.w / 2 - half;
            selectionHandles[1].y = this.y - half;

            selectionHandles[2].x = this.x + this.w - half;
            selectionHandles[2].y = this.y - half;

            //middle left
            selectionHandles[3].x = this.x - half;
            selectionHandles[3].y = Math.abs(this.y - this.h / 2 - half);

            //middle right
            selectionHandles[4].x = this.x + this.w - half;
            selectionHandles[4].y = this.y + this.h / 2 - half;

            //bottom left, middle, right
            
            selectionHandles[5].x = this.x - half;
            selectionHandles[5].y = this.h - half;
            
            selectionHandles[6].x = Math.abs(this.x - this.w / 2 - half);
            selectionHandles[6].y = this.h - half;

            selectionHandles[7].x = this.w - half;
            selectionHandles[7].y = this.h - half;

            for (var i = 0; i < 8; i++) {
                var cur = selectionHandles[i];
                context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }

        }
    };
};
