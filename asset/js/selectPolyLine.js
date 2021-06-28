
class PolyLine {
    // instantiating a new Line saves the coordinates and color(default: black), does not actually draw it yet
    constructor(arr,x,y , stroke, lineWidth) {
        this.arr = arr
        this.x = x;
        this.y = y;
        this.stroke = stroke;
        this.lineWidth = lineWidth
    };
  
    // actually draws on the context using the commit method
    draw = (context) => {
        if (context === gctx) {
            context.fillStyle = 'black';
            context.strokeStyle = 'black';
            context.lineWidth = 1
        } else {
            context.strokeStyle = this.stroke;
            context.lineWidth = this.lineWidth
        }
  
        // We can skip the drawing of elements that have moved off the screen:
        if (this.x > WIDTH || this.y > HEIGHT) return;
        if (this.x + this.w < 0 || this.y + this.h < 0) return;
        context.beginPath();
        context.moveTo(this.x, this.y);
        for(let i in this.arr){
        context.lineTo(this.arr[i].x, this.arr[i].y);
        }
        context.stroke();;
  
        if (mySel === this) {
            context.strokeStyle = `${colorStroke}`;
            context.fillStyle = `${colorFill}`;
            context.lineWidth = lineWidth;
            var half = mySelBoxSize / 2;
  
         
  
            // top left, middle, right
            polylineSelectionHandles[0].x = this.x - half;
            polylineSelectionHandles[0].y = this.y - half;
  
            polylineSelectionHandles[1].x = this.w - half;
            polylineSelectionHandles[1].y = this.h - half;

            polylineSelectionHandles[2].x = this.x - half;
            polylineSelectionHandles[2].y = this.h - half;

            polylineSelectionHandles[3].x = this.w - half;
            polylineSelectionHandles[3].y = this.h - half;
            console.log(polylineSelectionHandles);
            for (var i = 0; i < 4; i++) {
                var cur = polylineSelectionHandles[i];
                context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
  
        }
    };
  };
  
var polylineSelectionHandles = [];

  function polyLineMove(e){
      if (isDrag) {
        getMouse(e);
        
        mySel.x = mx - offsetx;
        mySel.y = my - offsety;
        mySel.w = mySel.x + offsetx*2;
        mySel.h = mySel.y + offsety*2;
       
        console.log(mySel);
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
  
          var cur = polylineSelectionHandles[i];
          
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