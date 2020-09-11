let canvas = document.querySelector('canvas');
let input = document.querySelector('input');
let btn_sepia=document.getElementById('sepia');

// clear canvas
let context = canvas.getContext('2d');
context.fillStyle = "#024359"; // canvas background color
context.fillRect(0, 0, canvas.width, canvas.height);
var imageData;



// paint 
//obtengo donde esta el canvas con respecto a la pantalla
let rect = canvas.getBoundingClientRect();
let x=0,y=0,dibujando=false,color='black',grosor=1;
function defcolor(c){
  color=c;
}
function defgrosor(g){
  grosor=g;
}
//mousedown es cuando da click la primera vez en el canvas
canvas.addEventListener('mousedown',function(e){
  //posicion de x y le resto la posicion del canvas donde esta en la pantalla,left=x
  x=e.clientX-rect.left
  y=e.clientY-rect.top;
  dibujando=true;
});
//cuando el mouse se mueve
canvas.addEventListener('mousemove',function(e){
   if(dibujando===true){
     dibujar(x,y,e.clientX-rect.left,e.clientY-rect.top);
     x=e.clientX-rect.left;
     y=e.clientY-rect.top;
   }

});

//cuando quita el click del moouse
canvas.addEventListener('mouseup',function(e){
  if(dibujando===true){
    dibujar(x,y,e.clientX-rect.left,e.clientY-rect.top);
     x=0;
     y=0;
     dibujando=false;
  }
})

function dibujar(x1,y1,x2,y2){
  context.beginPath();
  //atributos de la linea
  context.strokeStyle=color;
  context.lineWidth=grosor;
  //punto inical
  context.moveTo(x1,y1);
  //punto final
  context.lineTo(x2,y2);

  context.stroke();
  //cierro la ruta
  context.closePath();
}



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
image.onload = function () {
    let imageAspectRatio = (1.0 * this.height) / this.width;
    let imageScaledWidth = canvas.width;
    let imageScaledHeight = canvas.width * imageAspectRatio;

    // draw image on canvas
    context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

    // get imageData from content of canvas
     imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);


}
    }
}






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
            function blancoynegro (){
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

        botonByN();
          function botonByN(){
               let btn = document.getElementById("byn");
              btn.addEventListener("click", function(){
                blancoynegro();
              });
            }

        //funcion negativo
          function negativo(){
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
            //evento clik negativo
          botonNegativo();
        function botonNegativo(){
            let btn = document.getElementById("negativo");
                btn.addEventListener("click", function(){
                     negativo();
            });
        }
        
        //funcion sepia 
          function sepia(){
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

          botonSepia();
          function botonSepia(){
              let btn = document.getElementById("sepia");
                  btn.addEventListener("click", function(){
                       sepia();
              });
          }
         




          function brillo(valor_brillo){
            for ( x = 0; x < canvas.width; x++) {
             for ( y = 0; y < canvas.height; y++) {
              index = (x + y * imageData.width) * 4;
              imageData.data[index+0]=valor_brillo*getRed(imageData, x, y);
              imageData.data[index+1]=valor_brillo*getGreen(imageData, x, y);
              imageData.data[index+2]=valor_brillo*getBlue(imageData, x, y);
              imageData.data[index+3]=255;
              
            }
        }
        context.putImageData(imageData, 0,0);

    }
        
         //evento clik sepia
          botonBrillo();
          function botonBrillo(){
            let btn = document.getElementById("brillo");
            btn.addEventListener("click", function(){
             brillo_inicial=2;
             console.log(brillo_inicial);
             brillo(brillo_inicial);    
            });
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
