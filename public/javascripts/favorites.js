window.addEventListener('load',function(){
    var butttonFavorite = document.querySelector("a.favorite-user");
    var session = document.querySelector('.session-front-end');
    butttonFavorite.addEventListener('click',function(e){
        var iconHeart = document.querySelector('i.fa-heart');
        e.preventDefault();
        if(session != null){
            Swal.fire('Debe logearse para almacenar favoritos');
        }else{
            var url= location.pathname;
            var productId=url[url.length-1];
            var data={
                product_id : productId,
            }

            if(iconHeart.style.color == "rgb(121, 82, 179)"){
                fetch("http://modasemilse.herokuapp.com/v1/products/delete/favorite",{
                    method:'POST',
                    body: JSON.stringify(data),
                    headers:{'Content-Type':'application/json'}
                    }).then((response)=>{
                        return response.json();
                    }).then((info)=>{
                        iconHeart.style.color="black";
                    }).catch((e)=>{
                        Swal.fire({
                            icon: 'error',
                            text: e,
                    });
                })
            }else{
                fetch("http://modasemilse.herokuapp.com/v1/products/add/favorite",{
                    method:'POST',
                    body: JSON.stringify(data),
                    headers:{'Content-Type':'application/json'}
                    }).then((response)=>{
                        return response.json();
                    }).then((info)=>{
                        iconHeart.style.color="#7952B3";
                    }).catch((e)=>{
                        Swal.fire({
                            icon: 'error',
                            text: e,
                    });
                })
            }
        }
    });
});
