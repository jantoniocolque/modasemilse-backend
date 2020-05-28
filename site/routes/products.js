const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

/* GET products page. */
router.get('/', productsController.root);
router.get('/type/:type/',productsController.filter);

router.get('/create/',productsController.create);
router.post('/create/',productsController.store);

module.exports = router;