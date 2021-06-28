// Box object to hold data

class Circle {
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

    context.beginPath();
    context.moveTo(this.x, this.y + (this.h - this.y) / 2);
    context.bezierCurveTo(this.x, this.y, this.w, this.y, this.w, this.y + (this.h - this.y) / 2);
    context.bezierCurveTo(this.w, this.h, this.x, this.h, this.x, this.y + (this.h - this.y) / 2);
    context.closePath();
    context.fill();
    context.stroke();

    // draw selection
    // this is a stroke along the box and also 8 new selection handles
    if (mySel === this) {
      context.strokeStyle = `${colorStroke}`;
      context.fillStyle = `${colorFill}`;
      context.lineWidth = lineWidth;
      var half = mySelBoxSize / 2;

      circleSelectionHandles[0].x = this.x - half;
      circleSelectionHandles[0].y = this.y - half;

      circleSelectionHandles[1].x = this.w - half;
      circleSelectionHandles[1].y = this.y - half;

      circleSelectionHandles[2].x = this.x - half;
      circleSelectionHandles[2].y = this.h - half;

      circleSelectionHandles[3].x = this.w - half;
      circleSelectionHandles[3].y = this.h - half;

      context.fillStyle = mySelBoxColor;
      for (var i = 0; i < 4; i++) {
        var cur = circleSelectionHandles[i];
        context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
      }
    }

  } // end draw

}


var circleSelectionHandles = [];



// Happens when the mouse is moving inside the canvas
function circleMove(e) {
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

    switch (expectResize) {
      case 0:
        mySel.x = mx;
        mySel.y = my;
        mySel.w = mySel.w
        mySel.h = mySel.h
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


      var cur = circleSelectionHandles[i];

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