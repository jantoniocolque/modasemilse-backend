var express = require('express');
var router = express.Router();
const usersController = require('../../controllers/api/usersController');
const authenticationMiddleware = require('../../middleware/api/authentication');

router.get('/',authenticationMiddleware, usersController.list);
router.post('/login',usersController.login);
router.get('/:id',authenticationMiddleware,usersController.find);

module.exports = router;
