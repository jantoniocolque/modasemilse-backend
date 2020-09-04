window.addEventListener('load', function(){
    var url = location.pathname;
    if(url =="/users/account/orders"){
        var filasPedidos= document.querySelectorAll('tr#fila-pedidos');
        var order = document.querySelectorAll('button.view-shop');
        var table = document.querySelectorAll('tr.tabla-shop');
        var titulo = document.querySelector('h2.orden_id');
        for(var i=0; i< order.length; i++){
            filasPedidos[i].addEventListener('mouseover',function(){
                this.style.backgroundColor ="#7952B3";
                this.style.cursor="pointer";
            });

            filasPedidos[i].addEventListener('mouseout',function(){
                this.style.backgroundColor ="transparent";
            })
            
            filasPedidos[i].addEventListener('click',function(){
                var order = document.querySelectorAll('button.view-shop');
                for(var j=0; j<order.length ; j++){
                    if(this.cells[0].textContent == order[j].id){
                        order[j].click();
                    }
                }
            })
            order[i].addEventListener('click',function(e){
                for(var j=0; j< table.length ; j++){
                    table[j].hidden=false;
                    if(this.id != table[j].id){        
                        table[j].hidden = true;
                    }
                    var fila = document.querySelector('tr.fila-'+this.id);
                    var total = document.querySelector('p.total-shop');
                    total.innerHTML = '<strong>Total: '+fila.cells[2].textContent+'</strong>';    
                    titulo.innerHTML='Venta: #'+ this.id;
                }
            })
        }
    }
});