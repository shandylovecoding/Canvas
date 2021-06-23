
class Eyedropper extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextReal = contextReal;
    }

    onMouseDown([mouseX, mouseY], e) {
        pixel(e)
    }

    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
};
function pixel(e) {
    // calculate the x and y coordinates of the cursor
    var imagesdata = contextReal.getImageData(mouseX, mouseY, 1, 1);
    var new_color = [imagesdata.data[0], imagesdata.data[1], imagesdata.data[2]];
    console.log("rgb(" + new_color.join() + ")");
    colorLabel.style.backgroundColor = "rgb(" + new_color.join() + ")";
  }


$("#eyedropper").click(function () {
    console.log("eyedropper Button clicked");
    currentFunction = new Eyedropper(contextReal, contextDraft);
});


