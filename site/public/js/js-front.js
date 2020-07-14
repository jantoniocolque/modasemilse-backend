window.addEventListener('load', function() {

    let errors = [];
    let formulario = document.querySelector('form.admin-addproduct');
    let agregar = document.querySelector('.agregar');
    let productName = document.querySelector('.new-titulo');
    
    let description = document.querySelector('.description');
    let imagen1 = document.querySelector('.card-img-top');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        let productName = document.querySelector('.new-titulo');
        console.log(productName);
        
        if (productName.value == ""){    
            errors.push("El titulo no puede estar vacío");
        }
        else {
            if(productName.value.length < 5) {
                errors.push("El titulo debe tener al menos 5 caracteres");
            }
        }

        if(description.value == null || description.value.length < 20) {
            errors.push("La descripción debe tener al menos 20 caracteres");
        }
        console.log(errors);
        console.log(imagen1);
    }) 

    if(errors.length > 0){
        e.preventDefault();
        
        document.querySelector('div.errors-feedback').style.display = 'flex';

        document.querySelector('div.errors-feedback').innerHTML = '<ul></ul>'

        var listErrors = document.querySelector('div.errors-feedback ul');
        listErrors.style.background = 'rgba(255,255,255, 0.5)';

        for(var i = 0; i < errors.length; i++){
            listErrors.innerHTML += "<li>" + " &raquo; " + errors[i] + '</li>';
        }
    }
})

            /*
            var errorName = document.querySelector('.error-name');
            errorName.innerHTML = "<p>" + "El campo nombre no puede ser vacío" + "</p>"
            */
        
        
      /*  if (productName.value.length < 5){
            errores.push('El campo nombre debe tener más de 5 caracteres')
        }

        if(description.value.length < 20){
            errores.push('El campo descripción debe tener más de 20 caracteres');
        }

        if (imagen1.value == undefined){
            errores.push('La imagen no puede ser de tipo plipli');
        }       
    }  */



