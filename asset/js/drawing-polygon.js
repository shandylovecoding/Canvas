//var side;
//var a = ((Math.PI * 2 / side));
var radius;


class DrawingRegpoly extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
  }

  onMouseDown([mouseX, mouseY], event) {
    if (clicks == 0) {
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
      var side = document.getElementById('side').value;
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
      var side = document.getElementById('side').value;
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
      }
    }
  }

}
let polybtn=0;
$("#polyButton").click(function () {
  console.log("Polygon Button clicked");
  if (polybtn == 0) {
    $("#side").css("display", "inline");
    polybtn = 1;
} else if (polybtn == 1) {
    $("#side").css("display", "none");
    polybtn = 0;
}
function getSide(event){
  side = document.getElementById('side').value;
  console.log(side);
}
  currentFunction = new DrawingRegpoly(contextReal, contextDraft);

});