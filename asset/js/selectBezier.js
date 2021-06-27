class Bezier {
    // instantiating a new Line saves the coordinates and color(default: black), does not actually draw it yet
    constructor(x, y, cx1, cy1, cx2, cy2, w, h, stroke, lineWidth) {
        this.x = x;
        this.y = y;
        this.cx1 = cx1;
        this.cy1 = cy1;
        this.cx2 = cx2;
        this.cy2 = cy2;
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
        context.bezierCurveTo(this.cx1,this.cy1,this.cx2,this.cy2,this.w, this.h);
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
            bezierSelectionHandles[0].x = this.x - half;
            bezierSelectionHandles[0].y = this.y - half;

            bezierSelectionHandles[1].x = this.cx1 - half;
            bezierSelectionHandles[1].y = this.cy1 - half;

            bezierSelectionHandles[2].x = this.cx2 - half;
            bezierSelectionHandles[2].y = this.cy2 - half;

            bezierSelectionHandles[3].x = this.w - half;
            bezierSelectionHandles[3].y = this.h - half;
  
            for (var i = 0; i < 4; i++) {
                var cur = bezierSelectionHandles[i];
                context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
  
        }
    };
  };

var bezierSelectionHandles = [];

  function bezierMove(e){
      if (isDrag) {
        getMouse(e);
        
        mySel.x = mx - offsetx;
        mySel.y = my - offsety;
       
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
              mySel.cx1 = mySel.cx1;
              mySel.cy1 = mySel.cy1;
              mySel.cx2 = mySel.cx2;
              mySel.cy2 = mySel.cy2;
              mySel.w = mySel.w;
              mySel.h = mySel.h;
            break;    
          case 1:
            mySel.x = oldx;
            mySel.y = oldy;
            mySel.cx1 = mx;
            mySel.cy1 = my;
            mySel.cx2 = mySel.cx2;
            mySel.cy2 = mySel.cy2;
            mySel.w = mySel.w;
            mySel.h = mySel.h;
            break;
            case 2:
                mySel.x = oldx;
                mySel.y = oldy;
                mySel.cx1 = mySel.cx1;
                mySel.cy1 = mySel.cy1;
                mySel.cx2 = mx;
                mySel.cy2 = my;
                mySel.w = mySel.w;
                mySel.h = mySel.h;
                break;
            case 3:
                mySel.x = oldx;
                mySel.y = oldy;
                mySel.cx1 = mySel.cx1;
                mySel.cy1 = mySel.cy1;
                mySel.cx2 = mySel.cx2;
                mySel.cy2 = mySel.cy2;
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
  
          var cur = bezierSelectionHandles[i];
          
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