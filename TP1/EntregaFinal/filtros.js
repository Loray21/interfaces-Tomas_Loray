let canvas = document.querySelector('canvas');
let input = document.querySelector('input');
let btn_sepia=document.getElementById('sepia');
// clear canvas
let context = canvas.getContext('2d');
context.fillStyle = "#024359"; // canvas background color
context.fillRect(0, 0, canvas.width, canvas.height);
// when click OK in the File Dialog
// when click OK in the File Dialog


//cargar la iamgen
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
//se dispara cuando la imagen termina de cargar
      /*  image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;

            // draw image on canvas
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

            // get imageData from content of canvas
            let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
             

        }

    }
}*/



//guardar
//obtengo RGB
            function getRed (imageData, x, y){
                index = (x + y*imageData.width)*4;
               return imageData.data[index+0];
         }

            function getGreen (imageData, x, y){
                index = (x + y*imageData.width)*4;
               return imageData.data[index+1];
           }

           function getBlue (imageData, x, y){
               index = (x + y*imageData.width)*4;
               return imageData.data[index+2];
           }


           

            //funcion blnaco y negro
            function blancoynegro (imageData){
                for (x=0; x < imageData.width; x++){
                     for (y=0; y< imageData.height; y++){
                                        var red = getRed(imageData, x, y);
                                var green = getGreen(imageData, x, y);
                               var blue = getBlue(imageData, x, y);
                                var blackandwhite = (red + green + blue)/3;
                                setPixel(imageData, x, y, blackandwhite, blackandwhite, blackandwhite, 255);
                      }
                  }
                  context.putImageData(imageData,0,0);

          }

//FUNCION NEGATIVO
          function negativo(imageData){
                for (x=0; x < imageData.width; x++){
                       for (y=0; y< imageData.height; y++){
                                   var red = 255 - getRed(imageData, x, y);
                                     var green = 255 - getGreen(imageData, x, y);
                                     var blue = 255 - getBlue(imageData, x, y);
                                     setPixel(imageData, x, y, red, green, blue, 255);
                      }
                  }
                  context.putImageData(imageData,0,0);

          }
//funcion sepia 
          function sepia(imageData){
                for (x=0; x < imageData.width; x++){
                       for (y=0; y< imageData.height; y++){
                              var red = getRed(imageData, x, y);
                               var green = getGreen(imageData, x, y);
                               var blue = getBlue(imageData, x, y);
                               var avg = ((0.3 * red) + (0.59 * green) + (0.11 * blue));
                               setPixel(imageData, x, y, avg + 100, avg + 50, avg, 255);
                         }
                  }
                  context.putImageData(imageData,0,0);
          }



          function setPixel(imageData,x,y,r,g,b,a){
            //formulita que tranforma el arreglo donde estan almacenados los pixeles en matriz
    let index=(x+y*imageData.width)*4;
   imageData.data[index + 0]=r;
   imageData.data[index + 1]=g;
    imageData.data[index + 2]=b;
    imageData.data[index + 3]=a;
 
 }
 
/*el de binario(es escala de grises)*/