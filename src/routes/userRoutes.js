const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

router.get('/', controller.readAllUser);

module.exports = router;