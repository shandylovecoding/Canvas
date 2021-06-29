$("#clearButton").click(function clear() {
    contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    boxes = [];
});