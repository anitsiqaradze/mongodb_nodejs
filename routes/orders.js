var express = require('express');
var router = express.Router();
const OrdersService = require('../services/orders.service');

router.post('/', OrdersService.add);
router.get('/count-by-status', OrdersService.countByStatus);
router.get('/top-spenders', OrdersService.topSpenders);

module.exports = router;