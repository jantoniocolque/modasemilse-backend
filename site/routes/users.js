var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');

const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

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
router.post('/register',upload.any(),[
  check('password').isLength({min:5}).withMessage('Contraseña como minimo 5 caracteres'),
  check('email').isEmail().withMessage('Correo incorrecto'),
  body('email').custom(async function(value){
    const usuario = await db.User.findOne({where : {email:value}});
      if(usuario !=  null){
        
        return Promise.reject();
      }
  }).withMessage('Usuario ya existente'),
],usersController.create);
router.get('/login',guestUserLogin,usersController.login);
router.post('/login',[
  check('email').isEmail().withMessage('Formato de email incorrecto'),
  check('password').isLength({min:5}).withMessage('La contraseña debe tener al menos 5 caracteres')
],usersController.userValidator);

router.get('/logout',usersController.logout);

router.get('/account',authUserLogin, usersController.account);
router.get('/account/orders',authUserLogin, usersController.orders);
router.get('/account/favorites',authUserLogin, usersController.favorites);

router.get('/account/update',authUserLogin, usersController.update);
router.post('/account/update', upload.any(),[
  check('password').isLength({min:5}).withMessage('Contraseña como minimo 5 caracteres'),
  check('email').isEmail().withMessage('Correo incorrecto'),
  check('currentEmail').isEmail().withMessage('Correo incorrecto')
], usersController.storeUpdate);

module.exports = router;
