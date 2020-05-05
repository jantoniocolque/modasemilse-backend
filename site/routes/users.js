var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Site under construction, please come back later :D');
});

router.use('/register', usersController.register)


module.exports = router;
