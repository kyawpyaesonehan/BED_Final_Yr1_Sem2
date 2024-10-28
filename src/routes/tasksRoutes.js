// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/tasksController');


// ##############################################################
// DEFINE ROUTES
// ##############################################################

router.post('/', controller.createNewTask);
router.get('/', controller.readAllTask);
router.get('/:task_id', controller.readTaskById);
router.put('/:task_id', controller.updateTaskById);
router.delete('/:task_id', controller.deleteTaskById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;