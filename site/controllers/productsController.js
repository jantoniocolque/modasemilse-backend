const fs = require('fs');
const path = require('path');
const {check,validationResult,body}=require('express-validator');

/* Dejamos de utilizar el arch JSON*/
const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8')); 

/* Se requieren los modelos de la base de datos */
let db = require('../database/models');
// let sequelize = db.sequelize;

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
        console.log(req);
        
        db.Products.findAll({ where:{ size : 1}})
        .then(function(products){
                console.log(products)
                res.render('tienda',{
                    title:'Tienda - Emilse',
                    titleContent:'Todos los productos',
                    products:products,
                    session:req.session.userLoginSession
            })
        })
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

        console.log('Este es el body')
        console.log(req.body);
        console.log('Aca termina el body')
        db.Products.create({
            id: null,
            code_article: req.body.code_article,
            title: req.body.title,
            gender: req.body.gender,
            description_product: req.body.description_product,
            type_cloth: req.body.type_cloth,
            image: req.files[0].filename,            
            size: req.body.size,
            colour: req.body.colour,
            units: req.body.units,
            price: req.body.price,
            price_discount: req.body.price_discount,
            date_up: req.body.date_up,
            image2: req.files[1].filename,
            image3: req.files[2].filename,

        }) 
        return res.redirect('/products');  
    },

    edit:(req,res) => {
        db.Products.findByPk(req.params.productId)
        .then(function(product) {
            res.render('productEdit', {
                title:'Editando - Modas Emilse',
                product:product,
                session:req.session.userLoginSession,
            });
        })
    },

    update: function(req,res) {
        db.Products.update({
            code_article: req.body.code_article,
            title: req.body.title,
            gender: req.body.gender,
            description_product: req.body.description_product,
            type_cloth: req.body.type_cloth,
            image: req.body.image,           
            size: req.body.size,
            colour: req.body.colour,
            units: req.body.units,
            price: req.body.price,
            price_discount: req.body.price_discount,
            date_up: req.body.date_up,
            image2: req.body.image2,
            image3: req.body.image3,
        }, {
            where: {
                id: req.params.productId,
            }
        })
        res.redirect('products/edit/' + req.params.productId )
    },

    delete : function(req,res) {
        db.Products.destroy({
            where:{
                id: req.params.productId,
            }
        }),
        res.redirect('/products');
    },

    detail : function(req, res) {
       db.Products.findByPk(req.params.productId)
       .then(function(product){
           res.render('detalleProducto', {product : product, session:req.session.userLoginSession})
       })
    }
}

module.exports = controller;
