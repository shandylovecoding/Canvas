var side = lineWidth;
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
      this.contextDraft.lineJoin = "round";
      this.contextReal.lineJoin = "round";
      this.contextReal.strokeStyle = `${colorStroke}`;
      this.contextReal.fillStyle = `${colorFill}`;
      this.contextReal.lineWidth = lineWidth;
      this.contextDraft.strokeStyle = `${colorStroke}`;
      this.contextDraft.fillStyle = `${colorFill}`;
      this.contextDraft.lineWidth = lineWidth;
      this.origX = mouseX;
      this.origY = mouseY;
      clicks = 1;
    } else if (clicks == 1) {
      
      console.log (side);
      var a = ((Math.PI * 2 / side));
      this.contextReal.beginPath();
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      var radius = (this.origX - mouseX);
      this.contextReal.moveTo(this.origX+radius* Math.cos(0),this.origY+radius * Math.sin(0));
      for (var i = 1; i <= side+1; i++) {
        this.contextReal.lineTo(this.origX + radius * Math.cos(a * i), this.origY + radius * Math.sin(a * i));
        this.contextReal.stroke();
      }
      clicks = 0;
      this.contextReal.fill();
      getsnapshot();
      return;
    }

  }

  onMouseMove([mouseX, mouseY], e) {
    if (clicks == 1) {
      this.contextDraft.lineStyle = "#000000";
      this.contextReal.lineStyle = "#000000";
      
      console.log (side);
      var a = ((Math.PI * 2 / side));
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height)
      this.contextDraft.moveTo(this.origX+radius* Math.cos(0),this.origY+radius * Math.sin(0));
      this.contextDraft.beginPath();
      var radius = (this.origX - mouseX);
      for (var i = 1; i <= side+1; i++) {
        this.contextDraft.lineTo(this.origX + radius * Math.cos(a * i), this.origY + radius * Math.sin(a * i));
        this.contextDraft.stroke();
        this.contextDraft.fill();
        console.log("a");
      }
    }
  }

}
$("#polyButton").click(function () {
  console.log("Poly Button clicked");
  currentFunction = new DrawingIrpoly(contextReal, contextDraft);

});