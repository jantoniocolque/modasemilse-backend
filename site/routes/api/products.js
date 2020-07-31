const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage });

const productsAPIController = require('../../controllers/api/productsController');

router.get('/', productsAPIController.list);

router.get('/:id', productsAPIController.find);

router.post('/create',upload.any(),productsAPIController.store);

module.exports = router;