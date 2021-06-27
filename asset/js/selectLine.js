class Line {
  // instantiating a new Line saves the coordinates and color(default: black), does not actually draw it yet
  constructor(x, y, w, h, fill, stroke, lineWidth) {
      this.x = x;
      this.y = y;
      this.w = w; // default width and height?
      this.h = h;
      this.fill = fill;
      this.stroke = stroke;
      this.lineWidth = lineWidth
  };

  // actually draws on the context using the commit method
  draw = (context) => {
      console.log("drawing a line")
      if (context === gctx) {
          context.fillStyle = 'black';
          context.strokeStyle = 'black';
          context.lineWidth = 1
      } else {
          context.fillStyle = this.fill;
          context.strokeStyle = this.stroke;
          context.lineWidth = this.lineWidth
      }

      // We can skip the drawing of elements that have moved off the screen:
      if (this.x > WIDTH || this.y > HEIGHT) return;
      if (this.x + this.w < 0 || this.y + this.h < 0) return;

      context.beginPath()
      context.moveTo(this.x, this.y);
      context.lineTo(this.w, this.h);
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
  };
};
function lineMove(e){
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
            mySel.w = mySel.w;
            mySel.h = mySel.h;
          break;    
        case 1:
            mySel.x = oldx;
            mySel.y = oldy;
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

        var cur = lineSelectionHandles[i];
        
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