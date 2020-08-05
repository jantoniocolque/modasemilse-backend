window.addEventListener('load', function(){
    // required variables 
    var shoppingCart;
    var cartView = document.querySelector('div.cart-view');
    var cartBtn = document.querySelector('i.fa-shopping-cart');
    var cartPreview = document.querySelector('div.cart-preview');
    var addBtn = document.querySelector('button.add-to-cart');
    var purchaseBtn = document.querySelector('button.btn-purchase');

    // checks localStorage && sets shoppingCart value

    if(localStorage.getItem('shoppingCart')){
        shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        updateCartPreview();
    }else{
        shoppingCart = [];
    }

    // this will update the cartView if we're @ /cart

    if(cartView){
        updateCartView();
    }

    // re directs to /cart onClick

    cartBtn.addEventListener('click', function(){
        window.location.href = '/cart';
    })

    // displays or hides the cart preview

    cartBtn.addEventListener('mouseover', function(){
        cartPreview.style.display = 'flex';
    })

    cartPreview.addEventListener('mouseleave', function(){
        cartPreview.style.display = 'none';
    })

    // ALL FUNCTIONS: 

    // sets actions for "añadir al carrito"

    if(addBtn){

        addBtn.addEventListener('click', function(){
    
            var productTitle = document.querySelector('#product-title').innerText;
            var productPrice = document.querySelector('#price').innerText;
            var productSize = document.querySelector('select.product-size').value;
            var productQuantity = document.querySelector('select.product-quantity').value;
            var productImg = document.querySelector('img.product-img').name;
            var productColor = document.querySelector('.product-color').innerText;
            var productCode = document.querySelector('.product-code').innerText;
    
            var newItem = {
                name : productTitle,
                price : productPrice,
                size : productSize,
                quantity : productQuantity,
                img : productImg,
                color : productColor,
                code : productCode
            }
    
            shoppingCart.push(newItem);

            updateCartPreview();
            updateCartStored();
    
        })

    }

    if(purchaseBtn){
        purchaseBtn.addEventListener('click', function(){
            alert('Gracias por tu compra ! Att. Modas Emilse');

            localStorage.clear();
            shoppingCart = [];

            location.href = '/';
        })
    }

    function updateCartPreview(){

        cartPreview.innerHTML = `<div></div>`;

        var cartItems = document.querySelector('div.cart-preview div');

        document.querySelector('span.cart-shop-counter').innerHTML = shoppingCart.length;

        for(var i = 0; i < shoppingCart.length; i++){
            cartItems.innerHTML += `
            <div class="row cart-preview-item">
                <img src="/images/products/${shoppingCart[i].img}" height="50px" width="30px">
                <div>
                    <span>${shoppingCart[i].name}</span>
                    <span style="font-weight: bold;">${shoppingCart[i].price}</span>
                </div>
            </div>`;
        }
    }

    function updateCartView(){
        console.log(shoppingCart);

        if(shoppingCart.length === 0){
            document.querySelector('section.modas-empty-cart').classList.remove('modas-hide');
        }else{
            document.querySelector('section.content-section').classList.remove('modas-hide');

            cartView.innerHTML = `<div></div>`;

            var cartViewItems = document.querySelector('div.cart-view div');

            for(var i = 0; i < shoppingCart.length; i++){
                cartViewItems.innerHTML += `
                <div class="row cart-view-item">
                    <div class="cart-item-image" style="background-image: url(/images/products/${shoppingCart[i].img})"></div>
                    <div class="cart-item-title">${shoppingCart[i].name}</div>

                    <span class="cart-price cart-column">${shoppingCart[i].price}</span>
                    
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="${shoppingCart[i].quantity}">
                        <button class="btn btn-danger" type="button" id="${i}"><i class="far fa-trash-alt" id="${i}"></i></button>
                    </div>
                </div>`;
            }

            cartStandBy();
            updateCartTotal();
        }

    }

    function updateCartStored(){
        localStorage.clear();
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
    
    if (document.readyState == 'complete') {
        cartStandBy();
    } else {
        location.reload();
    }

    function cartStandBy() {

        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
        }
    
        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }
    }

    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-view')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-view-item')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    }

    function quantityChanged(e) {
        var input = e.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }

    function removeCartItem(e) {
        shoppingCart.splice(e.target.id, 1);
        console.log(shoppingCart.length);

        if(shoppingCart.length >= 1){
            updateCartStored();
            updateCartPreview();
            updateCartView();
        }else{
            updateCartStored();
            location.reload();
        }
    }
})