
class Eyedropper extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextReal = contextReal;
    }

    onMouseDown([mouseX, mouseY], e) {
        pixel(e)
    }

};
function pixel(e) {
    // calculate the x and y coordinates of the cursor
    var imagesdata = contextReal.getImageData(mouseX, mouseY, 1, 1);
    newImgData = imageData
    var new_color = [imagesdata.data[0], imagesdata.data[1], imagesdata.data[2]];
    colorLabel.style.backgroundColor = "rgb(" + new_color.join() + ")";
    rgbaColor = "rgb(" + new_color.join() + ")"
    colorFill = rgbaColor
}


$("#eyedropper").click(function () {
    currentFunction = new Eyedropper(contextReal, contextDraft);
});


