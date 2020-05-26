const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tienda', { 
      title: 'Tienda - Emilse',
      products:products,
    })
});

module.exports = router;