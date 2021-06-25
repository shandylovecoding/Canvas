
$("#saveButton").click(function (){
    var canvas = document.getElementById('canvas-real');
    link = document.createElement('a');
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

// Load button
let loadbtn = 0
$("#loadButton").click(function () {
    if (loadbtn == 0) {
        $("#load").css("display", "inline");
        loadbtn = 1;
    } else if (loadbtn == 1) {
        $("#load").css("display", "none");
        loadbtn = 0;
    }
});
