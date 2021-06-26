var canvas = document.createElement('canvas');
canvas.id = "CursorLayer";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";

const ctx = canvas.getContext('2d');
const btn = document.getElementById('button');
var image = document.createElement('img');
var imageData;

var x=0, y=0, width=600, height=300, rows=0, columns=0, size=5; 
var rgbArray = new Array();

// btn.style.border = 'none';
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;


function imgToCanvas() {
  image.src = btn.style.backgroundImage.replace("url(\"", "").replace("\")", "");
  ctx.drawImage(image,0,0);
}
function canvasToRgb() {
  imageData = ctx.getImageData(0, 0, image.width, image.height);
  console.log(imageData);
  let counter = 0;
  for (let i=0; i<imageData.height; i++) {
    rgbArray.push(new Array());
    for (let j=0; j<imageData.width; j++) {
        rgbArray[i].push(new RGBA(imageData.data[counter++], imageData.data[counter++], imageData.data[counter++], imageData.data[counter++]));
    }
  }
}
function stretchToHeight() {
  if (rows > rgbArray.length) {
    // if rows are more than rgbArray.length then add the number of deficient rows to rgbArray
    let deficiency = rows - rgbArray.length;
    let from = rgbArray.length/2;
    
    for (let i=0; i<deficiency; i++) {
      rgbArray.splice(from, 0, [...rgbArray[from]]);
    }
  } else {
    // if rows are less than rgbArray.length then subtract the number of excess rows from rgbArray
    let excess = rgbArray.length - rows;
    let from = rgbArray.length/2 - excess;

    rgbArray.splice(from, excess);
  }
}
function stretchToWidth() {
  if (columns > rgbArray[0].length) {
    // if rows are more than rgbArray.length then add the number of deficient rows to rgbArray
    let deficiency = columns - rgbArray[0].length;
    let from = rgbArray[0].length/2;
    console.log(deficiency);
    
    for (let i=0; i<rgbArray.length; i++) {
      for (let j=0; j<deficiency; j++) {
        rgbArray[i].splice(from, 0, rgbArray[i][from]);
      }
    }
    console.log(rgbArray.length, rgbArray[0].length, rows, columns);
  } else {

    // if rows are less than rgbArray.length then subtract the number of excess rows from rgbArray
    // let excess = rgbArray[0].length - rows;
    // let from = rgbArray[0].length/2 - excess;

    // rgbArray.splice(from, excess);
  }
}

function matchRgbToBoundary() {
  x=0; y=0;
  // count rows and colums of btn.
  while (y < btn.offsetHeight) {
    if (y==0) {
	    columns++;
    }
    if (x > btn.offsetWidth) {
      x=0;
      y+=size;
      rows++;
    } else {
      x+=size;
    }
  }

  console.log(rows, columns, rgbArray[0].length, rgbArray.length);

  stretchToHeight();
  stretchToWidth();
}
function rgbToCanvasScaled() {
  x=0; y=0;
  for (let i=0; i<rows; i++) {
    for (let j=0; j<columns; j++) {
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
  matchRgbToBoundary();
  rgbToCanvasScaled();
	canvasToImg();
}
