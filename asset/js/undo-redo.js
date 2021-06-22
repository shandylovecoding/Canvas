const timeline = [];
let step = -1;

        step++;
        if (step < timeline.length) {
            timeline.length = step;
        };
        timeline.push(canvasReal.toDataURL("image/png").replace("image/png", "image/octet-stream"))

$("#undoButton").click(function undo() {
    if (step > 0) {
        console.log("workinginside");
        step--;
        let images = new Image(canvasReal.width, canvasReal.height);
        images.src = `${timeline[step]}`;
        images.onload = function () {
            contextReal.drawImage(images, 0, 0);
            console.log("drawing")
        }
    }
})

$("#redoButton").click(function redo() {
    if (step < timeline.length - 1) {
        step++;
        let images = new Image();
        images.src = timeline[step];
        images.onload = function () {
            contextReal.drawImage(images, 0, 0)
        }
    }
})