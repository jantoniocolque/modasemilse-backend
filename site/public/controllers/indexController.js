const fs=require('fs');
const path=require('path');
const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));

const controller = {
    root:(req,res)=>{
        res.render('index', { title: 'Modas Emilse | Inicio' });
    },
    
    search:(req,res)=>{
        const keywords=req.body.keywords.toLowerCase();
        const arrayKeywords= keywords.split(' ');
        const findKeywords = [];
        for(var i=0; i<products.length ; i++)
        {
            for(var j=0; j<arrayKeywords.length; j++){
                if(products[i].type.toLowerCase() == arrayKeywords[j]){
                    findKeywords.push(products[i].id);
                    j=arrayKeywords.length;
                }
            }
        }
        console.log(findKeywords);
        res.send('Buscando');
    }
}

module.exports = controller;