var express = require('express');
var router = express.Router();
const Studentservice = require('../services/student.service');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/all', ApiSecurity.requireLogin, Studentservice.getAll);
router.post('/', ApiSecurity.requirePermits('user.add'), Studentservice.add);
router.get('/:id', ApiSecurity.requireLogin, Studentservice.getOne);
router.delete('/:id', ApiSecurity.requirePermits('user.add'), Studentservice.delete);
router.put('/:id', ApiSecurity.requirePermits('user.add'), Studentservice.update);

module.exports = router;