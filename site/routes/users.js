var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');

var { check, validationResult, body } = require('express-validator');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/user-avatars')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Site under construction, please come back later :D');
});

router.get('/register', usersController.register);
router.post('/register', upload.any(), usersController.create);

module.exports = router;
