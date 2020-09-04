window.addEventListener('load', function(){
    var url = location.pathname;
    if(url == "/users/account/shops"){
        var order = document.querySelectorAll('button.view-shop');
        var table = document.querySelectorAll('tr.tabla-shop');
        var titulo = document.querySelector('h2.orden_id');
        for(var i=0; i< order.length; i++){
            order[i].addEventListener('click',function(e){
                for(var j=0; j< table.length ; j++){
                    table[j].hidden=false;
                    if(this.id != table[j].id){        
                        table[j].hidden = true;
                    }
                    var fila = document.querySelector('tr.fila-'+this.id);
                    var total = document.querySelector('p.total-shop');
                    total.innerHTML = '<strong>Total: '+fila.cells[3].textContent+'</strong>';
                    titulo.innerHTML='Venta: #'+ this.id;
                }
            })
        }

        var finish = document.querySelectorAll('button.finish-shop');
        for(var i=0; i< finish.length; i++){
            finish[i].addEventListener('click',function(e){
                var fila = document.querySelector('tr.fila-'+this.id);
                fila.cells[4].innerHTML = "Finalizado";
                this.hidden=true;
                
                var data={
                    order_id:this.id
                }
                
                fetch("http://localhost:3000/v1/products/shop/confirm",{
                    method:'POST',
                    body:JSON.stringify(data),
                    headers:{'Content-Type':'application/json'}
                }).then((response)=>{
                    return response.json();
                }).then((info) =>{
                    Swal.fire('Base de datos actualizada!');
                })
            })
        }
    }
});