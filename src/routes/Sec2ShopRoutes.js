// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/Sec2ShopController');

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/', controller.readAllItems);
router.get('/:item_id', controller.readItemsById);
router.post('/buyItem/:user_id', controller.checkItemId, controller.checkUserShopId, controller.checkItem,  controller.checkBalance, controller.buyItem);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;