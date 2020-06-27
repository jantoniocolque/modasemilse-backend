var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.root);

/*GET search page*/
router.get('/search',indexController.search);
router.get('/support',indexController.support);

module.exports = router;
