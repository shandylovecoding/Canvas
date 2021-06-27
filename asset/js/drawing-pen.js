// class DrawingPen extends PaintFunction{
//     constructor(contextReal, contextDraft){
//         super();
//         this.contextReal = contextReal;
//         this.contextDraft = contextDraft;  
//         this.origX = mouseX;
//         this.origY = mouseY;          
//     }
    
//     onMouseDown([mouseX,mouseY],e){
//         this.contextDraft.fillStyle = `${colorFill}`;
//         this.contextDraft.lineWidth = lineWidth;
//         this.contextDraft.beginPath();
//         this.draw(mouseX,mouseY);
//     }
//     onDragging([mouseX,mouseY],e){
//         this.draw(mouseX,mouseY);
//         addPen(this.origX, this.origY, mouseX, mouseY, `${colorFill}`, lineWidth)
//     }

//     onMouseMove(){}
//     onMouseUp(){
//         this.contextDraft.stroke();    
//         getsnapshot();
//     }
//     onMouseLeave(){}
//     onMouseEnter(){}

//     draw(x,y){
//         this.contextDraft.lineTo(x,y);
//         this.contextDraft.moveTo(x,y);
//         this.contextDraft.closePath();
//         this.contextDraft.stroke();    
//     }
// }

// $("#penButton").click(function () {
//     console.log("Pen button clicked");
//     currentFunction = new DrawingPen(contextReal, contextDraft);
//   });
  

  class DrawingPen extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        this.context = contextReal;            
    }
    
    onMouseDown([mouseX,mouseY],e){
        this.context.strokeStyle = `${colorStroke}`;
        this.context.fillStyle = `${colorFill}`;
        this.context.lineWidth = lineWidth;
        this.context.beginPath();
        this.context.moveTo(mouseX,mouseY);
        this.draw(mouseX,mouseY);
    }
    onDragging([mouseX,mouseY],e){
        this.draw(mouseX,mouseY);
    }

    onMouseMove(){}
    onMouseUp(){
        getsnapshot();
    }
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }
}
$("#penButton").click(function () {
    console.log("Pen button clicked");
    currentFunction = new Pen(contextReal, contextDraft);
  });
  