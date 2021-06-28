
// Box object to hold data
class Pen {
    constructor(arr,x,y , stroke, lineWidth) {
        this.arr = arr
        this.x = x;
        this.y = y;
        this.stroke = stroke;
        this.lineWidth = lineWidth
    };
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
            for(let i in this.arr){
            context.lineTo(this.arr[i].x, this.arr[i].y);
            context.moveTo(this.arr[i].x, this.arr[i].y);
            }
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
        penSelectionHandles[0].x = this.x - half;
        penSelectionHandles[0].y = this.y - half;

        penSelectionHandles[1].x = this.w - half;
        penSelectionHandles[1].y = this.h - half;
        
        penlineSelectionHandles[2].x = this.x - half;
        penlineSelectionHandles[2].y = this.h - half;

        penlineSelectionHandles[3].x = this.w - half;
        penlineSelectionHandles[3].y = this.h - half;

        for (var i = 0; i < 4; i++) {
            var cur = penSelectionHandles[i];
            context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
        }

    }
    }
}

var penSelectionHandles = [];
function penMove(e){
    if (isDrag) {
      getMouse(e);
      
      mySel.x = mx - offsetx;
      mySel.y = my - offsety;
      mySel.w = mySel.x + offsetx*2;
      mySel.h = mySel.y + offsety*2;
     
      // something is changing position so we better invalidate the canvas!
      invalidate();
    } else if (isResizeDrag) {
      // time ro resize!
      var oldx = mySel.x;
      var oldy = mySel.y;
     
      switch (expectResize) {
        case 0:   
            mySel.x = mx;
            mySel.y = my;
            mySel.w = mySel.w;
            mySel.h = mySel.h;
          break;    
        case 1:
            mySel.x = oldx;
            mySel.y = oldy;
            mySel.w = mx;
            mySel.h = my;
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
      for (var i = 0; i < 2; i++) {

        var cur = penlineSelectionHandles[i];
        
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