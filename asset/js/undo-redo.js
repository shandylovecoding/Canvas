// const timeline = [];
// let step = -1;


// $("#canvas-real").click(function (){
//     if (clicks == 0) {
//         console.log("working push");
//         step++;
//         if (step < timeline.length) {
//             timeline.length = step;
//         };
//         timeline.push(canvasReal.toDataURL("image/png").replace("image/png", "image/octet-stream"));
//         console.log(timeline)
//     }
// })

// $("#undoButton").click(function undo() {
//     console.log("working");
//     console.log(timeline);
//     console.log(`step`, step);
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
//     console.log("working 2");
//     if (step < timeline.length - 1) {
//         step++;
//         let images = new Image();
//         images.src = timeline[step];
//         images.onload = function () {
//             contextReal.drawImage(images, 0, 0)
//         }
//     }
// })

let ourCanvas = $('#canvas-real');
let undoDataStack = [];
let redoDataStack = [];


function beforeDraw() {
    var lastMove = ourCanvas[0].toDataURL();
    undoDataStack.push(lastMove);
    redoDataStack = [];
}

$('#undoButton').on("click", function undo () {
console.log("clicked");
    if (undoDataStack.length == 0) {
        return;
    }else if (undoDataStack.length == 1) {
        contextReal.fillStyle = "#ffffff";
        contextReal.fillRect(0,0,canvasDraft.width,canvasDraft.height);
    } else if (undoDataStack.length > 1) {
        var lastStep = new Image();
        lastStep.src = undoDataStack[undoDataStack.length - 2];
        lastStep.onload = function (){
        contextReal.drawImage(lastStep, 0, 0);
    };
    }
    redoDataStack.push(undoDataStack.pop());
})

$('#redoButton').click(function redo () {
    if (redoDataStack.length > 0) {
        var nextStep = new Image();
        nextStep.src = redoDataStack[redoDataStack.length - 1];
        nextStep.onload = function () {
            contextReal.drawImage(nextStep, 0, 0);
        };
        undoDataStack.push(redoDataStack.pop());
    }
})