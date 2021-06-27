$(function () {

    $("body").css("opacity", "1");

    $("#canvas-draft").mousedown(function () {
        $("h1").css("opacity", "0");
    })

    // Menus
    let fileFunction = 0;
    $("#fileButton").click(function () {
        if (fileFunction == 0) {
            $("#filefunctions").css("display", "inline");
            $("#fileButton").css("opacity", "0.2");
            $("#fileButton").html("<em>#File</em>");
            fileFunction = 1;
        } else if (fileFunction == 1) {
            $("#filefunctions").css("display", "none");
            $("#fileButton").css("opacity", "1");
            $("#fileButton").html("#File");
            fileFunction = 0;
        }
    })

    let drawFunction = 0;
    $("#drawButton").click(function () {
        if (drawFunction == 0) {
            $("#drawfunctions").css("display", "inline");
            $("#drawButton").css("opacity", "0.2");
            $("#drawButton").html("<em>#Draw</em>");
            drawFunction = 1;
        } else if (drawFunction == 1) {
            $("#drawfunctions").css("display", "none");
            $("#drawButton").css("opacity", "1");
            $("#drawButton").html("#Draw");
            drawFunction = 0;
        }
    })

    let editFunction = 0;
    $("#editButton").click(function () {
        if (editFunction == 0) {
            $("#editfunctions").css("display", "inline");
            $("#editButton").css("opacity", "0.2");
            $("#editButton").html("<em>#Edit</em>");
            editFunction = 1;
        } else if (editFunction == 1) {
            $("#editfunctions").css("display", "none");
            $("#editButton").css("opacity", "1");
            $("#editButton").html("#Edit");
            editFunction = 0;
        }
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
        if (e.which === 78) {
            currentFunction = new DrawingRegpoly(contextReal, contextDraft);
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
            currentFunction = new DrawingBezierLine(contextReal, contextDraft);
        }
        // Text
        if (e.which === 84) {
            currentFunction = new DrawingText(contextReal, contextDraft);
        }
        // Pen
        if (e.which === 80) {
            currentFunction = new Pen(contextReal, contextDraft);
        }
        // Eraser
        if (e.which === 69) {
            currentFunction = new Eraser(contextReal, contextDraft);
        }
        // Select
        if (e.which === 83) {
            currentFunction = new Select(contextReal, contextDraft);
        }
        // Eyedropper
        if (e.which === 73) {
            currentFunction = new Eyedropper(contextReal, contextDraft);
        }
        // Fillflood
        if (e.which === 75) {
            currentFunction = new Fillflood(contextReal, contextDraft);
        }
        // Clear
        if (e.shiftKey && e.which === 8) {
            console.log("Clear Button clicked");
            contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        }
    })

});