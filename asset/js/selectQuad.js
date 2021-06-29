
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
    context.quadraticCurveTo(this.cx, this.cy, this.w, this.h);
    context.stroke();

    if (mySel === this) {
      context.strokeStyle = `${colorStroke}`;
      context.fillStyle = `${colorFill}`;
      context.lineWidth = lineWidth;
      var half = mySelBoxSize / 2;

      quadSelectionHandles[0].x = this.x - half;
      quadSelectionHandles[0].y = this.y - half;

      quadSelectionHandles[1].x = this.cx - half;
      quadSelectionHandles[1].y = this.cy - half;

      quadSelectionHandles[2].x = this.w - half;
      quadSelectionHandles[2].y = this.h - half;

      for (var i = 0; i < 3; i++) {
        var cur = quadSelectionHandles[i];
        context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
      }

    }
  };
};

var quadSelectionHandles = [];

function quadMove(e) {
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
        mySel.cx = mySel.cx;
        mySel.cy = mySel.cy;
        mySel.w = mySel.w;
        mySel.h = mySel.h;
        break;
      case 1:
        mySel.x = oldx;
        mySel.y = oldy;
        mySel.cx = mx;
        mySel.cy = my;
        mySel.w = mySel.w;
        mySel.h = mySel.h;
        break;
      case 2:
        mySel.x = oldx;
        mySel.y = oldy;
        mySel.cx = mySel.cx;
        mySel.cy = mySel.cy;
        mySel.w = mx;
        mySel.h = my;
        break;
    }
    invalidate();
  }

  getMouse(e);
  // if there's a selection see if we grabbed one of the selection handles
  if (mySel !== null && !isResizeDrag) {
    for (var i = 0; i < 3; i++) {

      var cur = quadSelectionHandles[i];

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

