var colorBlock = document.getElementById('color-block');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById('color-strip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var colorLabel = document.getElementById('color-label');
var fillcolorLabel = document.getElementById('fillcolor-label');
var colorcolor;
var fillcolor
var colorStroke = 'rgba(0,0,0,1)'
var colorFill = 'rgba(211,211,211,1)'
var x = 0;
var y = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);


  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}
function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}
function mouseup(e) {
  drag = false;
}
function changeColor(e, label) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  R = imageData[0]
  G = imageData[1]
  B = imageData[2]


  if (colorcolor) {
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    colorFill = `${rgbaColor}`
    colorLabel.style.backgroundColor = colorFill
    var l = boxes.length;
    for (var i = 0; i < l; i++) {
      if (boxes[i] == mySel) {
        boxes[i].fill = colorFill;
      }
    }
  } else if (fillcolor) {
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    colorStroke = `${rgbaColor}`
    fillcolorLabel.style.backgroundColor = colorStroke
    var l = boxes.length;
    for (var i = 0; i < l; i++) {
      if (boxes[i] == mySel) {
        boxes[i].stroke = colorStroke
      }
    }

  }

}
var colorControl = document.getElementById('color-input')
var fillcolorControl = document.getElementById('fillcolor-input')


$("#color-label").click(function () {
  colorcolor = true;
  fillcolor = false;
});
$("#fillcolor-label").click(function () {
  colorcolor = false;
  fillcolor = true;
});
$('#canvas-real').click(function () {
  colorControl.checked = false
  fillcolorControl.checked = false
})
colorStrip.addEventListener("click", click, false);
colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);

