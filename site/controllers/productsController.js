const {check,validationResult,body}=require('express-validator');

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
    root: async (req,res) => {
        const categorias = await db.Category.findAll();
        db.Product.findAll()
        .then(function(product){
            res.render('tienda',{
                title:'Tienda - Emilse',
                titleContent: 'Todos los productos',
                products:removeDuplicates(product,'code_article'),
                categorias: categorias,
                session:req.session.userLoginSession,
            })
        })
    },

    filter:async(req,res) => {
        const categorias = await db.Category.findAll();
        const productsFilter = await db.Product.findAll({
            include: [{
                association:'category',
                where: { type_cloth: req.params.type } 
              }]
        });
        res.render('tienda',{
            title: 'Tienda - Emilse',
            titleContent: req.params.type[0].toUpperCase()+req.params.type.slice(1),
            categorias: categorias,
            products:removeDuplicates(productsFilter,'code_article'),
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

    store:async (req,res) => {
        const sizes = await db.Size.findAll();
        if(isNaN(parseInt(req.body.type_cloth,10))){
            await db.Category.create({
                type_cloth:req.body.type_cloth
            });
            const newCategory = await db.Category.findOne({where:{type_cloth:req.body.type_cloth}});
            req.body.type_cloth = newCategory.id;
        }
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
                gender: req.body.gender,
                date_up: req.body.date_up,
                price: req.body.price,
                price_discount: req.body.price_discount,
                colour: req.body.colour,
                category_id:req.body.type_cloth,
                products_sizes:[{
                    size_id:req.body.size_id,
                    units:req.body.units,
                    code:req.body.code_article,
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
                errors:errors.errors,
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
        const sizes = await db.Size.findAll();
        const categorys = await db.Category.findAll();
        if(product != null){
            res.render('productEdit', {
                title:'Editando - Modas Emilse',
                product:product,
                sizes:sizes,
                categorys:categorys,
                session:req.session.userLoginSession,
            });
        }
        res.render('productAdd', {
            title:'Crear producto - Modas Emilse',
            sizes:sizes,
            error:'No existe ese producto',
            categorys:categorys,
            session:req.session.userLoginSession,
        });
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

    detail :async function(req, res) {
        const product= await db.Product.findByPk(req.params.productId,{
            include:[{association:'users'}]
        });
        const productsForArticle = await db.Product_Size.findAll({where:{code:product.code_article}});
        const sizes = await db.Size.findAll();
        res.render('detalleProducto', {
            product : product,
            sizes: sizes,
            productsForArticle:productsForArticle,
            session:req.session.userLoginSession,
        });
    }
}

module.exports = controller;