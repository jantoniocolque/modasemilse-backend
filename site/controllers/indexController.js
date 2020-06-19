const fs=require('fs');
const path=require('path');

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
    root:(req,res)=>{
        res.render('index', { title: 'Modas Emilse | Inicio',session:req.session.userLoginSession});
    },
    
    search:(req,res)=>{
        const keywords = req.query.keywords.toLowerCase();
        const arrayKeywords= keywords.split(' ');
        const findKeywords = [];
        for(var i=0; i<products.length ; i++)
        {
            for(var j=0; j<arrayKeywords.length; j++){
                if(products[i].type.toLowerCase() == arrayKeywords[j]){
                    findKeywords.push(products[i]);
                    j=arrayKeywords.length;
                }
            }
        }
        res.render('tienda',{
            title:'Tienda - Emilse',
            titleContent: 'Resultados de busqueda',
            products:removeDuplicates(findKeywords,'idArticle'),
            session:req.session.userLoginSession
        });
    }
}

module.exports = controller;