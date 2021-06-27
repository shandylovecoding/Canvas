
  
  class Select extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextReal = contextReal;
        this.origX = mouseX;
        this.origY = mouseY;
    }

    onMouseDown([mouseX, mouseY], e) {
      myDown(e)
    }

    onDragging(){
    }
    onMouseMove([mouseX, mouseY], e){
      myMove(e)
    }
    onMouseUp([mouseX, mouseY], e){
      myUp(e)
    }
    onMouseLeave(){}
    onMouseEnter(){}
};

  $("#select").click(function () {
    console.log("select Button clicked");
    currentFunction = new Select(contextReal, contextDraft);
});
// Last updated November 2010 by Simon Sarris
// www.simonsarris.com
// sarris@acm.org
//
// Free to use and distribute at will
// So long as you are nice to people, etc

// This is a self-executing function that I added only to stop this
// new script from interfering with the old one. It's a good idea in general, but not
// something I wanted to go over during this tutorial
// (function(window) {


  // holds all our boxes
  var boxes = []; 
  
  // New, holds the 8 tiny boxes that will be our selection handles
  // the selection handles will be in this order:
  // 0  1  2
  // 3     4
  // 5  6  7
  var selectionHandles = [];
  
  // Hold canvas information
  var canvas;
  var ctx;
  var WIDTH;
  var HEIGHT;
  var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed
  
  var isDrag = false;
  var isResizeDrag = false;
  var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
  var mx, my; // mouse coordinates
  
   // when set to true, the canvas will redraw everything
   // invalidate() just sets this to false right now
   // we want to call invalidate() whenever we make a change
  var canvasValid = false;
  
  // The node (if any) being selected.
  // If in the future we want to select multiple objects, this will get turned into an array
  var mySel = null;
  
  // The selection color and width. Right now we have a red selection with a small width
  var mySelColor = '#CC0000';
  var mySelWidth = 2;
  var mySelBoxColor = 'darkred'; // New for selection boxes
  var mySelBoxSize = 6;
  
  // we use a fake canvas to draw individual shapes for selection testing
  var ghostcanvas;
  var gctx; // fake canvas context
  
  // since we can drag from anywhere in a node
  // instead of just its x/y corner, we need to save
  // the offset of the mouse when we start dragging.
  var offsetx, offsety;
  
  // Padding and border style widths for mouse offsets
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  
  
  
  

  

  // initialize our canvas, add a ghost canvas, set draw loop
  // then add everything we want to intially exist on the canvas
  function init2() {
    canvas = document.getElementById('canvas-real');
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    ctx = canvas.getContext('2d');
    ghostcanvas = document.createElement('canvas');
    ghostcanvas.height = HEIGHT;
    ghostcanvas.width = WIDTH;
    ghostcanvas.style.backgroundColor = "transparent";
    gctx = ghostcanvas.getContext('2d');
    
    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.onselectstart = function () { return false; }
    
    // fixes mouse co-ordinate problems when there's a border or padding
    // see getMouse for more detail
    if (document.defaultView && document.defaultView.getComputedStyle) {
      stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)     || 0;
      stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)      || 0;
      styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
      styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)  || 0;
    }
    
    // make mainDraw() fire every INTERVAL milliseconds
    setInterval(mainDraw, INTERVAL);
    
    // set our events. Up and down are for dragging,
    // double click is for making new boxes
    // canvas.onmousedown = myDown;
    // canvas.onmouseup = myUp;
    // canvas.ondblclick = myDblClick;
    // canvas.onmousemove = myMove;
    
    // set up the selection handle boxes
    for (var i = 0; i < 8; i ++) {
      var rect = new Rect;
      selectionHandles.push(rect);
    }
    for (var i = 0; i < 10; i ++) {
      var line = new Line;
      selectionHandles.push(line);
    }
    
    // add custom initialization here:
  
    
    // // add a large green rectangle
    // addRect(260, 70, 60, 65, 'rgba(0,205,0,0.7)');
    
    // // add a green-blue rectangle
    // addRect(240, 120, 40, 40, 'rgba(2,165,165,0.7)');  
    
    // // add a smaller purple rectangle
    // addRect(45, 60, 25, 25, 'rgba(150,150,250,0.7)');
  }
  
  
  //wipes the canvas context
  function clear(c) {
    c.clearRect(0, 0, WIDTH, HEIGHT);
  }
  
  // Main draw loop.
  // While draw is called as often as the INTERVAL variable demands,
  // It only ever does something if the canvas gets invalidated by our code
  function mainDraw() {
    if (canvasValid == false) {
      clear(ctx); 
      // Add stuff you want drawn in the background all the time here
      
      // draw all boxes
      var l = boxes.length;
      for (var i = 0; i < l; i++) {
        boxes[i].draw(ctx); // we used to call drawshape, but now each box draws itself
      }
      
      // Add stuff you want drawn on top all the time here
      
      canvasValid = true;
    }
  }
  
  // Happens when the mouse is moving inside the canvas
  function myMove(e){
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
        
        var cur = selectionHandles[i];
        
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
  
  // Happens when the mouse is clicked in the canvas
  function myDown(e){
    getMouse(e);
    
    //we are over a selection box
    if (expectResize !== -1) {
      isResizeDrag = true;
      return;
    }
    
    clear(gctx);
    var l = boxes.length;
    for (var i = l-1; i >= 0; i--) {
      // draw shape onto ghost context
      boxes[i].draw(gctx, 'black');
      
      // get image data at the mouse x,y pixel
      var imageData = gctx.getImageData(mx, my, 1, 1);
      var index = (mx + my * imageData.width) * 4;
      
      // if the mouse pixel exists, select and break
      if (imageData.data[3] > 0) {
        mySel = boxes[i];
        offsetx = mx - mySel.x;
        offsety = my - mySel.y;
        mySel.x = mx - offsetx;
        mySel.y = my - offsety;
        isDrag = true;
        
        invalidate();
        clear(gctx);
        return;
      }
      
    }
    // havent returned means we have selected nothing
    mySel = null;
    // clear the ghost canvas for next time
    clear(gctx);
    // invalidate because we might need the selection border to disappear
    invalidate();
  }
  

  function myUp(){
    isDrag = false;
    isResizeDrag = false;
    expectResize = -1;
  }
  
  // adds a new node
  function myDblClick(e) {
    getMouse(e);
    // for this method width and height determine the starting X and Y, too.
    // so I left them as vars in case someone wanted to make them args for something and copy this code
    var width = 20;
    var height = 20;
    addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)');
  }
  
  
  function invalidate() {
    canvasValid = false;
  }
  
  // Sets mx,my to the mouse position relative to the canvas
  // unfortunately this can be tricky, we have to worry about padding and borders
  function getMouse(e) {
        var element = canvas, offsetX = 0, offsetY = 0;
  
        if (element.offsetParent) {
          do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
          } while ((element = element.offsetParent));
        }
  
        // Add padding and border style widths to offset
        offsetX += stylePaddingLeft;
        offsetY += stylePaddingTop;
  
        offsetX += styleBorderLeft;
        offsetY += styleBorderTop;
  
        mx = e.pageX - offsetX;
        my = e.pageY - offsetY
  }
  
  // If you dont want to use <body onLoad='init()'>
  // You could uncomment this init() reference and place the script reference inside the body tag
  //init();
  window.init2 = init2;
  // })(window);
  
  // Andy added, as a replacement for 
  // <body onLoad="init2()">
  $(document).ready(function(){
    // Your code here
    init2();
  });
  
 
