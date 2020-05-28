const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));

function removeDuplicates(originalArray, nameProperty) {
    var newArray = [];
    var objectProcess  = {};
    for(var i=0; i<originalArray.length ; i++){
        objectProcess[originalArray[i][nameProperty]] = originalArray[i];
    }
    for(var object in objectProcess) {
        newArray.push(objectProcess[object]);
    }
     return newArray;
}

const controller = {
    root:(req,res) => {
        /*const newPrueba = {a:1,b:5124,c:5,d:613};
        for(i in newPrueba){
            console.log(newPrueba[i]);
        }*/
        var productsWithoutRepeat = removeDuplicates(products,'idArticle');
        res.render('tienda', { 
            title: 'Tienda - Emilse',
            titleContent:'Todos los productos',
            products:productsWithoutRepeat,
        }); 
        res.render('tienda',{
            products:products,
        });
    },
    
    filter:(req,res) => {
        const productsFilter = products.filter(product => req.params.type.includes(product.type.toLowerCase()));
        res.render('tienda',{
            title: 'Tienda - Emilse',
            titleContent: req.params.type[0].toUpperCase()+req.params.type.slice(1),
            products:removeDuplicates(productsFilter,'idArticle'),
        });
    },

    create:(req,res) => {
        res.send('crear');
    },

    store:(req,res) => {
        res.send('Guardado');
    }
}

module.exports = controller;