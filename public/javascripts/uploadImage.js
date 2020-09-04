window.addEventListener('load', function(){
    var url = location.pathname;

    
    function createPreview(file,contenedor,i) {
        var imgCodified = URL.createObjectURL(file); 
        var button = document.querySelector("#custom-button");
        var img = '<div class="image-container-'+i+'"> <figure class="m-0"><img class="upload-'+ i +'" src="' + imgCodified + '" alt="Foto del usuario"><div class="photo-menu"><i id="borrar-'+i+'" class="far fa-trash-alt"></i></div><figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div>';
        contenedor.innerHTML = img;
        
        var contenedorImage = document.querySelector('.image-container-'+i+'');
        var borrar = document.querySelector('#borrar-'+i+'');

        if(contenedorImage != null){ 
            borrar.addEventListener("click",function(){
                var padre = document.querySelector(".admin-addphotos");
                borrarElemento(padre,contenedorImage);
                if(button != null){
                    button.disabled = false;
                }
            });
        }
    }

    function borrarElemento(padre , contenedor){
        padre = contenedor.parentNode;
        padre.removeChild(contenedor);
    }

    if(url == "/products/create"){
        var image1 = document.querySelector("#imagen-producto-1");
        image1.addEventListener("change",function () {
            var contenedor = document.querySelector(".upload-image-1");
            var files = image1.files;
            var element;
            for (var i = 0; i < files.length; i++) {
                element = files[i];
                createPreview(element,contenedor,1);
            }
        });
        var image2 = document.querySelector("#imagen-producto-2");
        image2.addEventListener("change",function () {
            var contenedor = document.querySelector(".upload-image-2");
            var files = image2.files;
            var element;
            for (var i = 0; i < files.length; i++) {
                element = files[i];
                createPreview(element,contenedor,2);
            }
        });
        var image3 = document.querySelector("#imagen-producto-3");
        image3.addEventListener("change",function () {
            var contenedor = document.querySelector(".upload-image-3");
            var files = image3.files;
            var element;
            for (var i = 0; i < files.length; i++) {
                element = files[i];
                createPreview(element,contenedor,3);
            }
        });
    }
    else if(url =="/users/register"){
        var avatar = document.querySelector("#avatar");
        avatar.addEventListener("change",function () {
            var boton = document.querySelector("#custom-button");
            var contenedor = document.querySelector(".upload-avatar");
            var files = avatar.files;
            var element;
            for (var i = 0; i < files.length; i++) {
                element = files[i];
                createPreview(element,contenedor,4);
                boton.disabled = true;
            }
        });
    }
});