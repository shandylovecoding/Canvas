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
            context.lineWidth = this.lineWidth
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
            context.lineWidth = lineWidth;
            context.strokeRect(this.x, this.y, this.w, this.h);
            context.fillRect(this.x, this.y, this.w, this.h);

            // draw the boxes

            var half = mySelBoxSize / 2;

            // 0  1  2
            // 3     4
            // 5  6  7

            // top left, middle, right
            rectSelectionHandles[0].x = this.x - half;
            rectSelectionHandles[0].y = this.y - half;

             rectSelectionHandles[1].x = this.x + this.w / 2 - half;
             rectSelectionHandles[1].y = this.y - half;

             rectSelectionHandles[2].x = this.x + this.w - half;
             rectSelectionHandles[2].y = this.y - half;

            //middle left
             rectSelectionHandles[3].x = this.x - half;
             rectSelectionHandles[3].y = this.y + this.h / 2 - half;

            //middle right
             rectSelectionHandles[4].x = this.x + this.w - half;
             rectSelectionHandles[4].y = this.y + this.h / 2 - half;

            //bottom left, middle, right
            rectSelectionHandles[5].x = this.x - half;
            rectSelectionHandles[5].y = this.y + this.h - half; 
            
            rectSelectionHandles[6].x = this.x + this.w / 2 - half;
             rectSelectionHandles[6].y = this.y + this.h - half;

             rectSelectionHandles[7].x = this.x + this.w - half;
             rectSelectionHandles[7].y = this.y + this.h - half;


            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 8; i++) {
                var cur = rectSelectionHandles[i];
                context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
        }

    } // end draw

}


var rectSelectionHandles = [];



// Happens when the mouse is moving inside the canvas
function rectMove(e){
    if (isDrag) {
      getMouse(e);
      
      mySel.x = mx - offsetx;
      mySel.y = my - offsety;   
      
      // something is changing position so we better invalidate the canvas!
      invalidate();
    } else if (isResizeDrag) {
      // time ro resize!
      var oldx = mySel.x;
      var oldy = mySel.y;
      
      // 0  1  2
      // 3     4
      // 5  6  7
      switch (expectResize) {
        case 0: 
         mySel.x = mx;
          mySel.y = my;
          mySel.w += oldx - mx;
          mySel.h += oldy - my;
          break;
        case 1:
          mySel.y = my;
          mySel.h += oldy - my;
          break;
        case 2:
          mySel.y = my;
          mySel.w = mx - oldx;
          mySel.h += oldy - my;
          break;
        case 3:
          mySel.x = mx;
          mySel.w += oldx - mx;
          break;
        case 4:
          mySel.w = mx - oldx;
          break;
        case 5:
          mySel.x = mx;
          mySel.w += oldx - mx;
          mySel.h = my - oldy;
          break;
        case 6:
          mySel.h = my - oldy;
          break;
        case 7:
          mySel.w = mx - oldx;
          mySel.h = my - oldy;
          break;
      }
      
      invalidate();
    }
    
    getMouse(e);
    // if there's a selection see if we grabbed one of the selection handles
    if (mySel !== null && !isResizeDrag) {
      for (var i = 0; i < 8; i++) {
        // 0  1  2
        // 3     4
        // 5  6  7
        
        var cur = rectSelectionHandles[i];
        
        // we dont need to use the ghost context because
        // selection handles will always be rectangles
        if (mx >= cur.x && mx <= cur.x + mySelBoxSize &&
            my >= cur.y && my <= cur.y + mySelBoxSize) {
          // we found one!
          expectResize = i;
          invalidate();
          
          switch (i) {
            case 0:
              this.style.cursor='nw-resize';
              break;
            case 1:
              this.style.cursor='n-resize';
              break;
            case 2:
              this.style.cursor='ne-resize';
              break;
            case 3:
              this.style.cursor='w-resize';
              break;
            case 4:
              this.style.cursor='e-resize';
              break;
            case 5:
              this.style.cursor='sw-resize';
              break;
            case 6:
   
            this.style.cursor='s-resize';
              break;
            case 7:
              this.style.cursor='se-resize';
              break;
          }
          return;
        }
        
      }
      // not over a selection box, return to normal
      isResizeDrag = false;
      expectResize = -1;
    }
    
  }