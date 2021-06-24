function getBrightness(event){
    var brightnessvalue = `${$("#brightness").val()}%`;
    console.log(brightnessvalue);
    // let image = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height)
    // contextReal.putImageData(image,0,0)
    contextReal.filter = `brightness(${brightnessvalue})`
  }

$("#brightnessButton").click(function () {   
    let on = 0
    if (on == 0) {
        $("#brightness").css("display", "inline");
        on = 1;
    } else if (on == 1) {
        $("#brightness").css("display", "none");
        on = 0;
    }
});