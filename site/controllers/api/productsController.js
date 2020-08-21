const db = require('../../database/models');
const Op = require('Sequelize').Op;

const controller = {
    list: async (req,res) => {
        const products = await db.Product.findAll();
        const categorys = await db.Category.findAll();
        let categoryAcc = {}
        let acc;
        let data = [];
        for( let i=0; i<products.length;i++){
            data[i] = {
                id : products[i].id,
                name : products[i].title,
                description : products[i].description_product,
                endpoints : "http://localhost:3000/v1/products/"+products[i].id,
            };
        }
        for(let i=0; i<categorys.length; i++){
            acc = 0;
            for(let j=0; j<products.length;j++){
                if(products[j].category_id == categorys[i].id){
                    acc++;
                }
            }
            let nombre = categorys[i].type_cloth;
            categoryAcc[nombre] = acc;
        }

        const respuesta = {
            meta:{
                status:200,
                total: products.length,
                categorys:categoryAcc,
            },
            data:data,
        }
        res.json(respuesta);
    },

    find : async function(req, res) {
        const product = await db.Product.findByPk(req.params.id);
        const productsForArticle = await db.Product.findAll({where:{code_article:product.code_article}});
        const sizesForArticle = await db.Product_Size.findAll({where:{code:product.code_article}});
        const sizes = await db.Size.findAll();
        const category = await db.Category.findByPk(product.id);
        let colours = [];
        let sizesArray = [];
        let cantidad = 0;

        for(productForArticle of productsForArticle){
            colours.push(productForArticle.colour);
        }

        for( let i = 0; i < sizesForArticle.length; i++) {
            for(let j=0; j < sizes.length; j++){
                if(sizesForArticle[i].size_id == sizes[j].id) {
                    sizesArray.push(sizes[j].size);
                    cantidad += sizesForArticle[i].units;
                }
            }
        }

        const respuesta = {
            code_article : product.code_article,
            title : product.title,
            description_product : product.description_product,
            price : product.price,
            category : category.type_cloth,
            colour : colours,
            sizes : sizesArray,
            stockTotal: cantidad
        }
        res.json(respuesta);
    },

    store: async function(req, res) {
        if(parseInt(req.body.type_cloth,10)== NaN){
            await db.Category.create({
                type_cloth:req.body.type_cloth
            });
            const newCategory = await db.Category.findOne({where:{type_cloth:req.body.type_cloth}});
            req.body.type_cloth = newCategory.id;
        }
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
            }]
        },{
            include:[{
                association:'products_sizes'
            }]
        });
  
        res.json({
          status: 200,
        });
    },
    orders : async (req,res)=>{
        let totalFinal = 0;
        let date = new Date();
        date = date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate();
        console.log(req.body);
        for(product of req.body){
            totalFinal += parseInt(product.total,10);
        }
        await db.Order.create({
            total:totalFinal,
            estado:'pendiente',
            date: date,
            user_id:req.session.userLoginSession.id
        });

        const order = await db.Order.findOne({where:{total:totalFinal}});

        for(product of (req.body)){
            await db.Order_Product.create({
                products_id: parseInt(product.product_id,10),
                orders_id: order.id,
                units: parseInt(product.quantity,10),
            })
        }

        res.json({
            status:200
        });
    },
    confirm:async(req,res) =>{
        const order_products = await db.Order_Product.findAll({where:{orders_id:req.body.order_id}});
        for(product of order_products){
            let units = await db.Product_Size.findOne({where:{product_id:product.products_id}});
            let unitTotal = units.units - product.units;
            await db.Product_Size.update({
                units: unitTotal
            },{
                where:{product_id:product.products_id}
            });
        }
        await db.Order.update({
            estado: "Finalizado"
        },{
            where:{id:req.body.order_id}
        });

        res.json({
            status:200
        });
    },
    favoriteAdd:async(req,res)=>{    
        await db.Favorite.create({
            users_id: req.session.userLoginSession.id,
            products_id: req.body.product_id,
        });

        res.json({
            status:200
        })
    },
    favoriteRemove:async(req,res)=>{
        await db.Favorite.destroy({
            where:{
                [Op.and]: [{users_id: req.session.userLoginSession.id}, {products_id: req.body.product_id}]
            }
        })

        res.json({
            status:200
        })
    }
}

module.exports = controller;