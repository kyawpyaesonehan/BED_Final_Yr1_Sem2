// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/Sec2CreaturesController');

// ##############################################################
// DEFINE ROUTES
// ##############################################################

router.get('/', controller.readAllCreatures);
router.get('/:creature_id', controller.readCreaturesById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;