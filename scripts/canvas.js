var canvas = document.createElement('canvas');
canvas.id = "CursorLayer";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";

const ctx = canvas.getContext('2d');
const btn = document.getElementById('button');
var image = document.createElement('img');
var imageData;

var x=0, y=0, width=600, height=300, size=5; 
var rgbArray = new Array();

btn.style.border = 'none';
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;

// while (y < height) {
// 	// ctx.fillStyle = 'blue';
// 	ctx.fillRect(x, y, size, size); // (x, y, width, height);
// 		if (x%2 != 0) {
// 			ctx.fillStyle = 'black';
// 		} else 
// 			ctx.fillStyle = 'white';
// 	if (x > width) {
// 		x=0;
// 		y+=size;
// 		// pixels.push(new Array());
// 		// pixelRow++;
// 	} else {
// 		x+=size;
// 	}
// }


function imgToCanvas() {
  image.src = btn.style.backgroundImage.replace("url(\"", "").replace("\")", "");
  ctx.drawImage(image,0,0);
}
function canvasToRgb() {
  imageData = ctx.getImageData(0, 0, 600, 300);

  let counter = 0;
  rgbArray.push(new Array());
  for (let i=0; i<imageData.height; i++) {
    for (let j=0; j<imageData.width; j++) {
        rgbArray[i].push(new RGBA(imageData.data[counter++], imageData.data[counter++], imageData.data[counter++], imageData.data[counter++]));
    }
    rgbArray.push(new Array());
  }
}
function matchRgbToBoundary() {

}
function rgbToCanvasScaled() {
  x=0; y=0;
  for (let i=0; i<imageData.height; i++) {
    for (let j=0; j<imageData.width; j++) {
        ctx.fillStyle = rgbArray[i][j].getRGBA();
        ctx.fillRect(x, y, size, size); // (x, y, width, height);
        
        x+=size;
    }
    x=0;
    y+=size;
  }
}
function canvasToImg() {
  imageData = ctx.getImageData(0, 0, 600, 300);
  ctx.putImageData(imageData, 0, 0);
  var url = canvas.toDataURL();

  // var newImg = document.createElement("img"); // create img tag
  btn.style.backgroundImage = "url('"+url+"')";
  // newImg.src = url;
  // document.body.appendChild(newImg); // add to end of your document
}

function draw(s) {
  size = s;
	imgToCanvas();
  canvasToRgb();

  rgbToCanvasScaled();
	canvasToImg();
}
