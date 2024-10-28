// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/Sec2UserController');

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/', controller.checkEmail,controller.createNewUser);
router.get('/', controller.readAllUser);
router.put('/levelUp', controller.checkId,controller.checkBalance,controller.levelUpUserById)
router.get('/:user_id', controller.readUserById);
router.put('/:user_id', controller.checkEmail,controller.updateUserById);
router.delete('/:user_id', controller.deleteUserById);
router.put('/updateItem/:user_id', controller.checkOwner, controller.equipItem);
router.post('/DoTask/:user_id', controller.checkIdForTask,controller.getCreature,controller.doTask)


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;