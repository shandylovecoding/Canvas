$("#clearButton").click(function () {
    console.log("Clear Button clicked");
    contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
});