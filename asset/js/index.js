$(function () {

    $("body").css("opacity", "1");

    $("#canvas-real").mousedown(function () {
        $("h1").css("opacity", "0");
    })

    // Keyboard Shortcuts
    $(document).keydown(function (e) {
        // Rectangle
        if (e.which === 82) {
            currentFunction = new DrawingRectangle(contextReal, contextDraft);
        }
        // Circle
        if (e.which === 67) {
            currentFunction = new DrawingCircle(contextReal, contextDraft);
        }
        // Polygon
        if (e.shiftKey && e.which === 80) {
            currentFunction = new DrawingIrpoly(contextReal, contextDraft);
        }
        // Line
        if (e.which === 220) {
            currentFunction = new DrawingLine(contextReal, contextDraft);
        }
        // Polyline
        if (e.shiftKey && e.which === 220) {
            currentFunction = new DrawingPolyline(contextReal, contextDraft);
        }
        // Quadratic
        if (e.which === 81) {
            currentFunction = new DrawingQuadraticLine(contextReal, contextDraft);
        }
        // Bezier
        if (e.which === 66) {
            currentFunction = new DrawingQuadraticLine(contextReal, contextDraft);
        }
        // Text
        if (e.which === 84) {
            currentFunction = new DrawingText(contextReal, contextDraft);
        }
        // Pen
        if (e.which === 69) {
            currentFunction = new Pen(contextReal, contextDraft);
        }
        // Eraser
        if (e.which === 80) {
            currentFunction = new Eraser(contextReal, contextDraft);
        }
        // Marquee
        if (e.which === 77) {}
        // Eyedropper
        if (e.which === 73) {
            currentFunction = new Eyedropper(contextReal, contextDraft);
        }
        // Fillflood
        if (e.which === 75) {
            currentFunction = new Fillflood(contextReal, contextDraft);
        }
        // Brightness
        if (e.shiftKey && e.which === 66) {
            console.log("working");
            brightness();
        }
        // Contrast
        if (e.shiftKey && e.which === 67) {
            contrast();
        }
        // Saturate
        if (e.shiftKey && e.which === 83) {
            saturate();
        }
        // Noise
        if (e.shiftKey && e.which === 78) {

        }
        // Undo
        if (e.ctrlKey && e.which === 84) {
            undo();
        }
        // Redo
        if (e.ctrlKey && e.shiftKey && e.which === 84) {
            redo();
        }
        // Clear
        if (e.shiftKey && e.which === 8) {
            clear();
        }
        // Save
        if (e.ctrlKey && e.shiftKey && e.which === 83) {
            save();
        }
    })

});