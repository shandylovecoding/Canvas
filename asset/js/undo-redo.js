var restore_array = [];
var step = -1;

function getsnapshot () {
    restore_array.push(contextReal.getImageData(0,0,canvasReal.width,canvasReal.height));
    step += 1;
}

function clear_canvas () {
    restore_array = [];
    step = -1;
    contextDraft.clearRect(0, 0, canvasReal.width, canvasReal.height)
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height)
}

$("#undoButton").click(function () {   
    if (step <=0 ) {
clear_canvas();
        } else {
            step -= 1;
            restore_array.pop();
            contextReal.putImageData(restore_array[step], 0, 0);
        }
});