let hasInput = false;

class DrawingText extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextReal = contextReal;
    }

    onMouseDown([mouseX, mouseY], e) {
        inputText(e)
    }

};

function inputText(e) {
    addInput(e.clientX, e.clientY);
    //function to show input box
    function addInput(x, y) {

        if (hasInput == false) {
            var input = document.createElement('input');
            input.type = 'text';
            input.style.position = 'fixed';
            input.style.left = `${x}px`;
            input.style.top = `${y}px`;
            input.style.width = "300px";
            input.style.zIndex = 999999;
            input.style.background = "transparent";
            input.style.outline = "none";
            input.style.border = "none";
            input.placeholder = "Text";
            input.onkeydown = handleInput;
            document.body.appendChild(input);
            hasInput = true;
        }
    }

    //function to handle input box
    function handleInput(e) {
        var keyCode = e.keyCode;
        if (keyCode === 13) {
            drawText(this.value);
            document.body.removeChild(this);
            hasInput = false;
        } else if (keyCode === 27) {
            document.body.removeChild(this);
            hasInput = false;
        }
    }

    //function to draw text
    function drawText(text, x, y) {
        contextReal.textBaseline = 'top';
        contextReal.textAlign = 'left';
        contextReal.font = `${lineWidth}px ${textfont}`;
        contextReal.fillText(text, e.offsetX, e.offsetY);
        getsnapshot();
    };

}

$("#textButton").click(function () {
    currentFunction = new DrawingText(contextReal, contextDraft);
});