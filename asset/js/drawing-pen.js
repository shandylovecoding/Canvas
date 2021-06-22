class Pen extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        this.context = contextReal;            
    }
    
    onMouseDown([mouseX,mouseY],e){
        this.context.strokeStyle = "#42445A";
        this.context.fillStyle = "#42445A";
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
$("#penButton").click(function () {
    console.log("Line button clicked");
    currentFunction = new Pen(contextReal, contextDraft);
  });
  