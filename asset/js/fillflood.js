var width = contextReal.width
var height = contextReal.height
var R
var G
var B;
var RtoFill, GtoFill, BtoFill;
var type = 4;
var imageData;
// var newImgData
class Fillflood extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
  }

  onMouseDown([mouseX, mouseY], e) {
    imageData = contextReal.getImageData(mouseX, mouseY, 1, 1)
    function floodFill(x, y, type) {
      // console.log("imageData.data:", imageData);
      // console.log(rgbaColor);
      RtoFill = imageData.data[0];
      GtoFill = imageData.data[1];
      BtoFill = imageData.data[2];
      // console.log("RGBtofill", RtoFill, GtoFill, BtoFill);
      // do not fill if already filled with this color
      if (RtoFill == R && GtoFill == G && BtoFill == B)
        return;

      if (type == 4) {
        //call flood fill with four directions
        // console.log("floodfill start");
        floodFill4(x, y);
      }
      else {
        //call flood fill with eight directions
        floodFill8(x, y);
      }
      // copy the image data back onto the canvas
      // console.log("postimagedata", imageData);
      // console.log("post", imageData.data);
    }
    floodFill(mouseX, mouseY, type)

    /* Flood fill algorithm with 4 directions */
    function floodFill4(x, y) {
      // console.log("pre", imageData.data);
      // console.log("x&y", x, y);
      var newImageData = contextReal.getImageData(x, y, 1, 1)
      // console.log("newImagedata", newImageData.data);
      
      if (x < 0 || x >= width || y < 0 || y >= height) {
        //outside image
        console.log("exit 1");
        return;
      }

      if (newImageData.data[0] != RtoFill ||
        newImageData.data[1] != GtoFill ||
        newImageData.data[2] != BtoFill) {
        //not color to fill
      // console.log("RGBtofill", RtoFill, GtoFill, BtoFill);
        return;
      }

      //fill with color
      newImageData.data[0] = R;
      newImageData.data[1] = G;
      newImageData.data[2] = B;
      imageData.data[0] = newImageData.data[0];
      imageData.data[1] = newImageData.data[1];
      imageData.data[2] = newImageData.data[2];

      //call in four new directions
                
      contextReal.putImageData(imageData, x, y);
      floodFill4(x, y + 1);
      floodFill4(x, y - 1);
      floodFill4(x - 1, y);
      floodFill4(x + 1, y);
    }
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
// function floodFill8(x, y)
// {
// if (x<0 || x>=width || y<0 || y>=height)
// {
// //outside image
// return;
// }

// if (imageData.data[0] != RtoFill ||
// imageData.data[1] != GtoFill ||
// imageData.data[2] != BtoFill)
// {
// //not color to fill
// return;
// }

// //fill with color
// imageData.data[0] = R;
// imageData.data[1] = G;
// imageData.data[2] = B;

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