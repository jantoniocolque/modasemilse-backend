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
        
        db.Product.findAll()
        .then(function(product){
            res.render('tienda',{
                title:'Tienda - Emilse',
                titleContent: 'Todos los productos',
                products:removeDuplicates(product,'code_article'),
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


    create:async (req,res) => {
        const sizes = await db.Size.findAll();
        const categorys = await db.Category.findAll();
        res.render('productAdd',{
            title:'Carga de Producto',
            sizes:sizes,
            categorys:categorys,
            session:req.session.userLoginSession
        });
    },

    store:async (req,res,next) => {
        const sizes = await db.Size.findAll();
        const categorys = await db.Category.findAll();
        const errors=validationResult(req);
        if(errors.isEmpty()){
            await db.Product.create({
                code_article: req.body.code_article,
                title: req.body.title,
                description_product: req.body.description_product,
                image: req.files[0].filename,
                image2: req.files[1].filename,
                image3: req.files[2].filename,
                gender: req.body.femenino,
                date_up: req.body.date_up,
                price: req.body.price,
                price_discount: req.body.price_discount,
                colour: req.body.colour,
                category_id: req.body.type_cloth,
                products_sizes:[{
                    size_id:req.body.size_id,
                    units:req.body.units,
                }]
            },{
                include:[{
                    association:'products_sizes'
                }]
            });
    
            return res.redirect('/products');
        }else{
            return res.render('productAdd',{
                sizes:sizes,
                categorys:categorys,
                error:errors.errors,
                title:'Carga de productos',
                session:req.session.userLoginSession
            })
        }
    },

    edit: async (req,res) => {
        const product = await db.Product.findByPk(req.params.productId,{
            include:[{
                association:'products_sizes'
            }]
        });
        console.log(product);
        const sizes = await db.Size.findAll();
        const categorys = await db.Category.findAll();
        if(product != undefined){
            res.render('productEdit', {
                title:'Editando - Modas Emilse',
                product:product,
                sizes:sizes,
                categorys:categorys,
                session:req.session.userLoginSession,
            });
        }
        else{
            res.render('productAdd', {
                title:'Crear producto - Modas Emilse',
                sizes:sizes,
                errors:'No existe ese producto',
                categorys:categorys,
                session:req.session.userLoginSession,
            });
        }
        
    },

    update: function(req,res) {
        db.Product.update({
            code_article: req.body.code_article,
            title: req.body.title,
            description_product: req.body.description_product,
            gender: req.body.femenino,
            date_up: req.body.date_up,
            price: req.body.price,
            price_discount: req.body.price_discount,
            colour: req.body.colour,
            category_id: req.body.type_cloth,
        },{
            where: {
                id: req.params.productId,
            }
        });
        db.Product_Size.update({
            size_id: req.body.size_id,
            units:req.body.units
        },{
            where:{
                product_id: req.params.productId
            }
        })
         res.redirect('/products/edit/' + req.params.productId );
    },

    destroy :function(req,res) {
        db.Product_Size.destroy({
            where:{
                product_id: req.params.productId,
            }
        });

        db.Product.destroy({
            where:{
                id: req.params.productId,
            }
        });
        res.redirect('/products');
    },

    detail : function(req, res) {
       db.Product.findByPk(req.params.productId)
       .then(function(product){
           res.render('detalleProducto', {product : product, session:req.session.userLoginSession})
       });
    }
}

module.exports = controller;