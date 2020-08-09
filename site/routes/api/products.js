const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productsAPIController = require('../../controllers/api/productsController');
const authenticationMiddleware = require('../../middleware/api/authentication');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage });

router.get('/',authenticationMiddleware,productsAPIController.list);
router.post('/shop',productsAPIController.orders);
router.get('/:id',authenticationMiddleware, productsAPIController.find);

module.exports = router;