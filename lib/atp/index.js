'use strict';

var express = require('express');
var controller = require('./atpdata');

var router = express.Router();

router.get('/rank', controller.getRank);
router.get('/tournaments', controller.getTournaments);
router.get('/players', controller.getPlayerList);
router.get('/player-detail', controller.getPlayerDetail);
router.get('/stats/:statsType/:year/:surface', controller.getStats);


module.exports = router;