var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
router.get('/', userController.init);
router.post('/register', userController.register);

module.exports = router;
