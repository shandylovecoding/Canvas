$("#saveButton").click(function () {  
    var link = document.createElement('a');
    link.download = 'Canvas.png';
    link.href = canvasReal.toDataURL()
    link.click();
    link.delete;
});