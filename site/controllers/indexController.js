const db = require('../database/models');
const Op = require('Sequelize').Op;

const controller = {
    root:(req,res)=>{
        res.render('index', { title: 'Modas Emilse | Inicio',session:req.session.userLoginSession});
    },
    
    search:async (req,res)=>{
        const categorias = await db.Category.findAll();
        db.Product.findAll({
            include:[{
                association:'category',
                where:{ 
                    type_cloth:{
                        [Op.like]:'%'+req.query.keywords+'%'
                    }
                }
            }]
        })
        .then(function(products){
            console.log(products);
                res.render('tienda',{
                    title:'Tienda - Emilse',
                    titleContent: 'Resultados de busqueda',
                    categorias:categorias,
                    products:products,
                    session:req.session.userLoginSession
            })
        })
    },
    support : (req, res) =>{
        res.render('support', { title: 'Modas Emilse | Atención al cliente'});
    }
}

module.exports = controller;