window.addEventListener('load', function(){
    var image = document.querySelector(".image");
    var image2 = document.querySelector(".image2");
    var image3 = document.querySelector(".image3");
    var tablaMedidas = document.querySelector(".tablaMedidas");
    var zoom = document.querySelector(".zoomWindow");
    image2.addEventListener('click',function(e){
        zoom.setAttribute("style","overflow: hidden; background-position: -461px -121.935px; text-align: center; background-color: rgb(255, 255, 255); width: 400px; height: 400px; float: left; background-size: 853px 1280px; z-index: 100; border: 4px solid rgb(136, 136, 136); background-repeat: no-repeat; position: absolute; background-image: url("+image2.getAttribute('src')+"); top: 0px; left: 357.5px; display: none;");
        image.setAttribute("src",image2.getAttribute("src"));
        image2.setAttribute("src",image.getAttribute("data-src"));
        image.setAttribute("data-src",image.getAttribute("src"));
    });

    image3.addEventListener('click',function(e){
        zoom.setAttribute("style","overflow: hidden; background-position: -461px -121.935px; text-align: center; background-color: rgb(255, 255, 255); width: 400px; height: 400px; float: left; background-size: 853px 1280px; z-index: 100; border: 4px solid rgb(136, 136, 136); background-repeat: no-repeat; position: absolute; background-image: url("+image3.getAttribute('src')+"); top: 0px; left: 357.5px; display: none;");
        image.setAttribute("src",image3.getAttribute("src"));
        image3.setAttribute("src",image.getAttribute("data-src"));
        image.setAttribute("data-src",image.getAttribute("src"));
    });

    tablaMedidas.addEventListener('click',function(e){
        zoom.setAttribute("style","overflow: hidden; background-position: -461px -121.935px; text-align: center; background-color: rgb(255, 255, 255); width: 400px; height: 400px; float: left; background-size: 853px 1280px; z-index: 100; border: 4px solid rgb(136, 136, 136); background-repeat: no-repeat; position: absolute; background-image: url("+tablaMedidas.getAttribute('src')+"); top: 0px; left: 357.5px; display: none;");
        image.setAttribute("src",tablaMedidas.getAttribute("src"));
        tablaMedidas.setAttribute("src",image.getAttribute("data-src"));
        image.setAttribute("data-src",image.getAttribute("src"));
    });
});