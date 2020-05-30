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
   
  var upload = multer({ storage: storage })

const productsController = require('../controllers/productsController');

/* GET products page. */
router.get('/', productsController.root);

router.get('/type/:type',productsController.filter);

/*GET products create page */
router.get('/create',productsController.create);
router.post('/create',upload.any(),productsController.store);

/*GET products edit page*/
router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
router.put('/edit/:productId', productsController.update); /* PUT - Update in DB */

/*GET products delete page*/
router.delete('/delete/:productId', productsController.delete); /* DELETE - Delete from DB */

/*GET details product by id*/
router.get('/details/:productId', productsController.detail); /* GET - Show details product by Id*/

module.exports = router;