const productsContoller = {
    'create' : function(req, res) {
        res.render('productAdd', { title: 'Modas Emilse | Administracíon' });
    },
}

module.exports = productsContoller;