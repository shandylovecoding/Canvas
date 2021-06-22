class Eraser extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        this.context = contextReal;            
    }
    
    onMouseDown([mouseX,mouseY],e){
        this.context.strokeStyle = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";
        this.context.lineWidth = 5;
        this.context.beginPath();
        this.context.moveTo(mouseX,mouseY);
        this.draw(mouseX,mouseY);
    }
    onDragging([mouseX,mouseY],e){
        this.draw(mouseX,mouseY);
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }
}
$("#eraserButton").click(function () {
    console.log("Eraser button clicked");
    currentFunction = new Eraser(contextReal, contextDraft);
  });
  