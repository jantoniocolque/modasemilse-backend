var express = require('express');
var router = express.Router();
const usersController = require('../../controllers/api/usersController');

router.get('/', usersController.list);

module.exports = router;
