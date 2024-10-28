// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/task_progressController');

// ##############################################################
// DEFINE ROUTES
// ##############################################################

router.post('/', controller.checkUserId,controller.checkTaskId,controller.createNewTaskProgress);
router.get('/', controller.readAllTask);
router.get('/:progress_id', controller.readProgressById);
router.get('/user/:user_id', controller.readProgressByUserId);
router.put('/:progress_id', controller.updateProgressById);
router.delete('/:progress_id', controller.deleteProgressById);


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;