// Box object to hold data

class Polygon {
    constructor(x, y, w, h, radius, side, fill, stroke, lineWidth) {
        this.x = x;
        this.y = y;
        this.w = w; // default width and height?
        this.h = h;
        this.radius = radius;
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

        context.beginPath();
        context.moveTo(this.x+this.radius* Math.cos(0),this.y+this.radius * Math.sin(0));
        for (var i = 1; i <= this.side+1; i++) {
          context.lineTo(this.x + this.radius * Math.cos((Math.PI * 2 / this.side) * i), this.y + this.radius * Math.sin((Math.PI * 2 / this.side) * i));
          context.stroke();
          context.fill();
        }

        // draw selection
        // this is a stroke along the box and also 8 new selection handles
        if (mySel === this) {
            context.strokeStyle = `${colorStroke}`;
            context.fillStyle = `${colorFill}`;
            context.lineWidth = lineWidth;
            var half = mySelBoxSize / 2;

            polygonSelectionHandles[0].x = this.x - this.radius - half;
            polygonSelectionHandles[0].y = this.y + this.radius - half;

             polygonSelectionHandles[1].x = this.x + this.radius - half;
             polygonSelectionHandles[1].y = this.y + this.radius - half;

             polygonSelectionHandles[2].x = this.x - this.radius - half;
             polygonSelectionHandles[2].y = this.y - this.radius - half;

             polygonSelectionHandles[3].x = this.x + this.radius - half;
             polygonSelectionHandles[3].y = this.y - this.radius - half;

            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 4; i++) {
                var cur = polygonSelectionHandles[i];
                context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
        }

    } // end draw

}


var polygonSelectionHandles = [];



// Happens when the mouse is moving inside the canvas
function polygonMove(e){
    if (isDrag) {
      getMouse(e);
      
      mySel.x = mx;
      mySel.y = my; 
      
      // something is changing position so we better invalidate the canvas!
      invalidate();
    } else if (isResizeDrag) {
      // time ro resize!
      var oldr = mySel.radius
      
      // 0  1  2
      // 3     4
      // 5  6  7
      switch (expectResize) {
        case 0:
mySel.radius = (mx-mySel.x);

          break;
        case 1:
          mySel.x = mySel.x;
          mySel.y = my;
          mySel.w = mx;
          mySel.h = mySel.h;
          break;
        case 2:
          mySel.x = mx;
          mySel.y = mySel.y;
          mySel.w = mySel.w;
          mySel.h = my;
          break;
        case 3:
          mySel.x = mySel.x;
          mySel.y = mySel.y;
          mySel.w = mx;
          mySel.h = my;
          break;
      }
      
      invalidate();
    }
    
    getMouse(e);
    // if there's a selection see if we grabbed one of the selection handles
    if (mySel !== null && !isResizeDrag) {
      for (var i = 0; i < 4; i++) {

        
        var cur = polygonSelectionHandles[i];
        
        // we dont need to use the ghost context because
        // selection handles will always be rectangles
        if (mx >= cur.x && mx <= cur.x + mySelBoxSize &&
            my >= cur.y && my <= cur.y + mySelBoxSize) {
          // we found one!
          expectResize = i;
          invalidate();
          
          return;
        }
        
      }
      // not over a selection box, return to normal
      isResizeDrag = false;
      expectResize = -1;
    }
    
  }