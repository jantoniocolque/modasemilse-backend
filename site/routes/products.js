const express = require('express');
const router = express.Router();

const productsController=require('../controllers/productsController');

/*GET Tienda page*/
router.get('/',productsController.root);

module.exports = router;