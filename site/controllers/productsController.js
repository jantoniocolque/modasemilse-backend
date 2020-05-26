const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));

const controller = {
    root:(req,res) => {
        const productsForPage = products.filter(product => {
            if(product.id != 1){
                return product;
            }
        });
        console.log(productsForPage);
        res.render('tienda',{
            products:products,
        });
    }
}

module.exports = controller;