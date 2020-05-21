let express = require('express');
let router = express.Router();
const productsController = require("../controllers/productsController");

router.get('/', function(req, res, next) {
    res.send('Site under construction, please come back later :D');
  });

router.get('/create', productsController.create);

module.exports = router;