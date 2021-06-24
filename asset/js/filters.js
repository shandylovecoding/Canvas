// brightness filter
let brightbtn = 0
$("#brightnessButton").click(function () {
    if (brightbtn == 0) {
        $("#brightness").css("display", "inline");
        brightbtn = 1;
    } else if (brightbtn == 1) {
        $("#brightness").css("display", "none");
        brightbtn = 0;
    }
});

function getBrightness(event) {
    var brightnessvalue = $("#brightness").val();
    contextReal.canvas.style.filter = `brightness(${brightnessvalue}%)`
}

// contrast filter
let contrastbtn = 0
$("#contrastButton").click(function () {
    if (contrastbtn == 0) {
        $("#contrast").css("display", "inline");
        contrastbtn = 1;
    } else if (contrastbtn == 1) {
        $("#contrast").css("display", "none");
        contrastbtn = 0;
    }
});

function getContrast(event) {
    var contrastvalue = $("#contrast").val();
    contextReal.canvas.style.filter = `contrast(${contrastvalue}%)`
}

// saturation filter
let saturatebtn = 0
$("#saturateButton").click(function () {
    if (saturatebtn == 0) {
        $("#saturate").css("display", "inline");
        saturatebtn = 1;
    } else if (saturatebtn == 1) {
        $("#saturate").css("display", "none");
        saturatebtn = 0;
    }
});

function getSaturation(event) {
    var saturatevalue = $("#saturate").val();
    contextReal.canvas.style.filter = `saturate(${saturatevalue}%)`
}