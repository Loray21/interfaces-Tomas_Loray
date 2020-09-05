let canvas = document.querySelector('canvas');
let input = document.querySelector('input');
// clear canvas
let context = canvas.getContext('2d');
context.fillStyle = "#024359"; // canvas background color
context.fillRect(0, 0, canvas.width, canvas.height);

imageData=context.getImageData( 0, 0, canvas.width, canvas.height );
// when click OK in the File Dialog
input.onchange = e => {

    // getting a hold of the file reference
    let file = e.target.files[0];

    // setting up the reader
    let reader = new FileReader();
    reader.readAsDataURL(file); // this is reading as data url

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
        let content = readerEvent.target.result; // this is the content!

        let image = new Image();
        //image.crossOrigin = 'Anonymous';

        image.src = content;

        image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;

            // draw image on canvas
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
        


            // get imageData from content of canvas
           
    
        }
    }
    
}
            // modify imageData
          
    function sepia(imageData){
        pixels = imageData.data,
        numPixels = imageData.width * imageData.height;
        for ( var i = 0; i < numPixels; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];
     
            pixels[ i * 4 ] = 255 - r;
            pixels[ i * 4 + 1 ] = 255 - g;
            pixels[ i * 4 + 2 ] = 255 - b;
     
            pixels[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
            pixels[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
            pixels[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
        }
        
     
        context.putImageData( imageData, 0, 0 );
        context.fillRect(0, 0, canvas.width, canvas.height);
    }


    function negativo(imageData){
        pixels = imageData.data,
        numPixels = imageData.width * imageData.height;
        for ( var i = 0; i < numPixels; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];
     
            pixels[ i * 4 ] = 255 - r;
            pixels[ i * 4 + 1 ] = 255 - g;
            pixels[ i * 4 + 2 ] = 255 - b;
            
        }
     
        context.putImageData( imageData, 0, 0 );
context.fillRect(0, 0, canvas.width, canvas.height);

    };

        
    let boton_sepia= document.getElementById("sepia");
    let boton_negativo=document.getElementById("negativo");
    boton_negativo.addEventListener("click",negativo(imageData));
    boton_sepia.addEventListener("click",sepia(imageData));

 
//el de binario(es escala de grises);