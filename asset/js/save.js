
$("#saveButton").click(function () {
    var canvas = document.getElementById('canvas-real');
    link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  });