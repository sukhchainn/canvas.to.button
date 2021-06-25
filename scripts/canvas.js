const canvas = document.getElementById('canvas');
const btn = document.getElementById('button');
const ctx = canvas.getContext('2d');
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

var x=0, y=0, width=600, height=300, size=5; 

btn.style.border = 'none';
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;

// ctx.beginPath();      // Start a new path
// ctx.moveTo(100, 50);  // Move the pen to x=100, y=50.
// ctx.lineTo(300, 150); // Draw a line to x=300, y=150.
// ctx.stroke();  

ctx.drawImage("pully.png", 0, 0);
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

function canvasToImg() {
      var url = canvas.toDataURL();

      var newImg = document.createElement("img"); // create img tag
      btn.style.backgroundImage = "url('"+url+"')";
      // newImg.src = url;
      // document.body.appendChild(newImg); // add to end of your document
    }
function draw() {
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