var canvas = document.createElement('canvas');
canvas.id = "CursorLayer";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";

const ctx = canvas.getContext('2d');
const btn = document.getElementById('_button');
var image = document.createElement('img');
var imageData;

var x=0, y=0, rows=0, columns=0, size=5; 
var rgbArray = new Array(); 

// btn.style.border = 'none';
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;


function imgToCanvas() {
  let style = btn.currentStyle || window.getComputedStyle(btn, false);
  image.src = style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];

  ctx.drawImage(image,0,0);
}

function canvasToRgb() {
  imageData = ctx.getImageData(0, 0, image.width, image.height);
  let counter = 0;
  for (let i=0; i<imageData.height; i++) {
    rgbArray.push(new Array());
    for (let j=0; j<imageData.width; j++) {
      let r = imageData.data[counter++];
      let g = imageData.data[counter++];
      let b = imageData.data[counter++];
      let a = imageData.data[counter++];

      if (r == 255 &&
          g == 255 &&
          b == 255 &&
          a == 255) {
        rgbArray[i].push(new RGBA(r, g, b, 0));
      } else {
        rgbArray[i].push(new RGBA(r, g, b, a));
      }
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
    let excess = rgbArray[0].length - columns;
    let from = rgbArray[0].length/2 - excess;

    for (let i=0; i<rgbArray.length; i++) {
      rgbArray[i].splice(from, excess);
    }
  }
}

function matchRgbToBoundary() {
  x=0; y=0;
  // count rows and colums of btn.
  columns--;
  while (y < btn.offsetHeight) {
    if (x > btn.offsetWidth) {
      x=0;
      y+=size;
      rows++;
    } else {
      x+=size;
      if (y==0) {
        columns++;
      }
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

function clearCanvas() {
  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  ctx.restore();
}

function canvasToImg() {
  // imageData = ctx.getImageData(0, 0, image.width, image.height);
  var url = canvas.toDataURL();

  // var newImg = document.createElement("img"); // create img tag
  btn.style.backgroundImage = "url('"+url+"')";
  // newImg.src = url;
  // document.body.appendChild(newImg); // add to end of your document
}


function draw(s) {
  size = s;

  // put the background image into the canvas
	imgToCanvas();
  btn.style.background = 'transparent';
  // convert the individual r, g, b, a values to RGB objects
  canvasToRgb();
  // stretch the image to the element's size
  matchRgbToBoundary();
  // clear the previous small image at the top left corner
  clearCanvas();
  // scale the individual pixels to the size and put them to canvas
  rgbToCanvasScaled();
  // put the scaled image to the element's background
	canvasToImg();
}
