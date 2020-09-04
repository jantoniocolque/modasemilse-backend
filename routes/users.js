var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');

const userRegisterValidator = require('../middleware/validator/userRegisterValidator');
const userLoginValidator = require('../middleware/validator/userLoginValidator');
const userUpdateValidator = require('../middleware/validator/userUpdateValidator');
const authUserLogin = require('../middleware/authUserLogin');
const guestUserLogin = require('../middleware/guestUserLogin');
const usersController = require('../controllers/usersController');

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
  //res.send('Site under construction, please come back later :D');
  res.redirect('/users/login');
});

router.get('/register',guestUserLogin, usersController.register);
router.post('/register',upload.any(),userRegisterValidator,usersController.create);
router.get('/login',guestUserLogin,usersController.login);
router.post('/login',userLoginValidator,usersController.userValidator);

router.get('/logout',usersController.logout);

router.get('/account',authUserLogin, usersController.account);
router.get('/account/orders',authUserLogin, usersController.orders);
router.get('/account/favorites',authUserLogin, usersController.favorites);
router.get('/account/shops',authUserLogin,usersController.shops);
router.get('/account/update',authUserLogin, usersController.update);
router.post('/account/update', upload.any(),userUpdateValidator, usersController.storeUpdate);

module.exports = router;
