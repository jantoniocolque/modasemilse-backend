window.addEventListener('load', function() {
   
    var productAddForm = document.querySelector('form.admin-addproduct');
    var productEditForm = document.querySelector('form.admin-editproduct');
    
    var imagen1 = document.querySelector('.imagen1');

    if(productAddForm){
        var form = productAddForm;
    }
    else{
        if(productEditForm) {
            var form = productEditForm;
        }
    }
    
    form.addEventListener('submit', function(e) {
        var errors = [];
        var productName = document.querySelector('.new_title');
        var description = document.querySelector('.description_product');
        var code = document.querySelector('.code');
        var sex = document.querySelector('.sex');
        var type_clothe = document.querySelector('.type_clothe');
        var sizes = document.querySelector('.sizes');
        var units = document.querySelector('.units');
        var colour = document.querySelector('.colour');
        var precio_menor = document.querySelector('.precio_menor');
        var precio_mayor = document.querySelector('.precio_mayor');
        var fecha = document.querySelector('.fecha');

        /*
        var fileInput = document.querySelector('#imagen-producto-1');
        var filePath = fileInput.value; */

        console.log(productName.value.length );
        console.log(description.value.length);
        //console.log(fileInput);
        //console.log(filePath);

        /*var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        if(!allowedExtensions.test(filePath)){
            errors.push("Las imagenes deben ser de tipo JPG, JPEG, PNG o GIF");
        } */

        if(productName.value == "" || productName.value.length < 5) {
            errors.push("Debe ingresar un título con al menos 5 caracteres");
        }

        // No funciona, se deberá arreglar.
        if(description.value == "" || description.value.length < 20) {
            errors.push("Debe ingresar una descripción con al menos 20 caracteres");
        }

        if(code.value == ""){
            errors.push("Debe ingresar un código para el producto");
        }

        if(sex.value == ""){
            errors.push("Debe ingresar el sexo");
        }

        if(type_clothe.value == "Selecciona una categoria"){
            errors.push("Debe ingresar un tipo");
        }

        if(sizes.value == "Selecciona un talle"){
            errors.push("Debe ingresar un talle");
        }

        if(units.value == ""){
            errors.push("Debe ingresar una cantidad");
        }

        if(colour.value == ""){
            errors.push("Debe ingresar al menos un color");
        }

        if(precio_menor.value == ""){
            errors.push("Debe ingresar el precio por menor");
        }

        if(precio_mayor.value == ""){
            errors.push("Debe ingresar el precio por mayor");
        }

        if(fecha.value == ""){
            errors.push("Debe seleccionar una fecha");
        }

        if(errors.length > 0){
            e.preventDefault();
            
            document.querySelector('div.errors-feedback').style.display = 'flex';

            document.querySelector('div.errors-feedback').innerHTML = '<ul></ul>'

            let listErrors = document.querySelector('div.errors-feedback ul');
            listErrors.style.background = 'rgba(255,255,255, 0.5)';

            for(var i = 0; i < errors.length; i++){
                listErrors.innerHTML += "<li>" + " &raquo; " + errors[i] + '</li>';
            }
        }
    }) 
})



