const db = require('../database/models');
const {Op} = require('sequelize');

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
                res.render('tienda',{
                    title:'Tienda - Emilse',
                    titleContent: 'Resultados de busqueda',
                    categorias:categorias,
                    products:removeDuplicates(products,'code_article'),
                    session:req.session.userLoginSession
            })
        })
    },
    cartView : (req, res) => {
        res.render('carrito', { title: 'Modas Emilse | Carrito',session:req.session.userLoginSession});
    },

    support : (req, res) =>{
        res.render('support', { title: 'Modas Emilse | Atención al cliente',session:req.session.userLoginSession});
    }
}

module.exports = controller;