var side = 5;
var a = ((Math.PI * 2 / side));
var radius;

class DrawingIrpoly extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
  }

  onMouseDown([mouseX, mouseY], event) {
    if (clicks == 0) {
      this.contextDraft.lineStyle = "#000000";
      this.contextReal.lineStyle = "#000000";
      this.origX = mouseX;
      this.origY = mouseY;
      clicks = 1;
    } else if (clicks == 1) {
      var radius = (this.origX - mouseX);
      console.log(this.origX);
      console.log(mouseX);
      console.log(radius);
      this.contextReal.moveTo(this.origX+radius* Math.cos(0),this.origY+radius * Math.sin(0));
      for (var i = 1; i <= side; i++) {
        this.contextReal.lineTo(this.origX + radius * Math.cos(a * i), this.origY + radius * Math.sin(a * i));
        this.contextReal.stroke();
      }
      clicks = 0;
    }

  }

  onMouseMove([mouseX, mouseY], e) {
    if (clicks == 1) {
      this.contextDraft.lineStyle = "#000000";
      this.contextReal.lineStyle = "#000000";
      this.contextDraft.beginPath();
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height)
      this.contextDraft.moveTo(this.origX,this.origY);
      for (var i = 1; i <= side; i++) {
        this.contextDraft.lineTo(this.origX + radius * Math.cos(a * i), this.origY + radius * Math.sin(a * i));
        this.contextDraft.stroke();
        console.log("a");
      }
    }
  }

}
$("#polyButton").click(function () {
  console.log("Poly Button clicked");
  currentFunction = new DrawingIrpoly(contextReal, contextDraft);

});