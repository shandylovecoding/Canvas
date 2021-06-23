
var R
var G
var B;
var width = canvasReal.width
var height = canvasReal.height

class Fillflood extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown([mouseX, mouseY], e) {
    var colorLayer = contextReal.getImageData(mouseX, mouseY, width, height)
    // console.log("pre",imageData.data);
    // function floodFill(startX, startY){
       var pixelStack = [[mouseX, mouseY]];
    
        while(pixelStack.length)
        {

          var newPos, x, y, pixelPos, reachLeft, reachRight;
          newPos = pixelStack.pop();
          x = newPos[0];
          y = newPos[1];
          console.log("x,y",x,y);
          pixelPos = (y*width + x) * 4;
          while(y-- >= 0 && matchStartColor(pixelPos))
          {
            pixelPos -= width * 4;
          }
          pixelPos += width * 4;
          ++y;
          reachLeft = false;
          reachRight = false;
          while(y++ < height-1 && matchStartColor(pixelPos))
          {
            colorPixel(pixelPos);
        
            if(x > 0)
            {
              if(matchStartColor(pixelPos - 4))
              {
                if(!reachLeft){
                  pixelStack.push([x - 1, y]);
                  reachLeft = true;
                }
              }
              else if(reachLeft)
              {
                reachLeft = false;
              }
            }
            
            if(x < width-1)
            {
              if(matchStartColor(pixelPos + 4))
              {
                if(!reachRight)
                {
                  pixelStack.push([x + 1, y]);
                  reachRight = true;
                }
              }
              else if(reachRight)
              {
                reachRight = false;
              }
            }
                    
            pixelPos += width * 4;
          }
        }

          
        function matchStartColor(pixelPos)
        {
          var r = colorLayer.data[pixelPos];	
          var g = colorLayer.data[pixelPos+1];	
          var b = colorLayer.data[pixelPos+2];
        
          return (r == colorLayer.data[0] && g == colorLayer.data[1] && b == colorLayer.data[2]);
        }
        
        function colorPixel(pixelPos)
        {
          colorLayer.data[pixelPos] = R;
          colorLayer.data[pixelPos+1] = G;
          colorLayer.data[pixelPos+2] = B;
          colorLayer.data[pixelPos+3] = 255;
        }
        console.log("pre",colorLayer.data);
        this.contextReal.putImageData(colorLayer, 0, 0);
        console.log("pos",colorLayer.data);


    // }
    // floodFill(mouseX, mouseY, colorLayer)

    }

    onDragging([mouseX, mouseY], e) {
       

    }

    onMouseMove([mouseX, mouseY], e) {
        
    }
    onMouseUp([mouseX, mouseY], e) {
        
    }
    onMouseLeave() {}
    onMouseEnter() {}
}

$("#fillflood").click(function () {
    console.log("Fillflood button clicked");
    currentFunction = new Fillflood(contextReal, contextDraft);
});





// var RtoFill, GtoFill, BtoFill;
// var type = 4;
// var imageData 
// /* Flood fill */
// function floodFill(x, y, type){
// console.log(imageData);
// console.log(rgbaColor);

// RtoFill = imageData.data[0];
// GtoFill = imageData.data[1];
// BtoFill = imageData.data[2];

// // do not fill if already filled with this color
// if (RtoFill == R && GtoFill == G && BtoFill == B)
// return;
 
// if (type == 4)
// {
// //call flood fill with four directions
// floodFill4(x, y);
// }
// else
// {
// //call flood fill with eight directions
// floodFill8(x, y);
// }
 
// // copy the image data back onto the canvas
// console.log("post",imageData.data);
// contextReal.putImageData(imageData, 0, 0);
// }
 
// /* Flood fill algorithm with 4 directions */
// function floodFill4(x, y){
//     console.log("x&y",x,y);
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

 
// //call in four new directions
// floodFill4(x-1, y  );
// floodFill4(x+1, y  );
// floodFill4(x  , y-1);  
// floodFill4(x  , y+1);
// console.log("imgdatachanged",imageData.data[0],imageData.data[1],imageData.data[2]);
// console.log("towhichcolor",RtoFill,GtoFill,BtoFill);
// }
 
// /* Flood fill algorithm with 8 directions */
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