const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { check, validationResult, body } = require('express-validator');

const adminUser = require('../middleware/adminUser');

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

/*GET details product by id*/
router.get('/details/:productId', productsController.detail); /* GET - Show details product by Id*/

router.get('/type/:type',productsController.filter);

/*GET products create page */
router.get('/create',adminUser,productsController.create);
router.post('/create',upload.any(),[
  check('title').isLength({min:5}).withMessage('Titulo tener como minimo 5 caracteres'),
  check('description_product').isLength({min:20}).withMessage('Descripcion con 20 caracteres como minimo'),
],productsController.store);

/*GET products edit page*/
router.get('/edit/:productId',adminUser,productsController.edit); /* GET - Form to create */
router.put('/edit/:productId', productsController.update); /* PUT - Update in DB */

/*GET products delete page*/
router.delete('/delete/:productId', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;