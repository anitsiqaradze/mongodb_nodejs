var express = require('express');
var router = express.Router();

const UserService = require('../services/user.service');

router.post('/register', UserService.register);
router.post('/login', UserService.login);
router.get('/active', UserService.getActive);

module.exports = router;
