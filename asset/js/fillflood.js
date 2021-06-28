// var width = contextReal.width
// var height = contextReal.height
// var R
// var G
// var B;
// var RtoFill, GtoFill, BtoFill;
// var type = 4;
var imageData;
var colorArray 
var fillIdx = 0;

// console.log(colorArray);
// var newImgData
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
    console.log(newColor);
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
          while(idx >= w && p32[idx - w] === targetColor) { idx -= w }; // move to top edge
          right = left = false;   
          leftEdge = (idx % w) === 0;          
          rightEdge = ((idx +1) % w) === 0;
          while (p32[idx] === targetColor) {
              p32[idx] = newColor;
              if(!leftEdge) {
                  if (p32[idx - 1] === targetColor) { // check left
                      if (!left) {        
                          stack.push(idx - 1);  // found new column to left
                          left = true;  // 
                      }
                  } else if (left) { left = false }
              }
              if(!rightEdge) {
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

      contextReal.putImageData(imgData,0, 0);
      getsnapshot();
      return;
  }
    floodFill(mouseX, mouseY, newColor) 
  
    // // imageData = contextReal.getImageData(mouseX, mouseY, 1, 1)
    // // function floodFill(x, y, type) {
    // //   // console.log("imageData.data:", imageData);
    // //   // console.log(rgbaColor);
    // //   RtoFill = imageData.data[0];
    // //   GtoFill = imageData.data[1];
    // //   BtoFill = imageData.data[2];
    // //   // console.log("RGBtofill", RtoFill, GtoFill, BtoFill);
    // //   // do not fill if already filled with this color
    // //   if (RtoFill == R && GtoFill == G && BtoFill == B)
    // //     return;

    // //   if (type == 4) {
    // //     //call flood fill with four directions
    // //     // console.log("floodfill start");
    // //     floodFill4(x, y);
    // //   }
    // //   else {
    // //     //call flood fill with eight directions
    // //     floodFill8(x, y);
    // //   }
    // //   // copy the image data back onto the canvas
    // //   // console.log("postimagedata", imageData);
    // //   // console.log("post", imageData.data);
    // // }
    // // floodFill(mouseX, mouseY, type)

    // /* Flood fill algorithm with 4 directions */
    // function floodFill4(x, y) {
    //   // console.log("pre", imageData.data);
    //   // console.log("x&y", x, y);
    //   var newImageData = contextReal.getImageData(x, y, 64, 64)

  
      
    //   for(let i =0; i<instance.data.length;i++ ){
    //     if(array.length<instance.data.length){
    //     if(i<=3){
    //       array.push(colorArray[i])
    //     } else if (i>3){
    //       i -=4;
    //       array.push(colorArray[i])
    //     }
    //   }
    //   }
      
      
    //   if (x < 0 || x >= width || y < 0 || y >= height) {
    //     //outside image
    //     return;
    //   }

    //   if (newImageData.data[0] != RtoFill ||
    //     newImageData.data[1] != GtoFill ||
    //     newImageData.data[2] != BtoFill) {
    //     //not color to fill
    //   // console.log("RGBtofill", RtoFill, GtoFill, BtoFill);
    //     return;
    //   }
    //   //fill with color
     
    //   newImageData.data[0] = R;
    //   newImageData.data[1] = G;
    //   newImageData.data[2] = B;
    //   imageData.data[0] = newImageData.data[0];
    //   imageData.data[1] = newImageData.data[1];
    //   imageData.data[2] = newImageData.data[2];
    //   contextReal.putImageData(imageData, x, y);

    //   //call in four new directions
              
    //   // floodFill4(x, y + 1);
    //   // floodFill4(x, y - 1);
    //   // floodFill4(x - 1, y);
    //   // floodFill4(x + 1, y);
    // }
  }

  onDragging([mouseX, mouseY], e) {
  }
}
$("#fillflood").click(function () {
  console.log("Fillflood button clicked");
  currentFunction = new Fillflood(contextReal, contextDraft);
});

/* Flood fill */


/* Flood fill algorithm with 8 directions */
// function floodFill8(x, y){
//   var newImageData = contextReal.getImageData(x, y, 1, 1)
//   // console.log("newImagedata", newImageData.data);
  
//   if (x < 0 || x >= width || y < 0 || y >= height) {
//     //outside image
//     return;
//   }

//   if (newImageData.data[0] != RtoFill ||
//     newImageData.data[1] != GtoFill ||
//     newImageData.data[2] != BtoFill) {
//     //not color to fill
//   // console.log("RGBtofill", RtoFill, GtoFill, BtoFill);
//     return;
//   }

//   //fill with color
//   newImageData.data[0] = R;
//   newImageData.data[1] = G;
//   newImageData.data[2] = B;
//   imageData.data[0] = newImageData.data[0];
//   imageData.data[1] = newImageData.data[1];
//   imageData.data[2] = newImageData.data[2];

//   contextReal.putImageData(imageData, x, y);

// //call in eight new directions
// floodFill8(x-1, y  );
// floodFill8(x-1, y+1);
// floodFill8(x  , y+1);
// floodFill8(x+1, y+1);
// floodFill8(x+1, y  );
// floodFill8(x+1, y-1);
// floodFill8(x  , y-1);
// floodFill8(x-1, y-1);
// }