window.addEventListener('load', function() {

    
    let formulario = document.querySelector('form.admin-addproduct');
    let agregar = document.querySelector('.agregar');
    let productName = document.querySelector('.new-titulo');
    //let description = document.querySelector('.description-product');
    
    let imagen1 = document.querySelector('.card-img-top');
    
    formulario.addEventListener('submit', function(e) {
        let errors = [];
        let productName = document.querySelector('.new-titulo');
        //let description = document.querySelector('.description-product');

        //console.log(description.value);

        
        if (productName.value == ""){    
            errors.push("El titulo es obligatorio");
        }

        if(productName.value.length < 5) {
            errors.push("El titulo debe tener al menos 5 caracteres");
        }
        // No funciona, se deberá arreglar.
        /*if(description.value == "" || description.value.length < 20) {
            errors.push("La descripción debe tener al menos 20 caracteres");
        } */

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



