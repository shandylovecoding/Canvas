// const timeline = [];
// let step = -1;

//         step++;
//         if (step < timeline.length) {
//             timeline.length = step;
//         };
//         timeline.push(canvasReal.toDataURL("image/png").replace("image/png", "image/octet-stream"))

// $("#undoButton").click(function undo() {
//     if (step > 0) {
//         console.log("workinginside");
//         step--;
//         let images = new Image(canvasReal.width, canvasReal.height);
//         images.src = `${timeline[step]}`;
//         images.onload = function () {
//             contextReal.drawImage(images, 0, 0);
//             console.log("drawing")
//         }
//     }
// })

// $("#redoButton").click(function redo() {
//     if (step < timeline.length - 1) {
//         step++;
//         let images = new Image();
//         images.src = timeline[step];
//         images.onload = function () {
//             contextReal.drawImage(images, 0, 0)
//         }
//     }
// })

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