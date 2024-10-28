// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/Sec2UserCreatureController');

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/', controller.readAll);
router.get('/:user_id', controller.readCreaturesByUserId);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;