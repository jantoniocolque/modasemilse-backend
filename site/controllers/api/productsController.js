const db = require('../../database/models');

const controller = {
    list: async (req,res) => {
        const products = await db.Product.findAll()
        
        for( let i=0; i<products.length;i++){
            products[i].setDataValue("endpoints","https://localhost/api/products/"+products[i].id);
        }

        const respuesta = {
            meta:{
                status:200,
                total: products.length,
            },
            data:products,
        }
        res.json(respuesta);
    },

    find : async function(req, res) {
        const product = await db.Product.findByPk(req.params.id);
        res.json(product);
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
    orders:async (req,res)=>{
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
    }
}

module.exports = controller;