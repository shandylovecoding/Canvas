var imageData;
var colorArray
var fillIdx = 0;

class Fillflood extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
  }

  onMouseDown([mouseX, mouseY], e) {
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
      return "0xFF" + componentToHex(b) + componentToHex(g) + componentToHex(r);
    }
    var newColor = rgbToHex(R, G, B)
    function floodFill(x, y, newColor) {
      var left, right, leftEdge, rightEdge;
      const w = contextReal.canvas.width, h = contextReal.canvas.height, pixels = w * h;
      const imgData = contextReal.getImageData(0, 0, w, h);
      const p32 = new Uint32Array(imgData.data.buffer);
      const stack = [x + y * w]; // add starting pos to stack
      const targetColor = p32[stack[0]];
      if (targetColor === newColor || targetColor === undefined) { return } // avoid endless loop
      while (stack.length) {
        let idx = stack.pop();
        while (idx >= w && p32[idx - w] === targetColor) { idx -= w }; // move to top edge
        right = left = false;
        leftEdge = (idx % w) === 0;
        rightEdge = ((idx + 1) % w) === 0;
        while (p32[idx] === targetColor) {
          p32[idx] = newColor;
          if (!leftEdge) {
            if (p32[idx - 1] === targetColor) { // check left
              if (!left) {
                stack.push(idx - 1);  // found new column to left
                left = true;  // 
              }
            } else if (left) { left = false }
          }
          if (!rightEdge) {
            if (p32[idx + 1] === targetColor) {
              if (!right) {
                stack.push(idx + 1); // new column to right
                right = true;
              }
            } else if (right) { right = false }
          }
          idx += w;
        }
      }

      contextReal.putImageData(imgData, 0, 0);
      getsnapshot();
      return;
    }
    floodFill(mouseX, mouseY, newColor)
  }

  onDragging([mouseX, mouseY], e) {
  }
}
$("#fillflood").click(function () {
  currentFunction = new Fillflood(contextReal, contextDraft);
});

