
$("#saveButton").click(function () {
    var canvas = document.getElementById('canvas-real');
    link = document.createElement('a');
    console.log(canvas);
    console.log(link);
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    console.log(canvas.toDataURL());
    link.click();
    link.delete;
  });

function loadAndDrawImage(url)
{
    var image = new Image();
    image.onload = function()
    {
      contextReal.drawImage(image, 0, 0);
    }
    image.src = url;
}
var load = document.getElementById('load');
load.addEventListener('change', getFile, false);

function getFile(event)
{
    var files = event.target.files;
    if(files.length === 0)
    {
        return;
    }
    var file = files[0];
    if(file.type !== '' && !file.type.match('image.*'))
    {
        return;
    }
    window.URL = window.URL || window.webkitURL;
    var imageURL = window.URL.createObjectURL(file);
    loadAndDrawImage(imageURL);
}
