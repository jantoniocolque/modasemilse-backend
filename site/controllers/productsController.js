const fs = require('fs');
const path = require('path');
const {check,validationResult,body}=require('express-validator');
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

//function productDetails(originalArray, productId){}

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
            session:req.session.userLoginSession
        });
    },
    
    filter:(req,res) => {
        const productsFilter = products.filter(product => req.params.type.includes(product.type.toLowerCase()));
        res.render('tienda',{
            title: 'Tienda - Emilse',
            titleContent: req.params.type[0].toUpperCase()+req.params.type.slice(1),
            products:removeDuplicates(productsFilter,'idArticle'),
            session:req.session.userLoginSession
        });
    },


    create:(req,res) => {
        res.render('productAdd',{
            title:'Carga de Producto',
            session:req.session.userLoginSession
        });
    },

    store:(req,res,next) => {
        const newId = products[products.length-1].id + 1;
        
        const newProduct = {
            id:newId,
            idArticle: req.body.idArticle,
            gender: req.body.gender,
            title:req.body.title,
            description:req.body.description,
            type:req.body.type,
            image:[
                req.files[0].filename,
                req.files[1].filename,
                req.files[2].filename,
            ],
            talle:req.body.talle,
            colour: req.body.colour,
            print: req.body.print,
            unit: req.body.unit,
            price: req.body.price,
            priceDiscount: req.body.priceDiscount,
            fecha: req.body.fecha
        };

        const finalProduct = [...products,newProduct];
        fs.writeFileSync(productsFilePath,JSON.stringify(finalProduct, null, ' '));
        return res.redirect('/products');
        
    },

    edit:(req,res) => {
        let idEdit = req.params.productId;
		let productEdit;
		products.forEach(product => {
			if(idEdit == product.id){
				productEdit=product;
			}
        });
		res.render('productEdit', {
            title:'Editando - Modas Emilse',
			productEdit:productEdit,
            idEdit:idEdit,
            session:req.session.userLoginSession
        });
    },

    update: (req,res) => {
        let idEdit = req.params.productId;
		const newProducts = products.map(product =>{
			if(product.id == idEdit)
			{
                product.idArticle = req.body.idArticle;
                product.gender = req.body.gender;
                product.title = req.body.title;
                product.description = req.body.description;
                product.type = req.body.type;
                product.talle = req.body.talle;
                product.colour = req.body.colour;
                product.print = req.body.print;
                product.units = req.body.units;
                product.price = req.body.price;
                product.priceDiscount = req.body.priceDiscount;
                product.date = req.body.date;
			}
			return product;
        });
		fs.writeFileSync(productsFilePath,JSON.stringify(newProducts,null, ' '));
		res.redirect('/products');
    },

    destroy:(req,res) => {
        const idDelete = req.params.productId;
		let newID=1;
		const newProducts=products.filter(product =>{
			if(product.id != idDelete){
				product.id=newID;
				newID+=1;
				return product;
			}
        });
        
		fs.writeFileSync(productsFilePath,JSON.stringify(newProducts,null, ' '));

		res.redirect('/');
    },

    detail:(req,res) => {
        const idProduct = req.params.productId;
        const product = products.filter(product => {
            if(product.id == idProduct){
                productDetails = product;
            }
        });
        res.render('detalleProducto',  {productDetails:productDetails,session:req.session.userLoginSession}
        );
    },

}

module.exports = controller;
