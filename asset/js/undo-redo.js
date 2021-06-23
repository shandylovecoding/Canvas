var restore_array = [];
var step = -1;
var redo_array = []
var redo_step = 0;

function getsnapshot() {
    restore_array.push(contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height));
    step += 1;
    redo_array = [];
}

$("#undoButton").click(function () {
    console.log("undo index", step);
    if (step >= 0) {
        step -= 1;
        redo_step += 1;
        redo_array.push(restore_array.pop());
        if (step < 0) {
            restore_array = [];
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
        } else {
            contextReal.putImageData(restore_array[step], 0, 0);
 
        }
    }
});

$("#redoButton").click(function () {
    redo_step -= 1;
    step += 1;
    if (redo_step < 0) {
        redo_array = [];
    } else {
        contextReal.putImageData(redo_array[redo_step], 0, 0);
        restore_array.push(redo_array.pop());
    }
});

$(document).click(function () {
    if (redo_array.length <= 0) {
        $("#redoButton").addClass("disabled")
    } else {
        console.log("working");
        $("#redoButton").removeClass("disabled")
    }
})

$(document).click(function () {
    if (restore_array.length <= 0) {
        $("#undoButton").addClass("disabled")
    } else {
        console.log("working");
        $("#undoButton").removeClass("disabled")
    }
})