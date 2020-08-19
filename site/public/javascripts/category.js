window.addEventListener('load', function(){
    var newCategory = document.querySelector("#modal-prueba");

    if(newCategory != null) {
        newCategory.addEventListener('click',async function(){
            var {value : text } = await Swal.fire({
                title: 'Agregar nueva categoria',
                showCloseButton: true,
                text: 'Ingrese el nombre:',
                input: 'text',
                inputPlaceholder:'Nueva categoria',
                confirmButtonText:'Confirmar',
            });
            if(text != undefined){
                var option = document.createElement("option");
                option.text = text;
                option.value = text;
                option.selected='selected';
                var listCategory = document.querySelector('#tipo');
                listCategory.appendChild(option);
            }
        });
    }
    
});