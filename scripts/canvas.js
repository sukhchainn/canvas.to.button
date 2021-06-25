const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('button');
var image = document.getElementById('placeholderImg');
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

var x=0, y=0, width=600, height=300, size=5; 
var rgbArray = new Array();

btn.style.border = 'none';
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;

// ctx.beginPath();      // Start a new path
// ctx.moveTo(100, 50);  // Move the pen to x=100, y=50.
// ctx.lineTo(300, 150); // Draw a line to x=300, y=150.
// ctx.stroke();  

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
	// image.style.backgroundImage;

            ctx.drawImage(image,0,0);
}
function canvasToImg() {
  var imageData = ctx.getImageData(0, 0, 600, 300);

  let counter = 0;
  rgbArray.push(new Array());
  for (let i=0; i<imageData.height; i++) {
    for (let j=0; j<imageData.width; j++) {
        rgbArray[i].push(new RGBA(imageData.data[counter++], imageData.data[counter++], imageData.data[counter++], imageData.data[counter++]));
    }
    rgbArray.push(new Array());
  }
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
  imageData = ctx.getImageData(0, 0, 600, 300);
  ctx.putImageData(imageData, 0, 0);
  var url = canvas.toDataURL();

  // var newImg = document.createElement("img"); // create img tag
  btn.style.backgroundImage = "url('"+url+"')";
  // newImg.src = url;
  // document.body.appendChild(newImg); // add to end of your document
}

function draw() {
	imgToCanvas();
	canvasToImg();
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
